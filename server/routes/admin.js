const router = require("express").Router();
const { adminController } = require("../controllers");
const  verifyAndFindAdminById  = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

router.post('/',adminController.register)
router.post('/login', adminController.login);
 router.get('/keep-login',verifyAndFindAdminById ,adminController.keepLogin)
 router.get('/', adminController.getAll)
 router.patch('/uploadImage/:id', verifyAndFindAdminById, multerUpload().single("file"), adminController.updateImage)
 router.patch('/verified/:id', adminController.isVerified)

module.exports = router;
