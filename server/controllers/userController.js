const express = require("express");
const router = express.Router();
const db = require("../connection/connection");

// get all data
exports.findAll = (req, res) => {
  const { id } = req.params;
  // console.log("fk-------<", id);
  const sqlGet = `select * from user where fk=?`;
  db.query(sqlGet, id, (error, result) => {
    // console.log(result);
    res.send(result);
  });
};

// add data
exports.addData = (req, res) => {
  const {
    date,
    intakecalorie,
    targetincalorie,
    burncalorie,
    targetburncalorie,
    fk,
  } = req.body;
  console.log("---->", date, intakecalorie);
  const sqlInsert =
    "INSERT INTO user(date, intakecalorie, targetincalorie, burncalorie, targetburncalorie, fk) VALUES(?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [date, intakecalorie, targetincalorie, burncalorie, targetburncalorie, fk],
    (error, result) => {
      if (error) console.log(error);
      else {
        console.log("insert successful");
        res.status(200).send(result);
      }
    }
  );
};

// delete data
exports.deleteData = (req, res) => {
  console.log("id-----", req.params);
  const { id } = req.params;
  const sqlRemove = "DELETE FROM user WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      return res.status(200).send(result);
    }
  });
};

// details
// app.get("/api/get/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlGet = "SELECT * FROM user WHERE id=?";
//   db.query(sqlGet, id, (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });

// update data
exports.updateData = (req, res) => {
  const { id } = req.params;
  const {
    intakecalorie,
    targetincalorie,
    burncalorie,
    targetburncalorie,
  } = req.body;
  const sqlUpdate =
    "UPDATE user SET intakecalorie=?, targetincalorie=?, burncalorie=?, targetburncalorie=? WHERE id= ?";
  db.query(
    sqlUpdate,
    [intakecalorie, targetincalorie, burncalorie, targetburncalorie, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
};

// get food item
exports.getFoodItem = (req, res) => {
  const sqlGet = "SELECT * FROM fooditem";
  db.query(sqlGet, (error, result) => {
    // console.log(result);
    res.send(result);
  });
};

// get energy burn
exports.getEnergyBurn = (req, res) => {
  const sqlGet = "SELECT * FROM exercise";
  db.query(sqlGet, (error, result) => {
    // console.log(result);
    res.send(result);
  });
};

// searching
exports.searching = (req, res) => {
  const value = req.params.value;
  console.log(value);
  let data = `select * from gps where DeviceId like '%${value}%' or DeviceType like '%${value}%'`;
  connection.query(data, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(dateTime(result));
    }
  });
};

// sorting
exports.sorting = (req, res) => {
  const { sort } = req.params;
  const { id } = req.body;
  // const data = JOSN.parse(localStorage.getItem("data"));
  // console.log("data->", data);
  console.log("ch->", id);
  console.log("sort->", sort);
  // console.log("i am sorting----->", sort);
  // if (sort === "ase") {
  //   data = "SELECT * FROM user order by id desc;";
  // } else {
  //   data = "select * from user";
  // }
  // db.query(data, (err, result) => {
  //   if (err) {
  //     return res.status(500).send(err);
  //   } else {
  //     console.log(result);
  //     return res.status(200).send(result);
  //   }
  // });
};
