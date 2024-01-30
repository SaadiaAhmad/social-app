const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    res.status(201).json({
        message: 'Post added!'
    });
});

module.exports = app;