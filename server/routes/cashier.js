const router =require('express').Router();
const { cashierController} = require("../controllers");
const verifyAndFindCashierById = require('../middleware/cashierAuth');
const { multerUpload } = require('../middleware/multer');
const { checkLogin } = require('../middleware/validator');



router.post('/' ,cashierController.register)
router.post('/login', cashierController.login)
router.get('/keep-login', verifyAndFindCashierById,cashierController.keepLogin)
router.get('/', cashierController.getAll)
router.patch('/verified/:id',cashierController.isVerified)
router.put('/disabled/:id', cashierController.isDisabled)
router.post('/upload-profile',multerUpload, cashierController.uploadProfilePhoto )
router.delete('/:id', cashierController.delete);


module.exports = router;