const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_RESTAPI,
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
          user_img: '/img/profile/profile_image.jpg',
          user_snsId: profile.id,
          user_provider: 'kakao',
          user_approved: 1,
          user_storeId: 0,
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};