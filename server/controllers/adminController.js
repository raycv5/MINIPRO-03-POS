const { Admin } = require("../models/");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const Handlebars = require('handlebars');
const  transporter  = require('../middleware/transporter');
const admin = require("../models/admin");




module.exports = {
  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const emailCheck = await Admin.findOne({
        where : {
          email : email
        }
      })

      if (emailCheck) {       
        return res.status(400).send("email sudah ada")
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword=await bcrypt.hash(password, salt)

      await Admin.create({
        fullname,
        email,
        password: hashPassword
      });

      const data = fs.readFileSync('./template.html', 'utf-8')
      const tempCompile = await Handlebars.compile(data)
      const tempResult = tempCompile({fullname: fullname})
  
      await transporter.sendMail({
          from: 'agnaar218@gmail.com',
          to: email,
          subject: 'email confirmation',
          html: tempResult
      })
  
      res.status(201).send({ message: 'Registration successful' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'Registration failed', error: err.message });
    }
  },
  login: async (req, res) =>{
    try {
        const {email, password} = req.body

        const isUserExist = await Admin.findOne({
            where:{
                email
            }
        })
        if (!isUserExist) {
            return res.status(409).send({
                message: 'user not found'
            })
        }

        const isValid = await bcrypt.compare(password, isUserExist.password)

        if(!isValid) {
           return res.status(400).send({
                message: 'incorrect password'
            })
        }

        const payload = {id: isUserExist.id, isAdmin: isUserExist.isAdmin}
        const token = jwt.sign(payload, 'Jcwd0208',{expiresIn:'1h'})

        res.status(200).send({
            message: 'success',
            result: isUserExist,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({err: err.message})
    }
},

keepLogin: async (req, res) => {
  try {
      const result = await Admin.findOne({
          where: {
              id: req.admin.id
          }
      })

      if (!admin) {
        return res.status(400).send("pengguna tidak ditemukan");
      }
      console.log(result)
      res.status(200).send(result)
  } catch (err) {
      res.status(400).send({err: err.message})
  }
},
  
  
  getAll: async (req, res) => {
    try {
      const admin = await Admin.findAll();
      res.status(200).send({ admin });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'Error fetching users', error: err.message });
    }
},
updateImage: async (req, res) => {
  try {
      await Admin.update({Image: req.file?.path}, {
          where: {
              id: req.params.id
          }
     }) 
      console.log(req.file)
      res.status(200).send('upload success')
  } catch (err) {
      console.log(err)
      res.status(400).send({err: err.message})
  }
},
isVerified: async (req, res) => {
  const {isVerified}=req.body;
  try {
    await Admin.update({isVerified}, {
      where: {
        id : req.params.id
      }
    })
    res.status(200).send("verified")
  } catch (error) {
    res.status(400).send({message: error.message})
  }
}
  
};
