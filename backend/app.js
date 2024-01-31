const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

const mongoDBUri = 'mongodb+srv://saadia:dtukhogyi9QMWsQ5@cluster0.7i5apjg.mongodb.net/node-angular?retryWrites=true&w=majority';
mongoose.connect(mongoDBUri)
.then(() => console.log('Connected to database!'))
.catch((error) => console.log('Connection failed: ', error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
})

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: '123123',
            title: 'First post from backend',
            content: 'This is coming from the server app as I work on building a MEAN app!'
        },
        {
            id: '456456',
            title: 'Second post from backend',
            content: 'This is also coming from the server app as I work on building a MEAN app!'
        },
    ]
    res.status(200).json({
        message: 'Get Posts Successful',
        posts: posts
    })
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    console.log(post);
    post.save();

    res.status(201).json({
        message: 'Post added!'
    });
});

module.exports = app;