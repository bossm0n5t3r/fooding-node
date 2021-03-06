const express = require("express");
const { User, Store, StoreReview } = require("../models");

const router = express.Router();

router.post("/id-check", async (req, res, next) => {
  const { user_name } = req.body;
  try {
    const exUser = await User.find({ where: { user_name } });
    let result = 1;
    if (exUser) {
      result = 0;
    }
    return res.send({ result: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/email-check", async (req, res, next) => {
  const { user_email } = req.body;
  try {
    const exUser = await User.find({ where: { user_email } });
    let result = 1;
    if (exUser) {
      result = 0;
    }
    return res.send({ result: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/get-store-name", async (req, res, next) => {
  try {
    const exStore = await Store.find({ where: { userId: req.user.id } });
    if (exStore) {
      return res.send({ result: 1, name: exStore.store_name });
    } else {
      return res.send({ result: 0 });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/store-delete", async (req, res, next) => {
  try {
    const deleteStore = await Store.destroy({ where: { id: req.query.id } });
    if (deleteStore) {
      await User.update(
        {
          user_storeId: 0
        },
        {
          where: { id: req.user.id }
        }
      );
      return res.send({ result: 1 });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/add-comment", async (req, res, next) => {
  const { comment, storeId } = req.body;
  try {
    await StoreReview.create({
      store_review_comment: comment,
      userId: req.user.id,
      storeId: storeId
    });
    return res.send({ result: 1 });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/update-comment", async (req, res, next) => {
  const { commentId, comment } = req.body;
  try {
    await StoreReview.update(
      {
        store_review_comment: comment
      },
      {
        where: {
          id: commentId
        }
      }
    );
    return res.send({ result: 1 });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/delete-comment", async (req, res, next) => {
  try {
    const deleteStoreReview = await StoreReview.destroy({
      where: { id: req.query.commentId }
    });
    if (deleteStoreReview) {
      return res.send({ result: 1 });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/get-all-comments", async (req, res, next) => {
  try {
    const allComments = await StoreReview.findAndCountAll({
      where: { storeId: req.query.id },
      order: [["id", "ASC"]],
      include: [User]
    });
    return res.send({ comments: allComments });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/get-all-stores", async (req, res, next) => {
  try {
    const allStores = await Store.findAll();
    return res.send({ stores: allStores });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//TODO main page 의 "/get-all-stores" post 구현

router.delete("/user-delete", async (req, res, next) => {
  const { id } = req.body;
  try {
    const deleteUser = await User.destroy({ where: { id } });
    if (deleteUser) {
      req.flash("msg", "회원 탈퇴되었습니다. 이용해주셔서 감사합니다.");
      return res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
