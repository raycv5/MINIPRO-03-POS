"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sub_Category.belongsTo(models.Admin);
      Sub_Category.hasMany(models.Product);
      Sub_Category.belongsTo(models.Category);
    }
  }
  Sub_Category.init(
     {
        name: DataTypes.STRING,
        isDeleted: {
           type: DataTypes.BOOLEAN,
           defaultValue: false,
        },
     },
     {
        sequelize,
        modelName: "Sub_Category",
     }
  );
  return Sub_Category;
};
