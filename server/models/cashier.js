"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Cashier extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Cashier.belongsTo(models.Admin);
         Cashier.hasMany(models.Transaction);
         Cashier.hasMany(models.Cart);
      }
   }
   Cashier.init(
      {
         fullname: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         image: DataTypes.STRING,
         isVerified: DataTypes.BOOLEAN,
         isDisabled: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: "Cashier",
      }
   );
   return Cashier;
};
