const router = require("express").Router();
const { subCategoryController } = require("../controllers");

router.get("/", subCategoryController.getAllSubCategory);
router.post("/", subCategoryController.addSubCategory);
router.get("/count-subcategories/:id", subCategoryController.countSubCategoryByCategory);
router.patch("/delete/:id", subCategoryController.deleteSubCategory);
router.patch("/remove/:id", subCategoryController.removeSubCategory);
router.get("/:id", subCategoryController.getSubCategoryById);
router.patch("/:id", subCategoryController.editSubCategory);


module.exports = router;
