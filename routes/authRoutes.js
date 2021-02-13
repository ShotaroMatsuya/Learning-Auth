const passport = require('passport');

module.exports = app => {
  //scope specifies to google server what access we want to have inside of this user profile
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
