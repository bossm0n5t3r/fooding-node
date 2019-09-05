const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { User, Store } = require("../models");
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

fs.readdir("uploads/stores", error => {
  if (error) {
    console.error(
      "uploads/stores 폴더가 없어 uploads/stores 폴더를 생성합니다."
    );
    fs.mkdirSync("uploads/stores");
  }
});

const uploadStores = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/stores");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post(
  "/store",
  isLoggedIn,
  uploadStores.array("store_img"),
  async (req, res, next) => {
    const {
      store_name,
      store_address,
      store_start_time,
      store_end_time,
      store_menu_1,
      store_price_1,
      store_menu_2,
      store_price_2
    } = req.body;
    try {
      const exStore = await Store.find({ where: { userId: req.user.id } });
      if (exStore) {
        req.flash("storeRegisterError", "이미 등록된 가게가 있습니다.");
        return res.redirect("/store-register");
      }
      await Store.create({
        store_name,
        store_address,
        store_start_time,
        store_end_time,
        store_menu_1,
        store_price_1,
        store_menu_2,
        store_price_2,
        userId: req.user.id
      });
      for (var i = 0; i < req.files.length; i++) {
        if (i === 0) {
          await Store.update(
            {
              store_img_1: req.files[i].path
            },
            {
              where: {
                userId: req.user.id
              }
            }
          );
        } else if (i == 1) {
          await Store.update(
            {
              store_img_2: req.files[i].path
            },
            {
              where: {
                userId: req.user.id
              }
            }
          );
        } else {
          await Store.update(
            {
              store_img_3: req.files[i].path
            },
            {
              where: {
                userId: req.user.id
              }
            }
          );
        }
      }
      const storeId = await Store.find({
        attributes: ["id"],
        where: {
          userId: req.user.id
        }
      });
      await User.update(
        {
          user_storeId: storeId.id
        },
        {
          where: {
            id: req.user.id
          }
        }
      );
      req.flash("storeMsg", "가게가 등록되었습니다!");
      return res.redirect("/store/?id=" + storeId.id);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
);

module.exports = router;
