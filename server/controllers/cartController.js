const { Cart, Product } = require("../models");
const db = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const response = await Cart.findAll();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getActive: async (req, res) => {
    try {
      const response = await Cart.findAll({
        where: { CashierId: req.params.id, isActive: true },
        include: [{ model: Product, attributes: ["name", "price", "image"] }],
      });
      let totalPrice = 0;
      for (let item of response) {
        totalPrice += item.Product.price * item.quantity;
      }
      res.status(200).send({ items: response, total_price: totalPrice });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  add: async (req, res) => {
    const { ProductId, CashierId } = req.body;
    const t = await db.sequelize.transaction();

    try {
      const isExist = await Cart.findOne({
        where: { ProductId: ProductId, isActive: true },
      });

      const product = await Product.findOne({ where: { id: ProductId } });
      if (!product) return res.status(400).send("Product not found");

      const productAdded = 1;

      if (!isExist) {
        await Cart.create({ ProductId, CashierId }, { transaction: t });
      } else {
        await Cart.update(
          { quantity: isExist.quantity + productAdded },
          { where: { ProductId: ProductId } }
        );
      }

      await Product.update(
        {
          stock_quantity: product.dataValues.stock_quantity - productAdded,
        },
        { where: { id: ProductId }, transaction: t }
      );
      await t.commit();
      res.status(200).send("Item added to cart");
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  delete: async (req, res) => {
    const t = await db.sequelize.transaction();

    try {
      const cartProduct = await Cart.findOne({
        where: { id: req.params.id },
        include: [{ model: Product, attributes: ["stock_quantity"] }],
      });

      const productQty = cartProduct.dataValues.quantity;

      await Product.update(
        {
          stock_quantity:
            cartProduct.dataValues.Product.stock_quantity + productQty,
        },
        { where: { id: cartProduct.dataValues.ProductId }, transaction: t }
      );

      await Cart.destroy({
        where: {
          id: req.params.id,
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).send("Item deleted");
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  increment: async (req, res) => {
    const t = await db.sequelize.transaction();

    try {
      const productQty = await Cart.findOne({
        where: {
          id: req.params.id,
        },
      });

      const product = await Product.findOne({
        where: { id: productQty.dataValues.ProductId },
      });

      if (product.dataValues.stock_quantity === 0) {
        return res.status(400).send("Product out of stock");
      }

      const newQty = 1;
      await Cart.update(
        { quantity: productQty.dataValues.quantity + newQty },
        {
          where: {
            id: req.params.id,
          },
          transaction: t,
        }
      );
      await Product.update(
        {
          stock_quantity: product.dataValues.stock_quantity - newQty,
        },
        { where: { id: productQty.dataValues.ProductId }, transaction: t }
      );
      await t.commit();
      res.status(200).send("Quantity updated");
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  decrement: async (req, res) => {
    const t = await db.sequelize.transaction();

    try {
      const productQty = await Cart.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (productQty.dataValues.quantity === 1) {
        return res.status(400).send("Minimum quantity reached");
      }
      const newQty = 1;
      await Cart.update(
        { quantity: productQty.dataValues.quantity - newQty },
        { where: { id: req.params.id }, transaction: t }
      );

      const product = await Product.findOne({
        where: { id: productQty.dataValues.ProductId },
      });
      await Product.update(
        {
          stock_quantity: product.dataValues.stock_quantity + newQty,
        },
        { where: { id: productQty.dataValues.ProductId }, transaction: t }
      );
      await t.commit();
      res.status(200).send("Quantity updated");
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
};
