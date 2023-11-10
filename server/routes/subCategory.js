const router = require("express").Router();
const { subCategoryController } = require("../controllers");

router.get("/", subCategoryController.getAllSubCategory);
router.post("/", subCategoryController.addSubCategory);

module.exports = router;
