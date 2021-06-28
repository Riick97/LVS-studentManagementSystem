const router = require('express').Router();
const Subject = require('../models/subject.model.js');

router.route('/').get((req, res) => {
    Subject.find()
    .then(subjects => res.json(subjects))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const videos = req.body.videos;
    const teachers = req.body.teachers;
    const enrolledStudents = req.body.enrolledStudents;
    const lectures = req.body.lectures;
    const assignments = req.body.assignments;


    const newSubject = new Subject({
        name,
        description,
        videos,
        teachers,
        enrolledStudents,
        lectures,
        assignments
    });

    newSubject.save()
    .then(() => res.json('Subject added! ' + newSubject._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Subject.findById(req.params.id)
    .then(subject => res.json(subject))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Subject.findByIdAndDelete(req.params.id)
    .then(() => res.json('Subject deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Subject.findById(req.params.id)
    .then(subject => {
        subject.name = req.body.name;
        subject.description = req.body.description;
        subject.videos = req.body.videos;
        subject.teachers = req.body.teachers;
        subject.enrolledStudents = req.body.enrolledStudents;
        subject.lectures = req.body.lectures;
        subject.assignments = req.body.assignments;

        subject.save()
        .then(() => res.json('Subject updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router;