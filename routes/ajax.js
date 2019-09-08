const express = require("express");
const { User, Store } = require("../models");

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
    return next(error);
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
    return next(error);
  }
});

router.post("/get-store-name", async (req, res, next) => {
  const { id } = req.body;
  try {
    const exStore = await Store.find({ where: { id } });
    if (exStore) {
      return res.send({ result: exStore.store_name });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/store-delete", async (req, res, next) => {
  const { id } = req.body;
  try {
    const deleteStore = await Store.destroy({ where: { id } });
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
    return next(error);
  }
});

module.exports = router;
