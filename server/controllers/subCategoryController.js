const { Sub_Category, Category, Product } = require("../models");

module.exports = {
   getAllSubCategory: async (req, res) => {
      try {
         const subCategories = await Sub_Category.findAll();
         res.status(200).send(subCategories);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   getSubCategoryById: async (req, res) => {
      try {
         const subCategoriesById = await Sub_Category.findOne({
            where: {
               id: req.params.id,
            },
            include: {
               model: Product,
               attributes: ["id", "name", "description", "price", "image"],
            },
         });
         res.status(200).send(subCategoriesById);
      } catch (error) {
         res.status(200).send({ message: error.message });
      }
   },
   addSubCategory: async (req, res) => {
      const { name, AdminId, CategoryId } = req.body;
      try {
         const subCategoryExist = await Sub_Category.findOne({
            where: {
               name,
            },
         });
         if (subCategoryExist) {
            return res.status(409).send("SubCategory already exists");
         }
         await Sub_Category.create({
            name,
            AdminId,
            CategoryId,
         });
         res.status(200).send("Successfully added sub category");
      } catch (error) {
         console.log(error);
         res.status(400).send({ message: error.message });
      }
   },
   editSubCategory: async (req, res) => {
      try {
         await Sub_Category.update(req.body, {
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send("Sub Category successfully updated");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   deleteSubCategory: async (req, res) => {
      try {
         await Sub_Category.delete({
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send("SubCategory deleted successfully");
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   countSubCategoryByCategory: async (req, res) => {
      try {
         const countSubCategoryByCategory = await Sub_Category.count({
            where: {
               CategoryId: req.params.id,
            },
         });
         res.status(200).send({ count: countSubCategoryByCategory });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
};
