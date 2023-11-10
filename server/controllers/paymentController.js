const { Payment_Method } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const response = await Payment_Method.findAll();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      req.status(400).send({ message: err.message });
    }
  },
  add: async (req, res) => {
    const { name } = req.body;
    try {
      await Payment_Method.create({ name });
      res.status(200).send(`New Payment Method Created`);
    } catch (err) {
      console.log(err);
      req.status(400).send({ message: err.message });
    }
  },
};
