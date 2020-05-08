const passportJWT = require('passport-jwt');
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
// const ExtractJWT = passportJWT.ExtractJwt;
// const JWTStrategy   = passportJWT.Strategy;
//const AccountService = require('../services/AccountService');

module.exports = (passport) => {
  passport.use(
    new JwtCookieComboStrategy(
      { secretOrPublicKey: process.env.JWT_SECRET },
      (payload, done) => {
        return done(null, payload.user);
      }
    )
  );
};
