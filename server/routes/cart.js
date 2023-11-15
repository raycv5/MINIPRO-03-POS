const router = require("express").Router();
const { cartController } = require("../controllers");

router.get("/", cartController.getAll);
router.post("/", cartController.add);
router.delete("/:id", cartController.delete);
router.get("/:id", cartController.getActive);
router.patch("/increment/:id", cartController.increment);
router.patch("/decrement/:id", cartController.decrement);

module.exports = router;
