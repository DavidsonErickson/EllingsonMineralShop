const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      order_date: {
        type: DataTypes.DATE,
      },

      total_amount: {
        type: DataTypes.DECIMAL,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  orders.associate = (db) => {
    db.orders.belongsToMany(db.order_items, {
      as: 'order_items',
      foreignKey: {
        name: 'orders_order_itemsId',
      },
      constraints: false,
      through: 'ordersOrder_itemsOrder_items',
    });

    db.orders.belongsToMany(db.order_items, {
      as: 'order_items_filter',
      foreignKey: {
        name: 'orders_order_itemsId',
      },
      constraints: false,
      through: 'ordersOrder_itemsOrder_items',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.orders.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return orders;
};
