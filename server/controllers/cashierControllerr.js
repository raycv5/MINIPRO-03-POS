const { Cashier } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


module.exports={
    register: async (req,res) => {
        try {
            const {fullname, email, password}=req.body
            const emailCheck = await Cashier.findOne({
                where: {
                    email:email
                }
            })
            if (emailCheck) {
                return res.status(400).send("email sudah ada")
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)

            await Cashier.create({
                fullname,
                email,
                password: hashPassword
            })
            res.status(200).send({message: 'Registtration success'})
        } catch (error) {
            console.error(error);
            res.status(400).send({message: 'Registratiom failed', error: error.message })
            
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            const isCashierExist = await Cashier.findOne({
                where: {
                    email
                }
            });

            if (!isCashierExist) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
    

            const isValid = await bcrypt.compare(password, isCashierExist.password);
    
            if (!isValid) {
                return res.status(400).json({
                    message: 'Incorrect password'
                });
            }

            const payload = { id: isCashierExist.id };
            const token = jwt.sign(payload, 'Jcwd0208', { expiresIn: '1h' });
    
            res.status(200).json({
                message: 'Login success',
                result: isCashierExist,
                token: token
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    keepLogin: async (req, res) => {
        try {
            const cashierId = req.cashier.id;
    
            const result = await Cashier.findOne({
                where: {
                    id: cashierId
                }
            });
    
            if (!result) {
                return res.status(400).json({
                    message: 'Pengguna tidak ditemukan'
                });
            }
    
            console.log(result);
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
      },
    getAll: async (req, res) => {
        try {
            const cashier = await Cashier.findAll();
            res.status(200).send({cashier});
        } catch (error) {
          console.log(error);
          res.status(400).send({message : 'error weh pokonamah'})  
        }
    },
    isVerified: async (req, res) => {
        const {isVerified}=req.body;
        try {
           await Cashier.update({isVerified}, {
            where: {
                id :req.params.id
            }
           }) 
           res.status(200).send("verified success")
        } catch (error) {
          res.status(400).send({message: error.message})  
        }
    },
    isDisabled: async (req, res) => {
        const {isDisabled}=req.body;
        try {
            await Cashier.update({isDisabled}, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send("disables success")
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
};