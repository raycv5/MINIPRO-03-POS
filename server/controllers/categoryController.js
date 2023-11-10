const { Category, Admin } = require("../models");

module.exports = {
   getAllCategory: async (req, res) => {
      try {
         const category = await Category.findAll();
         res.status(200).send(category);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   addCategory: async (req, res) => {
      const { name, AdminId } = req.body;
      try {
         const categoryExist = await Category.findOne({
            where: {
               name,
            },
         });
         if (categoryExist) {
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
         await Category.update(req.params.id);
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
};
