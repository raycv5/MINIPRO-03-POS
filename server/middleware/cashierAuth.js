const jwt = require('jsonwebtoken');
const { Cashier } = require('../models'); // Sesuaikan dengan model Cashier Anda

const verifyAndFindCashierById = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'Token kosong'
            });
        }
        token = token.split(' ')[1];

        const decodedToken = jwt.verify(token, 'minpro02');

        const cashierId = decodedToken.id;

        const cashier = await Cashier.findOne({
            where: {
                id: cashierId
            }
        });

        if (!cashier) {
            return res.status(400).json({
                message: 'Kasir tidak ditemukan'
            });
        }

        req.cashier = cashier;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: 'Token tidak valid'
        });
    }
};

module.exports = verifyAndFindCashierById;
