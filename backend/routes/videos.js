const router = require('express').Router();
let Video = require('../models/video.model.js');

router.route('/').get((req, res) => {
    Video.find()
    .then(videos => res.json(videos))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const path = req.body.path;


    const newVideo = new Video({
        name,
        description,
        path,
    });

    newVideo.save()
    .then(() => res.json('Video added! ' + newVideo._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Video.findById(req.params.id)
    .then(video => res.json(video))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Video.findByIdAndDelete(req.params.id)
    .then(() => res.json('Video deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Video.findById(req.params.id)
    .then(video => {
        video.name = req.body.name;
        video.description = req.body.description;
        video.path = req.body.path;

        video.save()
        .then(() => res.json('Video updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router;