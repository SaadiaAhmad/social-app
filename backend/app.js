const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts');

const app = express();

const mongoDBUri = 'mongodb+srv://saadia:dtukhogyi9QMWsQ5@cluster0.7i5apjg.mongodb.net/node-angular?retryWrites=true&w=majority';
mongoose.connect(mongoDBUri)
.then(() => console.log('Connected to database!'))
.catch((error) => console.log('Connection failed: ', error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/images", express.static(path.join("backend/images")));

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
});

const basePath = '/api/posts';

app.use(basePath, postsRoutes);

module.exports = app;