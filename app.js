/******************************************************
  process.env.NODE_ENV Define
******************************************************/
process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == 'production'
    ? 'production'
    : 'development';

/******************************************************
 library module
******************************************************/
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passportConfig = require('./passport');
const cors = require('cors');
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
//const client = redis.createClient();
const helmet = require('helmet');
//const enforceSSL = require("express-enforces-ssl");
const ms = require('ms');
const csrf = require('csurf'); //CSRF (교차 사이트 요청 위조) 방지.
require('dotenv').config();

/******************************************************
 router
******************************************************/
const indexRouter = require('./routes');
const account = require('./routes/Account');

/******************************************************
 express initialize
******************************************************/
const app = express();
passportConfig(passport);

app.use(cors({ origin: true, credentials: true }));
/******************************************************
 helmet setting (배포 모드에서만 실행.)
******************************************************/
if (process.env.NODE_ENV == 'production') {
  app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.4.9' })); //helmet 을 이용하여 header server 정보 변경.
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    })
  );
  //https 연결 유지하기.
  app.use(
    helmet.hsts({
      maxAge: ms('1 year'),
      includeSubdomains: true,
    })
  );
  //XSS(교차 사이트 스크립팅) 공격 방지.
  app.use(helmet.xssFilter());

  app.enable('trust proxy');
  //강제 https 연결.
  //app.use(enforceSSL());
  //CSRF (교차 사이트 요청 위조) 방지.
  app.use(csrf());
  //클릭 재킹 방지. (프레임 내 해당 프로젝트 넣지 못하게 함.)
  app.use(helmet.frameguard('deny'));
  //X-Content-Type-Options 를 설정하여, 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지
  app.use(helmet.noSniff());
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8002);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https를 쓸 때 true
    },
    name: 'rnbck',
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/account', account);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
