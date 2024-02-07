const express = require('express');
const bcrypt = require('bcryptjs');

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
                        message: 'User creadted!',
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        message: 'Error when trying to create user!',
                    })
                })
        });
});

module.exports = router;