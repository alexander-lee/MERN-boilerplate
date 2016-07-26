var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

var routes = require('./routes/index');
var users = require('./routes/api/users');

var app = express();

//============ VIEW ===========
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//============ PASSPORT ============
var Model = require('./server/model');
//var bcrypt = require('bcryptjs');
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  Model.User.forge({id: id}).fetch()
  .then(function(user){
    done(null, user);
  })
  .catch(function(err){
    done(err);
  })
});

/*
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //Allow to back the entire request to a callback
}, 
function(req, email, password, done){
  Model.User.forge({email: email}).fetch()
  .then(function(user){
    if(user){
      // User already exists
      return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    }
    
    //Make Account

  })
  .catch(function(err){
    console.log(err);
    return done(err);
  });
}));
*/

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
function(username, password, done){
  Model.User.forge({username: username}).fetch()
  .then(function(user){
    console.log('login-user:',user);

    //Check if User Exists
    if(!user)
      return done(null, false, {message:'No User Found'});

    //Convert User into JSON & check if the password matches
    user = user.toJSON();
    if(!bcrypt.compareSync(password, user.password))
      return done(null, false, {message:'Invalid Password'});

    return done(null, user);
  })
  .catch(function(err){
    console.log(err);
    return done(err);
  })
}))

//============ EXPRESS ============
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat', 
  saveUninitialized: false, 
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Session-persisted Message Middleware
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.notice;
  var success = req.session.success;

  delete req.session.error;
  delete req.session.notice;
  delete req.session.success;

  if(err) res.locals.error = err;
  if(msg) res.locals.msg = msg;
  if(success) res.locals.success = success;

  next(); 
});

//Webpack Hot Reloading
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true}
}));
app.use(require('webpack-hot-middleware')(compiler));


//API Routes
app.use('/', routes);
app.use('/users', users);
app.use('*', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
