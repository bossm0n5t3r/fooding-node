const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/id-check', async (req, res, next) => {
  const { user_name } = req.body;
  try {
    const exUser = await User.find({ where: { user_name } });
    let result = 1;
    if (exUser) {
      result = 0;
    }
    return res.send({ 'result': result });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;