const router = require('express').Router();
const Lecture = require('../models/lecture.model.js');

router.route('/').get((req, res) => {
    Lecture.find()
    .then(lectures => res.json(lectures))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const attendingStudents = req.body.attendingStudents;

    const newLecture = new Lecture({
        name,
        date,
        attendingStudents,
    });

    newLecture.save()
    .then(() => res.json('Lecture added! ' + newLecture._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Lecture.findById(req.params.id)
    .then(lecture => res.json(lecture))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Lecture.findByIdAndDelete(req.params.id)
    .then(() => res.json('Lecture deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Lecture.findById(req.params.id)
    .then(lecture => {
        lecture.name = req.body.name;
        lecture.date = req.body.date;
        lecture.attendingStudents = req.body.attendingStudents;

        lecture.save()
        .then(() => res.json('Lecture updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router;