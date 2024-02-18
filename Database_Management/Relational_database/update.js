var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_db"
});

con.connect(function (err) {
    if (err) throw err;

    var sql = "update students set name='Mike' where id=7";
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows);
    });
});