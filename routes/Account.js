const express = require('express');
const passport = require('passport');
var router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../middleware/Auth');
const AccountController = require('../controllers/AccountController');
router.post('/login', isNotLoggedIn, AccountController.login);
router.post('/test', AccountController.test);
// router.post(
//   '/profile',
//   passport.authenticate('jwt', { session: false }),
//   AccountController.profile
// );

module.exports = router;
