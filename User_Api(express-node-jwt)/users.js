const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {}).then(() => {
    console.log("connect");

}).catch(err => {
    console.error(err.message);
});

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;



