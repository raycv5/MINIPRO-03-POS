const router = require("express").Router();
const { transactionController } = require("../controllers");

router.get("/", transactionController.getAll);
router.post("/", transactionController.post);
router.get("/:id", transactionController.getById);

module.exports = router;
