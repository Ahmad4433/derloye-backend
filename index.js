const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const userAccountRoutes = require("./routes/user/account/account");
const userCardRoutes = require("./routes/user/card/card");
const paymentRoutes = require("./routes/orders/order");
const path = require("path");

const app = express();
const corsOptions = {
  'Access-Control-Allow-Origin':'http://localhost:3000'
}
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/tmp", express.static(path.join(__dirname, "tmp")));
app.get("/", (req, res, next) => {
  res.send("server is running");
});

app.use("/user", userAccountRoutes);
app.use("/card", userCardRoutes);
// app.use('/order',paymentRoutes)

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "server error";
  res.status(statusCode).json({ message: message, status: false });
});



try {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((connection) => {
      console.log("db is connected");
      app.listen(process.env.PORT, () =>
        console.log(`server is running on port ${process.env.PORT}`)
      );
    })
    .catch((error) => {
      console.log(error);
    });
} catch (error) {
  console.log("faild to connected to db");
}
