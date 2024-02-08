const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User creadted!'
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        message: 'Error when trying to create user!',
                        error: err
                    })
                })
        });
});

//Refactor this if possible. Maybe use nested promise handling
router.post("/login", (req, res, next) => {
    let userMatch;
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: 'Invalid email for user'
                })
            }
            userMatch = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: 'Invalid password for user'
                })
            }
            const token = jwt.sign(
                { email: req.body.email, userId: userMatch._id }, 
                'secret_should_be_longer_than_this',
                { expiresIn: '1h' });
            res.status(200).json({
                message: 'Login successful!',
                token: token
            });
        })
        .catch(err => {
            res.status(401).json({
                message: 'Authorization failed!',
                error: err
            })
        })
});

module.exports = router;