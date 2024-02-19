var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const arg = process.argv.slice(2);



switch (arg[0]) {
    case "1": var obj = { name: arg[1], role: arg[2], city: arg[3] };
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("employees").insertOne(obj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        break;

    case "2": MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("employees").find({}).toArray(function (err, res) {
            if (err) throw err;
            console.table(res);
            db.close();
        });
    });
        break;

    case "3": MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { name: arg[1] };
        var newvalues = { $set: { role: arg[2] } };
        dbo.collection("employees").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated!");
            db.close();
        });
    });
        break;

    case "4": MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { name: arg[1] };
        dbo.collection("employees").deleteOne(query, function (err, res) {
            if (err) throw err;
            console.log("1 document deleted!");
            db.close();
        });
    });
        break;

    case "5": MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("employees").findOne({
            role: arg[1]
        }, function (err, res) {
            if (err) throw err;
            console.table(res);
            db.close();
        });
    });
        break;
    case "6": MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var srtnm = { name: -1 };
        var lmt = Number(arg[1]);
        dbo.collection("employees").find().sort(srtnm).limit(lmt).toArray(function (err, res) {
            if (err) throw err;
            console.table(res);
            db.close();
        });
    });
        break;
    default: console.log("---Welcome to mongodb crud----");
        console.log("\n 1.Insert New Employee(name,role,city)");
        console.log("\n 2.View Employees");
        console.log("\n 3.Edit Employee(name,new role)");
        console.log("\n 4.Delte Employee (name)");
        console.log("\n 5.View Specific Employee (role)");
        console.log("\n 6.Sort in Decending with limit (limit)");
        break;
}



