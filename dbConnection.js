const mysql = require('mysql');
const fs = require('fs');

//const auth_obj = JSON.parse(fs.readFileSync(__dirname + '/db_auth.json'));
const auth_obj = {
    "host"     : "localhost",
    "user"     : process.env.DB_USERNAME,
    "password" : process.env.DB_PASSWORD,
    "database" : "nhf_hunt"
  }
const db = null;
module.exports = function () {
    if(!db) {
            db = mysql.createConnection(auth_obj);
            console.log("DB connection successful");
    }
    return db;
};

