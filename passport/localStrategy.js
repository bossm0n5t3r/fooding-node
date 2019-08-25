const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'user_email',
    passwordField: 'user_password',
  }, async (user_email, user_password, done) => {
    try {
      const exUser = await User.find({ where: { user_email } });
      if (exUser) {
        const result = await bcrypt.compare(user_password, exUser.user_password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};