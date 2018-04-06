const mysql = require('mysql');

const auth_obj = {
    "host"     : process.env.DB_ADDRESS,
    "user"     : process.env.DB_USERNAME,
    "password" : process.env.DB_PASSWORD,
    "database" : "nfc_hunt"
  }
let db = null;
module.exports = function () {
    if(!db) {
            db = mysql.createConnection(auth_obj);
            console.log("DB connection successful");
    }
    return db;
};

