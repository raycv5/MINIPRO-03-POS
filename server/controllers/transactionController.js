const {
  Transaction,
  Cart,
  Product,
  Transaction_Product,
} = require("../models");
const db = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const response = await Transaction.findAll();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const response = await Transaction.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Transaction_Product,
            attributes: ["quantity"],
            include: [{ model: Product, attributes: ["name", "price"] }],
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
    const { PaymentMethodId, CashierId } = req.body;
    const t = await db.sequelize.transaction();
    try {
      const cart = await Cart.findAll({
        where: { CashierId: CashierId, isActive: true },
        include: [{ model: Product, attributes: ["name", "price"] }],
      });
      let totalPrice = 0;
      for (let item of cart) {
        totalPrice += item.Product.price * item.quantity;
      }
      const transaction = await Transaction.create(
        {
          total_price: totalPrice,
          PaymentMethodId: PaymentMethodId,
          CashierId: CashierId,
        },
        { transaction: t }
      );
      for (let item of cart) {
        await Transaction_Product.create(
          {
            quantity: item.quantity,
            ProductId: item.ProductId,
            TransactionId: transaction.id,
          },
          { transaction: t }
        );
      }
      await Cart.update(
        { isActive: false },
        { where: { isActive: true }, transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .send({ message: "Transaction Succeed", data: transaction });
    } catch (err) {
      await t.rollback();
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
};
