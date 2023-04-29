const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});
module.exports.user = mongoose.model('user', User);