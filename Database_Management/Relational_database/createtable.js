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
    var sql = "create table students(id int primary key,name varchar(30),city varchar(20))";
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(res);
    });

});