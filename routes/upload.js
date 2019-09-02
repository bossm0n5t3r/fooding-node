const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

fs.readdir("uploads", error => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});

fs.readdir("uploads/profiles", error => {
  if (error) {
    console.error(
      "uploads/profiles 폴더가 없어 uploads/profiles 폴더를 생성합니다."
    );
    fs.mkdirSync("uploads/profiles");
  }
});

const uploadProfile = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/profiles");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post(
  "/profile",
  isLoggedIn,
  uploadProfile.single("avatar"),
  async (req, res, next) => {
    const { user_password } = req.body;
    try {
      if (!req.file) {
        await User.update(
          {
            user_password
          },
          {
            where: { id: req.user.id }
          }
        );
      } else {
        await User.update(
          {
            user_password,
            user_img: req.file.path
          },
          {
            where: { id: req.user.id }
          }
        );
      }
      req.flash("profileMsg", "프로필이 수정되었습니다.");
      return res.redirect("/profile");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
);

module.exports = router;
