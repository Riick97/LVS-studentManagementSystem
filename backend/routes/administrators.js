const router = require('express').Router();
const Administrator = require('../models/administrator.model.js');

router.route('/').get((req, res) => {
    Administrator.find()
    .then(administrators => res.json(administrators))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const permissions = req.body.permissions


    const newAdministrator = new Administrator({
        name,
        lastName,
        email,
        username,
        password, 
        permissions
    });

    newAdministrator.save()
    .then(() => res.json('Administrator added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Administrator.findById(req.params.id)
    .then(administrators => res.json(administrators))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Administrator.findByIdAndDelete(req.params.id)
    .then(() => res.json('Administrator deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Administrator.findById(req.params.id)
    .then(administrator => {
        administrator.email = req.body.email;
        administrator.username = req.body.username;
        administrator.password = req.body.password;
        administrator.name = req.body.name;
        administrator.lastName = req.body.lastName;
        administrator.permissions = req.body.permissions;

        administrator.save()
        .then(() => res.json('Administrator updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router;