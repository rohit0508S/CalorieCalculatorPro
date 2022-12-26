require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const mysql = require("mysql2");
// const connection = require("./connection/connection.js");
const user = require("./routes/userRoute.js");
const login = require("./routes/loginRoute.js");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(user);
app.use(login);

app.get("/", (req, res) => {
  res.send("server is running..");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
