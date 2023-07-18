const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const colors = require("colors/safe");
const errorHandler = require("./app/utils/errorHandler.util");
require("dotenv").config();

// use
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(colors.blue("Connect database Successfully")))
  .catch((error) => {
    console.log(colors.red(error));
  });

// Router
app.use("/api/v1/", require("./app/routes/server"));
app.use("/api/v1/client", require("./app/routes/client"));

// running
app.listen(process.env.PORT, () => {
  console.log(colors.yellow(`App running at http://localhost:${process.env.PORT}`));
});

// error handler
app.use(errorHandler);
