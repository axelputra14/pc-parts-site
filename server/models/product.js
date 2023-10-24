"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Wishlist, {
        foreignKey: "ProductId",
      });

      Product.belongsTo(models.User, {
        foreignKey: "authorId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name cannot be empty",
          },
          notEmpty: {
            msg: "Product name cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be empty",
          },
          notEmpty: {
            msg: "Description cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be empty",
          },
          notEmpty: {
            msg: "Price cannot be empty",
          },
          min: 1,
        },
      },
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      status: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
