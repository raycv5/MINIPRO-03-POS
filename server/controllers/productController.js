const { Product } = require("../models");

module.exports = {
   getAllProduct: async (req, res) => {
      try {
         const product = await Product.findAll();
         res.status(200).send(product);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   addProduct: async (req, res) => {
      const {
         name,
         descripton,
         price,
         image,
         isDisabled,
         stock_quantity,
         CategoryId,
         SubCategoryId,
         AdminId,
      } = req.body;
      try {
         const productExist = await Product.findOne({
            where: {
               name,
            },
         });
         if (productExist) {
            return res.status(409).send("product already exists");
         }
         await Product.create({
            name,
            descripton,
            price,
            image,
            isDisabled,
            stock_quantity,
            CategoryId,
            SubCategoryId,
            AdminId,
         });
         res.status(200).send("Product created successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
};
