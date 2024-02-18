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
    var sql = "INSERT INTO students (name, city) VALUES ?";
    var values = [
        ['John', 'Highway'],
        ['Peter', 'Lowstreet'],
        ['Amy', 'Apple'],
        ['Hannah', 'Mountain'],
        ['Michael', 'Valley'],
        ['Sandy', 'Ocean'],
        ['Betty', 'Green'],
        ['Richard', 'Sky'],
        ['Susan', 'One'],
        ['Vicky', 'Yellow'],
        ['Ben', 'Park'],
        ['William', 'Central'],
        ['Chuck', 'Main'],
        ['Viola', 'Sideway']
    ];
    con.query(sql, [values], function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log("Number of records inserted: " + res.affectedRows);
    });

});