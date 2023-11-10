const router = require("express").Router();
const { categoryController } = require("../controllers");

router.get("/", categoryController.getAllCategory);
router.post("/", categoryController.addCategory);

module.exports = router