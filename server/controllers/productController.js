const { Product, Sub_Category, Category } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const { name, category, sort, page, limit } = req.query;

      const where = {};
      if (name !== undefined && name !== "") {
        where.name = { [Op.like]: `%${name}%` };
      }
      if (category) {
        where.CategoryId = category;
      }

      const order = [];
      if (sort === "nameAZ") {
        order.push(["name", "ASC"]);
      } else if (sort === "nameZA") {
        order.push(["name", "DESC"]);
      } else if (sort === "priceAsc") {
        order.push(["price", "ASC"]);
      } else if (sort === "priceDesc") {
        order.push(["price", "DESC"]);
      }

      const offset = (page - 1) * limit;
      const paginationOptions = { offset, limit: parseInt(limit) };

      const product = await Product.findAll({
        where: {
          ...where,
          // isDeleted: false,
        },
        include: [
          {
            model: Sub_Category,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
        order: order,
        ...paginationOptions,
      });
      res.status(200).send(product);
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
      stock_quantity,
      CategoryId,
      SubCategoryId,
      AdminId,
    } = req.body;
    console.log(req.body);
    try {
      const productExist = await Product.findOne({
        where: {
          name,
          isDeleted: false,
        },
      });
      if (productExist) {
        return res.status(409).send("product already exists");
      }
      let image = null;
      if (req.file) {
        image = req.file?.path;
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
      res.status(200).send({ message: "Product created successfully" });
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
    const {
      name,
      price,
      description,
      stock_quantity,
      CategoryId,
      SubCategoryId,
    } = req.body;
    try {
      console.log(req.body);
      let image = null;
      if (req.file) {
        image = req.file?.path;
      }
      await Product.update(
        {
          name,
          price,
          description,
          stock_quantity,
          image,
          CategoryId,
          SubCategoryId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Product updated successfully");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  isDisabled: async (req, res) => {
    const { isDisabled } = req.body;
    try {
      await Product.update(
        { isDisabled },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Product updated successfully");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.update(
        { isDeleted: true },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Product deleted");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  restoreProduct: async (req, res) => {
    try {
      await Product.update(
        { isDeleted: false },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Product restore successfully");
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
  getProductById: async (req, res) => {
    try {
      const response = await Product.findAll({
        where: { CategoryId: req.params.id },
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send({ message: error.message });
    }
  },
  getByKeywords: async (req, res) => {
    try {
      const response = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${req.params.id}%`,
          },
        },
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
};
