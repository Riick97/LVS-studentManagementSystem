const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const studentId = req.body.studentId;
    const permissions = req.body.permissions;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const subjects = req.body.subjects;
    const semesters = req.body.semesters;


    const newStudent = new Student({
        studentId,
        name,
        lastName,
        permissions,
        email,
        username,
        password,
        subjects,
        semesters,
    });

    newStudent.save()
    .then(() => res.json('Student added! ' + newStudent._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        student.name = req.body.name;
        student.lastName = req.body.lastName;
        student.studentId = req.body.studentId;
        student.permissions = req.body.permissions;
        student.email = req.body.email;
        student.username = req.body.username;
        student.password = req.body.password;
        student.subjects = req.body.subjects;
        student.semesters = req.body.semesters;

        student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router;