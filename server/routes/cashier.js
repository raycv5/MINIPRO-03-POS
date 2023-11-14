const router =require('express').Router();
const { cashierController} = require("../controllers");
const verifyAndFindCashierById = require('../middleware/cashierAuth');



router.post('/', cashierController.register)
router.post('/login', cashierController.login)
router.get('/keep-login', verifyAndFindCashierById,cashierController.keepLogin)
router.get('/', cashierController.getAll)
router.patch('/verified/:id', cashierController.isVerified)
router.patch('/disabled/:id', cashierController.isDisabled)

module.exports = router;