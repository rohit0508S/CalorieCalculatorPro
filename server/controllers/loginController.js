const express = require("express");
const router = express.Router();
const connection = require("../connection/connection");
const jwt = require("jsonwebtoken");

// Register user
exports.register = (req, res) => {
  let user = req.body;
  console.log("user--> ", user);
  query = "insert into alluser(age, name, email, password) values(?, ?, ?, ?)";
  connection.query(
    query,
    [user.age, user.name, user.email, user.password],
    (err, result) => {
      if (err) {
        console.log("err-->", err);
        return res.status(500).send(err);
      } else {
        console.log("result-->", result);
        return res.status(200).send("User Added Successful");
      }
    }
  );
};

// Find all user
exports.findAll = (req, res) => {
  let users = "select * from alluser";
  connection.query(users, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
};

// Login User
exports.login = (req, res) => {
  let data = req.body;
  console.log("input...", data);
  let user = "select * from alluser where email = ?";
  connection.query(user, [data.email], (err, result) => {
    if (err) {
      return res.status(500).send("Invalid Email or Password");
    } else {
      if (result.length == 0) {
        return res.status(500).send("invalid email and password");
      }
      console.log("output...", result);
      if (result[0].password != data.password) {
        return res.status(500).send("Invalid Email or Password");
      }
      let token = jwt.sign({ email: data.email }, process.env.SECRET_KEY);
      return res.status(200).send({ token, data: result });
    }
  });
};
