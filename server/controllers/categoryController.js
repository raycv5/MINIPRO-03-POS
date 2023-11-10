const { Category, Admin, Sub_Category, Product } = require("../models");


module.exports = {
   getAllCategory: async (req, res) => {
      try {
         const categories = await Category.findAll();
         res.status(200).send(categories);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   addCategory: async (req, res) => {
      const { name, AdminId } = req.body;
      try {
         const categoriesExist = await Category.findOne({
            where: {
               name,
            },
         });
         if (categoriesExist) {
            return res.status(409).send("Category already exists");
         }

         await Category.create({
            name,
            AdminId,
         });
         res.status(200).send("Category added successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   editCategory: async (req, res) => {
      try {
         await Category.update(req.body, {
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send("category updated successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   deleteCategory: async (req, res) => {
      try {
         await Category.destroy({
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send("Category deleted successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   getCategoryById: async (req, res) => {
      try {
         const categoryById = await Category.findOne({
            where: {
               id: req.params.id,
            },
            include: [
               {
                  model: Sub_Category,
                  attributes: ["id", "name"],
               },
            ],
         });
         res.status(200).send(categoryById);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   countCategory: async (req, res) => {
      try {
         const countCategories = await Category.count({
            where: {
               AdminId: req.query.AdminId,
            },
         });
         res.status(200).send({ count: countCategories });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
};
