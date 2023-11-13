const jwt = require('jsonwebtoken');
const { Admin } = require('../models'); // Sesuaikan dengan model Admin Anda

const verifyAndFindAdminById = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'Token empty'
            });
        }
        token = token.split(' ')[1];

        const decodedToken = jwt.verify(token, 'Jcwd0208');

        const adminId = decodedToken.id;

        const admin = await Admin.findOne({
            where: {
                id: adminId
            }
        });

        if (!admin) {
            return res.status(400).json({
                message: 'Admin tidak ditemukan'
            });
        }

        req.admin = admin;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: 'Token tidak valid'
        });
    }
};

module.exports = verifyAndFindAdminById;


