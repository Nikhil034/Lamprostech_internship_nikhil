const mysql = require("mysql");
const arg = process.argv.slice(2);


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_db"
});



switch (arg[0]) {
    case "1":
        con.connect(function (err) {
            if (err) throw err;
            var sql = "insert into students(name,city)values(?,?)";
            con.query(sql, [arg[1], arg[2]], function (err, res) {
                if (err) throw err;
                console.log("Number of records inserted: " + res.affectedRows);
            });
        });
        break;
    case "2":
        var sql = "select * from students";
        con.query(sql, function (err, data) {
            if (err) throw err;
            console.table(data);
        });
        break;
    case "3":
        var sql = "update students set name=? where id=?";
        con.query(sql, [arg[1], arg[2]], function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " record(s) updated");
        });
        break;
    case "4":
        var sql = "delete from students where id=?";
        con.query(sql, [arg[1]], function (err, res) {
            if (err) throw err;
            console.log("Number of records deleted: " + res.affectedRows);
        });
        break;
    case "5":
        var sql = "select * from students where id=?";
        con.query(sql, [arg[1]], function (err, data) {
            if (err) throw err;
            console.table(data);
        });
        break;
    case "6":
        var sql = "select * from students limit ?";
        var lmt = Number(arg[1]);
        con.query(sql, [lmt], function (err, data) {
            if (err) throw err;
            console.table(data);
        });
        break
    case "7":
        var sql = "select * from students where name=?";
        con.query(sql, [arg[1]], function (err, data) {
            if (err) throw err;
            console.table(data);
        });
        break;
    default: console.log("\n-------WELCOME TO STUDENT CRUD----------\n");
        console.log("1.Insert record [give name and city]");
        console.log("2.View records [All Records]");
        console.log("3.Edit record [new name and id you want edit]");
        console.log("4.Delete record [Pass id to delete]");
        console.log("5.View Specific record [pass id]");
        console.log("6.View records with limit [pass limit]");
        console.log("7.View specific record [pass name]");
}
