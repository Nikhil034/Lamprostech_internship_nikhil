var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_db"

});

con.connect(function (err) {
    if (err) throw err;
    let sql = "delete from students where id=6";

    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows);
    })
})