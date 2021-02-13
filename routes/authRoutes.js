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

  app.get('/api/logout', (req, res) => {
    req.logout(); //passportが自動的にattachしてくれるfunc(kill the cookie)
    res.send(req.user); //empty
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //passport.jsが自動的にgoogleIdとmongooseIdをreqオブジェクトにattachしてくれる
  });
};
