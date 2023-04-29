const router = require('express').Router();

const {signUp, login, getusers, updateusers, searchusers, deleteusers}= require('../controller/userController')
const { checkToken } = require('../authentication/token_validation')

router.route('/signup')
    .post(signUp);

router.route('/login')
    .post(login);

router.route('/getuser')
    .get(getusers)

router.route('/updateuser')
    .put(updateusers);

router.route('/:email')
    .get(searchusers);

router.route('/:email')
    .delete(deleteusers);

module.exports = router;