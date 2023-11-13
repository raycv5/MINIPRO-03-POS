const router = require("express").Router();
const { transactionProductController } = require("../controllers");

router.get("/", transactionProductController.getAll);
router.post("/", transactionProductController.post);

module.exports = router;
