var mysql = require('mysql');
var fs = require('fs');

var auth_obj = JSON.parse(fs.readFileSync(__dirname + '/db_auth.json'));

var db = null;
module.exports = function () {
    if(!db) {
            db = mysql.createConnection(auth_obj);
            console.log("DB connection successful");
    }
    return db;
};

