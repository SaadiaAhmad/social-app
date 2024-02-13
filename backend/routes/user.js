const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserController = require('../controllers/user');

const router = express.Router();

router.post("/signup", UserController.userSignup);

router.post("/login", UserController.userLogin);

module.exports = router;