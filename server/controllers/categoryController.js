const { Category, Admin, Sub_Category, Product } = require("../models");
const { Op } = require("sequelize");

module.exports = {
   getAllCategory: async (req, res) => {
      try {
         const { name } = req.query;
         const where = {};
         if (name) {
            where.name = name;
         }
         const categories = await Category.findAll({
            where: {
               name: {
                  [Op.like]: `%${name}%`,
               },
               isDeleted: false,
            },
            include: [
               {
                  model: Sub_Category,
                  attributes: ["name"],
               },
               {
                  model: Product,
                  attributes: ["name"],
               },
            ],
            order: [["name", "ASC"]],
         });
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
               isDeleted: false,
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
         await Category.update(
            { isDeleted: true },
            {
               where: {
                  id: req.params.id,
               },
            }
         );
         res.status(200).send("Category deleted successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   getCategoryByName: async (req, res) => {
      try {
         const categoryById = await Category.findAll({
            where: {
               name: req.query.name,
            },
            include: [
               {
                  model: Sub_Category,
                  attributes: ["id", "name"],
               },
               {
                  model: Product,
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
               AdminId: 1,
            },
         });
         res.status(200).send({ count: countCategories });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
};
