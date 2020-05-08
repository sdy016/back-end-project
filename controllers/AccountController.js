const AccountService = require('../services/AccountService');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/CookieConfig');
const constants = require('../common/Constants');
const { commonResult } = require('../common/CommonResult');

exports.login = async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    console.log('user: ', user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (info) {
      //return res.json(info.message);
      return res.json(commonResult(constants.FAILURE, null, info.message));
    }
    //유저 payload model 만들기.
    const UserModel = {
      id: user.id,
      email: user.email,
    };

    jwt.sign(UserModel, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res.json(err);
      }
      // Send Set-Cookie header
      res.cookie('wecook_access_token', token, config.CookieConfig());

      // Return json web token
      return res.json(commonResult(constants.SUCCESS, UserModel, null));
    });
  })(req, res, next);
};
