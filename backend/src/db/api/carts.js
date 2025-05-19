const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CartsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const carts = await db.carts.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await carts.setCustomer(data.customer || null, {
      transaction,
    });

    await carts.setCart_items(data.cart_items || [], {
      transaction,
    });

    return carts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const cartsData = data.map((item, index) => ({
      id: item.id || undefined,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const carts = await db.carts.bulkCreate(cartsData, { transaction });

    // For each item created, replace relation files

    return carts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const carts = await db.carts.findByPk(id, {}, { transaction });

    const updatePayload = {};

    updatePayload.updatedById = currentUser.id;

    await carts.update(updatePayload, { transaction });

    if (data.customer !== undefined) {
      await carts.setCustomer(
        data.customer,

        { transaction },
      );
    }

    if (data.cart_items !== undefined) {
      await carts.setCart_items(data.cart_items, { transaction });
    }

    return carts;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const carts = await db.carts.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of carts) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of carts) {
        await record.destroy({ transaction });
      }
    });

    return carts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const carts = await db.carts.findByPk(id, options);

    await carts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await carts.destroy({
      transaction,
    });

    return carts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const carts = await db.carts.findOne({ where }, { transaction });

    if (!carts) {
      return carts;
    }

    const output = carts.get({ plain: true });

    output.customer = await carts.getCustomer({
      transaction,
    });

    output.cart_items = await carts.getCart_items({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.users,
        as: 'customer',

        where: filter.customer
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.customer
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.customer
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.cart_items,
        as: 'cart_items',
        required: false,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.cart_items) {
        const searchTerms = filter.cart_items.split('|');

        include = [
          {
            model: db.cart_items,
            as: 'cart_items_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        product: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.carts.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(query, limit, offset) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('carts', 'customer', query),
        ],
      };
    }

    const records = await db.carts.findAll({
      attributes: ['id', 'customer'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['customer', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.customer,
    }));
  }
};
