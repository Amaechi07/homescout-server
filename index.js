const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const db = require("./models");
app.use(cors());
app.use("/uploads", express.static("uploads"));

const propertiesRouter = require("./routes/Properties");
const authRoutes = require("./routes/Auth");

app.use("/properties", propertiesRouter);
app.use("/auth", authRoutes);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {});
});
