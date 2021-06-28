const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

//TokenAuthentication
let secret = process.env.ACCESS_TOKEN_SECRET
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
    })
}



//Set uri to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database connection established successfully")
})

// Routers
const studentsRouter = require('./routes/students');
const lecturesRouter = require('./routes/lectures');
const administratorsRouter = require('./routes/administrators');
const subjectsRouter = require('./routes/subjects')
const teachersRouter = require('./routes/teachers')
const videosRouter = require('./routes/videos')
const convertRouter = require('./routes/convert')
const authorizationRouter = require('./routes/authorization')

app.use('/students', authenticateToken, studentsRouter)
app.use('/lectures', authenticateToken, lecturesRouter)
app.use('/administrators', administratorsRouter)
app.use('/subjects', authenticateToken, subjectsRouter)
app.use('/teachers', authenticateToken, teachersRouter)
app.use('/videos', videosRouter)
app.use('/convert', convertRouter)
app.use('/auth', authorizationRouter)

//startServer
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})