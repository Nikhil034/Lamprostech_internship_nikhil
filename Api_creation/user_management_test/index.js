const e = require("express");
const { response } = require("express");
const exprss = require("express");
const jwt = require("jsonwebtoken");
const app = exprss();
const SecretKey = "unknownkey";

app.get("/", (req, res) => {
    res.json({
        message: "Hello,Token"
    });
});

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "unknow",
        email: "unknow@gmail.com"
    }
    jwt.sign({ user }, SecretKey, { expiresIn: '500s' }, (err, token) => {
        res.json({ token });
    });
});

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (err) {
            res.send({ result: "Invalid token!" });
        }
        else {
            res.json({ message: "Profile accessed", authData });
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.send({ result: "Token is not valid!" });
    }
}


app.listen(3000, () => {
    console.log('Server listen on 3000 port');
});

