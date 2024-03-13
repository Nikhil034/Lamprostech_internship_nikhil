require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const usermodel = require("./users");
const app = express();
app.use(bodyParser.json());

let isAdmin = 0;

//create a new user endpoint
app.post("/api/users", (req, res) => {
    const newUser = new usermodel({
        username: req.body.name,
        password: req.body.password,
        role: req.body.role,
    });

    newUser.save()
        .then(savedUser => {
            console.log('User saved successfully:', savedUser);
        })
        .catch(error => {
            console.log('Error saving user:', error);
        });
})


app.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    const user = await usermodel.findOne({ refreshToken });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ username: user.username, role: user.role })
        res.json({ accessToken: accessToken })
    })
})
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '2m' })
}





// Function to generate JWT tokens
function generateTokens(user) {
    if (user.role == "admin") {
        isAdmin = 1;
    }
    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN, { expiresIn: '2m' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

// Route or controller function for user authentication
async function authenticateUser(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await usermodel.findOne({ username });

        // If user not found or password is incorrect, send error response
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate access token and refresh token
        const { accessToken, refreshToken } = generateTokens(user);
        user.access_token = accessToken;
        user.refresh_token = refreshToken;
        console.log(isAdmin);
        await user.save();

        // Return tokens as response
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


app.post("/api/login", authenticateUser);

//create a endpoint for retrive specific user
app.get("/api/users/:id", verifyToken, (req, res) => {
    if (isAdmin == 1) {
        try {
            jwt.verify(req.token, process.env.ACCESS_TOKEN, async (err, data) => {
                if (err) {
                    res.send({ message: 'unauthorized:invalid token or expired token!' })
                }
                else {
                    const userId = req.params.id;
                    const user = await usermodel.findOne({ _id: userId });

                    if (!user) {
                        return res.send({ message: "User not found with this id!" });
                    }

                    res.json(user);
                }
            })
        } catch (error) {
            console.error('Error querying user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.send("You don't have access to view user!");
    }

});




//create a endpoint for retrive all users
app.get("/api/users", verifyToken, async (req, res) => {
    if (isAdmin == 1) {
        try {
            const authData = await jwt.verify(req.token, process.env.ACCESS_TOKEN);
            const users = await usermodel.find({}, { username: 1, role: 1, _id: 0 });
            res.json(users);
        } catch (err) {
            console.error('Error querying users:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        jwt.verify(req.token, process.env.ACCESS_TOKEN, (err, authData) => {
            if (err) {
                res.send({ message: 'Unauthorized: Invalid or expired token' });
            } else {
                res.json({ auth: "Your Profile", authData })
            }
        });
    }

})

function verifyToken(req, res, next) {
    const bearerheader = req.headers['authorization'];
    if (typeof bearerheader != 'undefined') {
        const bearer = bearerheader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({ result: "Token is not valid!" });
    }
}



//create a endpoint for update user details
app.put("/api/users/:id", verifyToken, (req, res) => {
    if (isAdmin == 1) {
        try {
            jwt.verify(req.token, process.env.ACCESS_TOKEN, async (err, data) => {
                if (err) {
                    res.send({ message: 'unauthorized:invalid token or expired token!' })
                }
                else {
                    const userId = req.params.id;
                    const user = await usermodel.findOne({ _id: userId });
                    console.log(user);


                    if (!user) {
                        return res.send({ message: "User not found with this id!" });
                    }
                    else {
                        user.username = req.body.username;
                        user.password = req.body.password;
                        await user.save();
                        res.json({ message: "Save changes succesfully" });
                    }


                }
            })
        } catch (error) {
            console.error('Error querying user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.send("You don't have access to edit user!");
    }


})



//create a endpoint for delete a user
app.delete("/api/users/:id", verifyToken, (req, res) => {
    if (isAdmin == 1) {
        try {
            jwt.verify(req.token, process.env.ACCESS_TOKEN, async (err, data) => {
                if (err) {
                    res.send({ message: 'unauthorized:invalid token or expired token!' })
                }
                else {
                    const userId = req.params.id;
                    const deleteResult = await usermodel.deleteOne({ _id: userId });

                    if (deleteResult.deletedCount === 0) {
                        res.send({ message: "User not found!" });
                    }
                    res.json({ message: 'User deleted succesfully!' });
                }
            })
        } catch (error) {
            console.error('Error querying user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.send("You don't have access to delete user!");
    }


})

app.listen(3000, () => {
    console.log("Server listen on port 3000");
})