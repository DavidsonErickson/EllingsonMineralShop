const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      stock: {
        type: DataTypes.INTEGER,
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

  products.associate = (db) => {
    db.products.belongsToMany(db.categories, {
      as: 'categories',
      foreignKey: {
        name: 'products_categoriesId',
      },
      constraints: false,
      through: 'productsCategoriesCategories',
    });

    db.products.belongsToMany(db.categories, {
      as: 'categories_filter',
      foreignKey: {
        name: 'products_categoriesId',
      },
      constraints: false,
      through: 'productsCategoriesCategories',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.products.hasMany(db.cart_items, {
      as: 'cart_items_product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    db.products.hasMany(db.order_items, {
      as: 'order_items_product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    //end loop

    db.products.hasMany(db.file, {
      as: 'images',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.products.getTableName(),
        belongsToColumn: 'images',
      },
    });

    db.products.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.products.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return products;
};
