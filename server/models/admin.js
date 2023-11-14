"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Cashier);
      Admin.hasMany(models.Product);
      Admin.hasMany(models.Category);
      Admin.hasMany(models.Sub_Category);
    }
  }
  Admin.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      isVerified: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
