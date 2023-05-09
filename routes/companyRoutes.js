const router = require('express').Router();
const express = require('express');
const app = express();
const {signup, login} = require('../controller/companyController')
const { checkToken } = require('../authentication/token_validation')
const {myLogger} = require('../middleware/date')



router.route('/signup')
    .post(myLogger,signup);
    

router.route('/login')
    .post(login);

module.exports = router;