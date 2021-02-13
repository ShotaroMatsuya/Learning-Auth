const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = mongoose.model('users');

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
      new User({
        googleId: profile.id,
      }).save();
    }
  )
);
