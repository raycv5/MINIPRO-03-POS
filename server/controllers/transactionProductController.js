const { Transaction_Product, Product } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const response = await Transaction_Product.findAll();
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
};
