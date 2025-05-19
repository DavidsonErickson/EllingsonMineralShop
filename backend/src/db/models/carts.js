const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const carts = sequelize.define(
    'carts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  carts.associate = (db) => {
    db.carts.belongsToMany(db.cart_items, {
      as: 'cart_items',
      foreignKey: {
        name: 'carts_cart_itemsId',
      },
      constraints: false,
      through: 'cartsCart_itemsCart_items',
    });

    db.carts.belongsToMany(db.cart_items, {
      as: 'cart_items_filter',
      foreignKey: {
        name: 'carts_cart_itemsId',
      },
      constraints: false,
      through: 'cartsCart_itemsCart_items',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.carts.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.carts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.carts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return carts;
};
