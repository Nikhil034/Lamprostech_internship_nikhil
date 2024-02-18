var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_db"

});

con.connect(function (err) {
    if (err) throw err;
    // con.query("SELECT * FROM students", function (err, result, fields) 
    con.query("SELECT * FROM students ORDER BY name desc limit 4", function (err, result) {
        // con.query("SELECT * FROM students WHERE name LIKE 'T%'", function (err, result) 
        // var sql = 'SELECT * FROM students WHERE name = ' + mysql.escape('\name');   
        if (err) throw err;
        console.log(result);
    });
});

// var name = 'Amy';
// var adr = 'Mountain 21';
// var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
// con.query(sql, [name, adr], function (err, result) {
//     if (err) throw err;
//     console.log(result);
// });


