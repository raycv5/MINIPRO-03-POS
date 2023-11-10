const router = require("express").Router();
const { productController } = require("../controllers");

router.get("/", productController.getAllProduct);
router.post("/", productController.addProduct);

module.exports = router;
