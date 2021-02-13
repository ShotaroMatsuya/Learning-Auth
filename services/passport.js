const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //引数のuserはUserモデルインスタンス
  //call serializeUser with the user to generate the identifying piece of info
  done(null, user.id); //mongoDBにあるidを取得
});
passport.deserializeUser((id, done) => {
  // turn an ID into a mongoose model instance
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', //after user grants permission, user will be sent to this URL from google
    },
    (accessToken, refreshToken, profile, done) => {
      //Get user details & create new record in database here
      //   console.log('access token', accessToken); //accessTokenは自動的に期限切れになる
      //   console.log('refresh token', refreshToken); //refreshTokenはaccessTokenをupdateできる
      //   console.log('profile:', profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          //we don't have a user record with this ID, make a new record.
          new User({
            googleId: profile.id,
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
