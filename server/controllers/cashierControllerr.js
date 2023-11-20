const {Admin, Cashier } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter =require ("../middleware/transporter")
const fs = require('fs')
const Handlebars = require('handlebars');

module.exports = {
  register: async (req, res) => {
    try {
        const {  fullname, email, password } = req.body;
     
        const emailCheck = await Cashier.findOne({
          where: {
            email: email,
          },
        });
    
        if (emailCheck) {
          return res.status(400).send("Email already exists");
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newCashier = await Cashier.create({
          fullname,
          email,
          password: hashPassword,
        });
        const data = fs.readFileSync("./template.html", "utf-8");
        const tempCompile = await Handlebars.compile(data);
        const tempResult = tempCompile({
            fullname:fullname,
             link: `http://localhost:5173/verified/`
           
          });
        await transporter.sendMail({
          from: "agnaar218@gmail.com",
          to: email,
          subject: "email confirmation",
          html: tempResult,
        });
    
        res.status(200).send({ message: "Registration success", cashierId: newCashier.id });
      } catch (error) {
        console.error(error);
        res.status(400).send({ message: "Registration failed", error: error.message });
      }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const isCashierExist = await Cashier.findOne({
        where: {
          email,
          isDisabled: false
        },
      });

      if (!isCashierExist) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const isValid = await bcrypt.compare(password, isCashierExist.password);

      if (!isValid) {
        return res.status(401).send("incorect password");
      }

      const payload = { id: isCashierExist.id };
      const token = jwt.sign(payload, "minpro02", { expiresIn: "1h" });

      res.status(200).send({
        message: "Login success",
        result: isCashierExist,
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        message: "Internal server error",
      });
    }
  },
  keepLogin: async (req, res) => {
    try {
      const cashierId = req.cashier.id;
      const result = await Cashier.findOne({
        where: {
          id: cashierId,
        },
      });

      if (!result) {
        return res.status(400).json({
          message: "Pengguna tidak ditemukan",
        });
      }

      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const cashier = await Cashier.findAll();
      res.status(200).send({ cashier });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "error weh pokonamah" });
    }
  },
  isVerified: async (req, res) => {
    try {
      const { isVerified } = req.body;
  
      if (typeof isVerified !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input for isVerified. Must be a boolean.' });
      }
  
      const [updatedRowsCount] = await Cashier.update(
        { isVerified },
        { where: { id: req.params.id } }
      );
  
      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: 'Cashier not found.' });
      }
  
      // Successful update
      res.status(200).json({ message: 'Update successful', updatedRowsCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  isDisabled: async (req, res) => {
    const { id } = req.params;

    try {
      const cashier = await Cashier.findByPk(id);

      if (!cashier) {
        return res.status(404).send({ message: "Cashier not found" });
      }

      const updatedIsDisabled = !cashier.isDisabled;

      await Cashier.update(
        { isDisabled: updatedIsDisabled },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res
        .status(200)
        .send({ message: "Toggle success", isDisabled: updatedIsDisabled });
    } catch (error) {
      // Tanggapi kesalahan
      console.error("Error toggling isDisabled:", error);
      res.status(400).send({ message: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id; 
    try {
      const cashier = await Cashier.findByPk(id);

      if (cashier) {
        await cashier.destroy();
        res.status(204).send("Cashier berhasil di hapus");
      } else {
        res.status(404).send({ message: "Kasir tidak ditemukan." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Gagal menghapus kasir." });
    }
  },
  uploadProfilePhoto: async (req, res) => {
    try {
      const cashierId = req.cashier.id;

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const filename = req.file.filename;
      await Cashier.update(
        { profilePhoto: filename },
        { where: { id: cashierId } }
      );
      res.status(200).json({ message: 'Profile photo uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
