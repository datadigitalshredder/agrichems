const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    profession: {
        type: String
    },
    location: {
        type: String
    }
});

module.exports = user = mongoose.model('user', user);
// return mongoose.model('users', user);