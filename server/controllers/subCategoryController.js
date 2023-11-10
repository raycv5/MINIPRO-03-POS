const db = require("../models");
const SubCategory = db.Sub_Category;
const Category = db.Category;

module.exports = {
   getAllSubCategory: async (req, res) => {
      try {
         const subCategories = await SubCategory.findAll();
         res.status(200).send(subCategories);
      } catch (error) {
         console.log(error);
         res.status(400).send({ message: error.message });
      }
   },
   addSubCategory: async (req, res) => {
      const { name, AdminId, CategoryId } = req.body;
      try {
         const subCategoryExist = await SubCategory.findOne({
            where: {
               name,
            },
         });
         if (subCategoryExist) {
            return res.status(409).send("SubCategory already exists");
         }
         await SubCategory.create({
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
};
