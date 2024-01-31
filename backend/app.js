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
    Post.find()
        .then((data) => {
            res.status(200).json({
                message: 'Get Posts Successful',
                posts: data
            });
        })
        .catch((err) => res.status(500).json({
            message: 'Error when trying to fetch posts: ' + err
            })
        );
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save()
        .then((resp) => res.status(201).json({
            message: 'Post added!',
            id: resp._id
            })
        )
        .catch((err) => res.status(500).json({
            message: 'Error when trying to post: ' + err
            })
        )

    
});

app.delete('/api/posts/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((resp) => res.status(200).json({
                message: 'Post deleted!'
            })
        )
        .catch((err) => res.status(500).json({
            message: 'Error when trying to delete: ' + err
            })
        );
});

module.exports = app;