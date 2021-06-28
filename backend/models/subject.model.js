const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    videos: [{type: String, required: false}],
    teachers: [{type: String, required: false}],
    enrolledStudents: [{type: String, required: false}],
    lectures: [{type: String, required: false}],
    assignments: [{
        name: {type: String, required: false},
        date: {type: String, required: false}
    }]
}, {
    timestamps: false,
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
