const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/key');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', //after user grants permission, user will be sent to this URL from google
    },
    (accessToken, refreshToken, profile, done) => {
      //Get user details & create new record in database here
      console.log('access token', accessToken); //accessTokenは自動的に期限切れになる
      console.log('refresh token', refreshToken); //refreshTokenはaccessTokenをupdateできる
      console.log('profile:', profile);
    }
  )
);
//scope specifies to google server what access we want to have inside of this user profile
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
