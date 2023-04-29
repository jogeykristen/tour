const router = require('express').Router();

const { createTour, updateTour } = require('../controller/main');
const { checkToken } = require('../authentication/token_validation')
const {checksToken} = require('../authentication/company_validation')


router.route('/create')
    .post(checkToken,createTour)

router.route('/update/:place')
    .put(checksToken,updateTour)

module.exports = router;

