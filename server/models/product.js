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
      Product.belongsTo(models.Admin);
      Product.belongsTo(models.Category);
      Product.belongsTo(models.Sub_Category);
      Product.hasMany(models.Transaction_Product);
      Product.hasMany(models.Cart);
    }
  }
  Product.init(
     {
        name: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        description: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        image: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        price: {
           type: DataTypes.INTEGER,
           defaultValue: 0,
        },
        stock_quantity: {
           type: DataTypes.INTEGER,
           defaultValue: 1,
        },
        isDisabled: {
           type: DataTypes.BOOLEAN,
           defaultValue: false,
        },
        isDeleted: {
           type: DataTypes.BOOLEAN,
           defaultValue: false,
        },
     },
     {
        sequelize,
        modelName: "Product",
     }
  );
  return Product;
};
