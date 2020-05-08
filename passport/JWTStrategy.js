const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
const AccountService = require('../services/AccountService');

module.exports = (passport) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
  }, async (jwtPayload, done) => {
    try {
      const exUser = await AccountService.memeberExists(jwtPayload.email);

      if (exUser) {
        done(null, jwtPayload);
      }
      else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
