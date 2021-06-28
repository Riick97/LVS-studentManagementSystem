const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const administratorSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    permissions: {type: String, required: true}
}, {
    timestamps: true,
});

const Administrator = mongoose.model('Administrator', administratorSchema);

module.exports = Administrator;