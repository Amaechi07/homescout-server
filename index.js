require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const { sequelize } = require("./models");

app.use(express.json());
const db = require("./models");
app.use(cors());
app.use("/uploads", express.static("uploads"));

const propertiesRouter = require("./routes/Properties");
const authRoutes = require("./routes/Auth");

app.use("/properties", propertiesRouter);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("database connected successfully");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
