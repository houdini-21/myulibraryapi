const express = require('express');
const router = express.Router();
const authHttpHandler = require('../libs/auth/auth');

router.route('/login')
    .post(authHttpHandler.loginUser);

router.route('/signup')
    .post(authHttpHandler.createUser);

exports.router = router;
