const express = require('express');
const router = express.Router();
const authHttpHandler = require('../libs/auth/auth');

router.route('/login')
    .post(authHttpHandler.loginUser);



exports.router = router;
