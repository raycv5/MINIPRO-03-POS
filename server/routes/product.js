const router = require("express").Router();
const { productController } = require("../controllers");

router.get("/", productController.getAllProduct);
router.get("/product-categories", productController.getProductBySubCategory);
router.post("/", productController.addProduct);
router.get("/count-products", productController.countProduct);
router.get("/category/:id", productController.getProductById);
router.get("/keywords/:id", productController.getByKeywords);
router.get("/:id", productController.getById);
router.patch("/:id", productController.editProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
