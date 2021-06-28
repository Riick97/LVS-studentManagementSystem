const router = require('express').Router();
let Teacher = require('../models/teacher.model.js');

router.route('/').get((req, res) => {
    Teacher.find()
    .then(teachers => res.json(teachers))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const teacherId = req.body.teacherId;
    const permissions = req.body.permissions;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const subjects = req.body.subjects;
    const semesters = req.body.semesters;

    const newTeacher = new Teacher({
        name,
        lastName,
        teacherId,
        permissions,
        email,
        username,
        password,
        subjects,
        semesters
    });

    newTeacher.save()
    .then(() => res.json('Teacher added! ' + newTeacher._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Teacher.findById(req.params.id)
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.json('Teacher deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Teacher.findById(req.params.id)
    .then(teacher => {
        teacher.name = req.body.name;
        teacher.lastName = req.body.lastName;
        teacher.teacherId = req.body.teacherId;
        teacher.permissions = req.body.permissions;
        teacher.email = req.body.email;
        teacher.username = req.body.username;
        teacher.password = req.body.password;
        teacher.subjects = req.body.subjects;
        teacher.semesters = req.body.semesters;

        teacher.save()
        .then(() => res.json('Teacher updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router;