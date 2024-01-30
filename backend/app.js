const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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

module.exports = app;