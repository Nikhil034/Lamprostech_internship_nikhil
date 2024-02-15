var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_db"

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
    var sql = "insert into students(id,name,city)values(1,'Test','Test')";
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log("1 record inserted, ID: " + res.insertId);
    });

});