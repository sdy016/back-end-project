const local = require('./LocalStrategy');
const kakao = require('./KakaoStrategy');
const jwt = require('./JWTStrategy');
const AccountService = require('../services/AccountService');

module.exports = (passport) => {
  //최초 호출 시 해당 부분 탄다.
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
  });

  //serializeUser 에서 넘겨 받은 user.id 값을 인자로 받는다.
  passport.deserializeUser(async (id, done) => {
    //req.login 실행 시 실행 됨
    try {
      //유저 정보 로그인 체크 후 정보를 넘겨준다.
      const user = await AccountService.loginCheck(id.id);
      return done(null, user);
    } catch (error) {
      //에러 발생 시
      console.error(e);
      return done(e);
    }
  });

  local(passport);
  kakao(passport);
  jwt(passport);
};
