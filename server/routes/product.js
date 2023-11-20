const router = require("express").Router();
const { productController } = require("../controllers");
const { productUpload } = require("../middleware/multer");

router.get("/", productController.getAllProduct);
router.get("/product-categories", productController.getProductBySubCategory);
router.post("/", productUpload().single("file"), productController.addProduct);
router.get("/count-products", productController.countProduct);
router.get("/category/:id", productController.getProductById);
router.get("/keywords/:id", productController.getByKeywords);
router.get("/:id", productController.getById);
router.patch("/delete/:id", productController.deleteProduct);
router.patch("/remove/:id", productController.restoreProduct);
router.patch("/disabled/:id", productController.isDisabled);
router.patch(
   "/:id",
   productUpload().single("file"),
   productController.editProduct
);

module.exports = router;
