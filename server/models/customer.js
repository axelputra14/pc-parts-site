"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Wishlist, {
        foreignKey: "CustomerId",
      });
    }
  }
  Customer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hash(instance.password);
        },
      },
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
