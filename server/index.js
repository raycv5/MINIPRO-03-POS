const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const routes = require("./routes");

const PORT = 2000;

const app = express();
app.use("/public", express.static("./public"));

app.use(express.json());
app.use(cors());

// console.log(process.env.MESSAGE);

app.get("/api", (req, res) => {
   res.send("API TEST");
});

app.use("/admin", routes.admin);
app.use("/categories", routes.category);
app.use("/subcategories", routes.subCategory);
app.use("/products", routes.product);

app.listen(PORT, () => {
   //  db.sequelize.sync({ alter: true });
   console.log(`Server running on PORT ${PORT}`);
});
