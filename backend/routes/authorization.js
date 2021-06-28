const router = require('express').Router();
const jwt = require('jsonwebtoken');
let Student = require('../models/student.model');
let Teacher = require('../models/teacher.model');
let Admin = require('../models/administrator.model');


//GetUsers
let studentUsers;
let teacherUsers;
let adminUsers;

function getUsersFromDB() {
    return new Promise(function (resolve){
        Student.find()
        .then(students => {
            studentUsers = students
            
        })
        .then(result => {
            Teacher.find()
            .then(teachers => {
                teacherUsers = teachers
            })
        })
        .then(result => {
            Admin.find()
            .then(admins => {
                adminUsers = admins
                resolve()
            })
        })
        .catch(err => res.status(400).json('Error: ' + err))
    })
}



const refreshTokens = [];
const secret = process.env.ACCESS_TOKEN_SECRET
function generateAccessToken(username) {
    return jwt.sign(username, secret, { expiresIn: '24h' });
}


router.route('/login').post( async(req, res) => {
    await getUsersFromDB()
    username = req.body.username;
    password = req.body.password;

    let user = getUser(username)
    verify()

    function getUser(username) {
        student = studentUsers.find(student => student.username == username)
        teacher = teacherUsers.find(teacher => teacher.username == username)
        admin = adminUsers.find(admin => admin.username == username)

        if (admin) return admin;
        if (teacher) return teacher;
        if (student) return student;
    }

    //UserNotFound
    function verify() {
        if (!user) {
            return res.status(401).send('User not found')
        }
    
        //PasswordIsCorrect
        if (password == user.password) {
            const accessToken = generateAccessToken({ username: req.body.username });
            const refreshToken = generateAccessToken({ username: req.body.username });
            refreshTokens.push(refreshToken)
            res.json({
                accessToken,
                refreshToken,
                user
            });
        } else {
            res.status(401).send('Wrong info')
        }
    }
});

router.route('/token').post((req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

router.route('/logout').post((req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
});

module.exports = router;