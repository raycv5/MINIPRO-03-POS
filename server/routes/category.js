const router = require("express").Router();
const { categoryController } = require("../controllers");

router.get("/", categoryController.getAllCategory);
router.post("/", categoryController.addCategory);
router.get("/count-categories", categoryController.countCategory);
router.get("/:id", categoryController.getCategoryById);
router.patch("/:id", categoryController.editCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

