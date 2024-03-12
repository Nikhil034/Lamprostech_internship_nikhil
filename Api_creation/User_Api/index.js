const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());
let Secretkeyuser = "";

let usersData = [];

app.post("/register", (req, res) => {
    let uniqueId = Math.floor(Math.random() * 10000);
    let user = {
        id: uniqueId,
        Name: req.body.name,
        Email: req.body.email,
        Role: req.body.role,
        Secretkey: `${req.body.name}_${req.body.email}`,
    }
    usersData.push(user);
    console.dir(usersData);
    res.send("save succesfully!");
});

function authenticateUser(name, email) {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].Name === name && usersData[i].Email === email) {
            return usersData[i];
        }
    }
    return null;
}

app.post("/login", (req, res) => {
    const authenticatedUser = authenticateUser(req.body.name, req.body.email);
    Secretkeyuser = authenticatedUser.Secretkey;
    //console.log(`line number 36 ${Secretkeyuser}`);
    if (authenticatedUser) {
        jwt.sign({ authenticatedUser }, Secretkeyuser, { expiresIn: '100s' }, (err, token) => {
            res.send({ token });
        })
    }
    else {
        res.send('Authentication failed: User not found or invalid credentials');

    }
});

app.post("/viewprofile", verifyToken, (req, res) => {
    jwt.verify(req.token, Secretkeyuser, (err, authData) => {
        if (err) {
            res.send({ message: 'Unauthorized: Invalid or expired token' });
        } else {
            res.json({ auth: "Your Profile", authData })
        }
    });
});

function verifyToken(req, res, next) {
    const bearerheader = req.headers['authorization'];
    if (typeof bearerheader != 'undefined') {
        const bearer = bearerheader.split(" ");
        // console.log(`line number 62 ${bearer}`);
        const token = bearer[1];
        // console.log(`line number 64 ${token}`);
        req.token = token;
        next();
    } else {
        res.send({ result: "Token is not valid!" });
    }
}

app.listen(3000, () => {
    console.log("Server running on port :3000");
});