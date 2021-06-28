const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: {type: String, required: true},
    permissions: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    subjects: [{type: String, required: false}],
    semesters: [
        {
            period: {type: String, required: true},
            subject: {type: String, required: false},
            grades: [
                {
                    description: {type: String, required: true},
                    weight: {type: Number, required: true},
                    score: {type: Number, required: true}
                }
            ],
            rubrics: [
                {
                    name: {type: String, required: true},
                    rubricCategories: [{
                        description: {type: String, required: false},
                        score: {type: Number, required: false},
                    }],
                    grade: {type: Number, required: false},
                    weight: {type: Number, required: false}
                }
            ]
        }
    ]
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;