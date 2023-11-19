const { Transaction_Product, Product } = require("../models");
const { product } = require("../routes");

module.exports = {
   getAll: async (req, res) => {
      try {
         const response = await Transaction_Product.findAll({
            include: [
               {
                  model: Product,
                  attributes: ["name"],
               },
            ],
         });
         res.status(200).send(response);
      } catch (err) {
         console.log(err);
         res.status(400).send({ message: err.message });
      }
   },
   post: async (req, res) => {
      const { quantity, ProductId, TransactionId } = req.body;
      try {
         const product = await Product.findOne({ where: { id: ProductId } });
         console.log(product);
         const productQty = product.dataValues.stock_quantity - quantity;
         await Product.update(
            {
               stock_quantity: productQty,
            },
            {
               where: {
                  id: ProductId,
               },
            }
         );

         await Transaction_Product.create({
            quantity,
            ProductId,
            TransactionId,
         });
         res.status(200).send("Transaction Product Created");
      } catch (err) {
         console.log(err);
         res.status(400).send({ message: err.message });
      }
   },
   countProduct: async (req, res) => {
      try {
         const response = await Transaction_Product.findAll({
            include: [
               {
                  model: Product,
                  attributes: ["name"],
               },
            ],
         });
         //count product
         const productQuantities = response.reduce(
            (accumulator, transactionProduct) => {
               const productName = transactionProduct.Product.name;
               const quantity = transactionProduct.quantity;

               if (!accumulator[productName]) {
                  accumulator[productName] = 0;
               }

               accumulator[productName] += quantity;

               return accumulator;
            },
            {}
         );
         //ganti tipe data
         const resultArray = Object.keys(productQuantities).map(
            (productName) => ({
               name: productName,
               count: productQuantities[productName],
            })
         );

         res.status(200).send(resultArray);
      } catch (err) {
         console.log(err);
         res.status(400).send({ message: err.message });
      }
   },
};
