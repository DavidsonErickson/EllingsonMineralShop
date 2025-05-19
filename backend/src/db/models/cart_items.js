const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cart_items = sequelize.define(
    'cart_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
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

  cart_items.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.cart_items.belongsTo(db.products, {
      as: 'product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    db.cart_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cart_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cart_items;
};
