const router = require("express").Router();
const { categoryController } = require("../controllers");

router.get("/", categoryController.getAllCategory);
router.post("/", categoryController.addCategory);
router.get("/count-categories", categoryController.countCategory);
router.get("/search", categoryController.getCategoryByName);
router.patch("/delete/:id", categoryController.deleteCategory);
router.patch("/remove/:id", categoryController.removeCategory);
router.patch("/:id", categoryController.editCategory);

module.exports = router;
