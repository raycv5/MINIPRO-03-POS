const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const PORT = 2000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("API TEST");
});

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server running on PORT ${PORT}`);
});
