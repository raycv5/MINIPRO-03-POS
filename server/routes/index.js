const admin = require("./admin");
const cashier = require("./cashier");
const category = require("./category");
const subCategory = require("./subCategory");
const product = require('./product')
const payment = require("./payment");
const transaction = require("./transaction");
const transactionProduct = require("./transactionProduct");
const cart = require("./cart");

module.exports = {
  admin,
  cashier,
  category,
  subCategory,
  product,
  payment,
  transaction,
  transactionProduct,
  cart,
};
