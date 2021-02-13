const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
require('./models/User');
require('./services/passport'); //export していないのでcondenseする

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    //session = cookie となる
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    keys: [keys.cookieKey],
  })
);

//tell the passport that it should make use of cookies to handle the authentication.
//browser is automatically including the cookie and sending it to our backend server
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
