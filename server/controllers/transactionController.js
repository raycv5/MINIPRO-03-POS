const { Transaction } = require("../models");

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
  post: async (req, res) => {
    const { total_price, PaymentMethodId, CashierId } = req.body;
    try {
      const transaction = await Transaction.create({
        total_price,
        PaymentMethodId,
        CashierId,
      });
      const lastTransactionId = transaction.get("id");
      res.status(201).send({
        transactionId: lastTransactionId,
        message: "Transcation Created Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    }
  },
};
