const router = require("express").Router();
const { paymentController } = require("../controllers");

router.get("/", paymentController.getAll);
router.post("/", paymentController.add);

module.exports = router;
