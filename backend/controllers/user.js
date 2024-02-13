const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.userSignup = (req, res, next) => {
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
}

exports.userLogin = (req, res, next) => {
    /* SOLUTION #1 - from the Udemy training */
    // let userMatch;
    // User.findOne({ email: req.body.email })
    //     .then(user => {
    //         if(!user) {
    //             return res.status(401).json({
    //                 error: {
    //                     message: 'Invalid email for user'
    //                 }
    //             })
    //         }
    //         userMatch = user;
    //         return bcrypt.compare(req.body.password, user.password)
    //     })
    //     .then(result => {
    //         if(!result) {
    //             return res.status(401).json({
    //                 error: {
    //                     message: 'Invalid password for user'
    //                 }
    //             })
    //         }
    //         const token = jwt.sign(
    //             { email: req.body.email, userId: userMatch._id }, 
    //             'secret_which_is_my_secret_and_should_be_longer_than_this',
    //             { expiresIn: '1h' });

    //         res.status(200).json({
    //             message: 'Login successful!',
    //             token: token,
    //             expiresIn: 3600,
    //             userId: userMatch._id
    //         });
    //     })
    //     .catch(err => {
    //         res.status(401).json({
    //             error: {
    //                 message: 'Login failed',
    //                 ...err,
    //             }
    //         })
    //     })

    /* SOLUTION #2 - refactored by me */
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if(result) {
                            const token = jwt.sign(
                                { email: req.body.email, userId: user._id }, 
                                'secret_which_is_my_secret_and_should_be_longer_than_this',
                                { expiresIn: '1h' });
                
                            res.status(200).json({
                                message: 'Login successful!',
                                token: token,
                                expiresIn: 3600,
                                userId: user._id
                            });
                        } else throw Error;
                    })
                    .catch(err => {
                        res.status(401).json({
                            error: {
                                ...err,
                                message: 'Invalid password for user'
                            }
                        })
                    });
            } else throw Error;
        })
        .catch(err => {
            res.status(401).json({
                error: {
                    message: 'Invalid user email',
                    ...err,
                }
            })
        })
}