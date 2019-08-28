const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const nodemailer = require('nodemailer');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join-mail', isNotLoggedIn, async (req, res, next) => {
  const { user_email, user_name, user_password } = req.body;
  try {
    const exEmail = await User.find({ where: { user_email } });
    if (exEmail) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/join');
    }
    const exUser = await User.find({ where: { user_name } });
    if (exUser) {
      req.flash('joinError', '이미 가입된 아이디입니다.');
      return res.redirect('/join');
    }
    const hash = await bcrypt.hash(user_password, 12);
    const token = cryptoRandomString({length: 10, type: 'url-safe'});
    await User.create({
      user_email,
      user_name,
      user_password: hash,
      user_token: token,
      user_approved: 0,
    });
    // 인증 메일 발송 부분
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,         // gmail 계정 아이디를 입력
        pass: process.env.GMAIL_PW          // gmail 계정의 비밀번호를 입력
      }
    });
    let mailOptions = {
      from: process.env.GMAIL_ID,           // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: user_email,                       // 수신 메일 주소
      subject: '안녕하세요, fooding입니다. 이메일 인증을 해주세요.',   // 제목
      html: '<p>아래의 링크를 클릭해주세요 !</p>' +
            "<a href='http://localhost:8001/auth/join/?email=" + user_email + "&token=" + token + "'>인증하기</a>"  // 내용
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    req.flash('msg', '메일이 발송되었습니다. 메일 인증 후 이용해주세요!');
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/join', isNotLoggedIn, async (req, res, next) => {
  let email = req.query.email;
  let token = req.query.token;
  try {
    const exUser = await User.find({
      where: {
        user_email: email,
        user_token: token,
      }
    });
    if (exUser) {
      await User.update({
        user_approved: 1,
      }, {
        where: { user_email: email },
      });
      req.flash('msg', '가입 성공! 로그인 후 이용해주세요!');
    } else {
      req.flash('msg', '인증되지 않은 이메일입니다. 다시 가입해주세요.');
    }
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/main');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/main');
});

module.exports = router;