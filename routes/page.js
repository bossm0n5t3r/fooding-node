const express = require("express");
const { Store, StoreCategory } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", isNotLoggedIn, (req, res) => {
  res.render("front", {
    title: "Welcome to Fooding",
    msg: req.flash("msg"),
    loginError: req.flash("loginError")
  });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - fooding",
    joinError: req.flash("joinError")
  });
});

router.post("/join", isNotLoggedIn, (req, res) => {
  res.redirect("join");
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login", {
    title: "로그인 - fooding",
    loginError: req.flash("loginError")
  });
});

router.get("/main", isLoggedIn, async (req, res, next) => {
  try {
    const allStores = await Store.findAll();
    res.render("main", {
      title: "메인 화면 - Fooding",
      user: req.user,
      appkey: process.env.KAKAO_JS,
      allStores: allStores,
      mainMsg: req.flash("mainMsg")
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/store", isLoggedIn, async (req, res, next) => {
  try {
    const exStore = await Store.find({ where: { id: req.query.id } });
    if (exStore) {
      res.render("store", {
        title: "가게 화면 - Fooding",
        user: req.user,
        store: exStore,
        storeMsg: req.flash("storeMsg")
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/store-register", isLoggedIn, async (req, res, next) => {
  try {
    const allCategories = await StoreCategory.findAll();
    res.render("store-register", {
      title: "가게 등록 화면 - Fooding",
      user: req.user,
      categories: allCategories,
      appkey: process.env.KAKAO_JS,
      storeRegisterError: req.flash("storeRegisterError")
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/store-modify", isLoggedIn, async (req, res, next) => {
  try {
    const exStore = await Store.find({ where: { id: req.query.id } });
    const userStore = await Store.find({ where: { userId: req.user.id } });
    const allCategories = await StoreCategory.findAll();
    if (exStore.id == userStore.id) {
      res.render("store-modify", {
        title: "가게 수정 화면 - Fooding",
        user: req.user,
        store: exStore,
        categories: allCategories,
        appkey: process.env.KAKAO_JS
      });
    } else {
      req.flash("mainMsg", "본인의 가게가 아니라 수정할 수 없습니다.");
      return res.redirect("/main");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", {
    title: "프로필 - Fooding",
    user: req.user,
    profileMsg: req.flash("profileMsg")
  });
});

module.exports = router;
