const { Product, Sub_Category, Category } = require("../models");

module.exports = {
   getAllProduct: async (req, res) => {
      try {
         const products = await Product.findAll();
         res.status(200).send(products);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   getById: async (req, res) => {
      try {
         const productById = await Product.findOne({
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send(productById);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   addProduct: async (req, res) => {
      const {
         name,
         description,
         price,
         image,
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
            description,
            price,
            image,
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
   getProductBySubCategory: async (req, res) => {
      const { CategoryId, SubCategoryId } = req.query;
      try {
         const getProductsBySubCategory = await Product.findAll({
            where: {
               CategoryId,
               SubCategoryId,
            },
            include: [
               {
                  model: Category,
                  attributes: ["id", "name"],
               },
               {
                  model: Sub_Category,
                  attributes: ["id", "name"],
               },
            ],
         });
         res.status(200).send(getProductsBySubCategory);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   editProduct: async (req, res) => {
      try {
         await Product.update({
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send("Product updated successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   deleteProduct: async (req, res) => {
      try {
         await Product.destroy({
            where: {
               id: req.params.id,
            },
         });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   countProduct: async (req, res) => {
      try {
         const countProducts = await Product.count({
            where: {
               CategoryId: req.query.CategoryId,
               SubCategoryId: req.query.SubCategoryId,
            },
         });
         res.status(200).send({ count: countProducts });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
};
