const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: true }
}, {
    collection: 'users'
})

const model = mongoose.model('UserSchema', UserSchema);
module.exports = model;