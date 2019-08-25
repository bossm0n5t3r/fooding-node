const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('front', {
    title: 'Welcome to Fooding',
    user: req.user,
    loginError: req.flash('loginError'),
  });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - fooding',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', {
    title: '로그인 - fooding',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/main', isLoggedIn, (req, res, next) => {
  res.render('main', {
    title: '메인 화면 - Fooding',
    user: req.user,
  });
});

router.get('/store-register', isLoggedIn, (req, res, next) => {
  res.render('store-register', {
    title: '가게 등록 화면 - Fooding',
    user: req.user,
  });
});

router.get('/store-modify', isLoggedIn, (req, res, next) => {
  res.render('store-modify', {
    title: '가게 수정 화면 - Fooding',
    user: req.user,
  });
});

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile', {
    title: '프로필 - Fooding',
    user: req.user,
  });
});

module.exports = router;