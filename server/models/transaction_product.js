"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_Product.belongsTo(models.Product);
      Transaction_Product.belongsTo(models.Transaction);
    }
  }
  Transaction_Product.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_Product",
    }
  );
  return Transaction_Product;
};
