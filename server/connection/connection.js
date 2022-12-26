const mysql = require("mysql2");
const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Rohit@7585",
  database: "crud_contact1",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected");
});

module.exports = connection;
