const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.find({
        where: {
          user_snsId: profile.id,
          user_provider: 'kakao'
        }
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          user_email: profile._json && profile._json.kaccount_email,
          user_name: profile.displayName,
          user_snsId: profile.id,
          user_provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};