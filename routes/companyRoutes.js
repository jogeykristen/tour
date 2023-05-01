const router = require('express').Router();
const express = require('express');
const app = express();
const {signup, login} = require('../controller/companyController')
const { checkToken } = require('../authentication/token_validation')



router.route('/signup')
    .post(signup);
    

router.route('/login')
    .post(login);

module.exports = router;