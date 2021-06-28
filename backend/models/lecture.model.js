const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    attendingStudents: [{type: String, required: false}],
}, {
    timestamps: false,
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;