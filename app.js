var crypto = require("crypto-js");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'new_schema'
  }
});
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var routes = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/users');
var login = require('./routes/login');
var wpadmin = require('./routes/wpadmin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  genid: function(req) {
    return crypto.HmacSHA1("alpha-bravo", "charlie-delta")
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  proxy: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/users', users);
app.use('/login', login);
app.use('/wp-admin', wpadmin);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser( function (id, done) {
  connection.query( "select * from users where id = "+id, function(err,rows) { 
    done(err, rows[0]);
  });
});

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, user_first_name, password, done) { // callback with email and password from our form
    knex
    .select()
    .from("sample_users")
    .where("user_first_name", user_first_name)
    .then(function(data){
      console.log("signed in", data);
      if (!data.length) {
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }

      
      if (!( rows[0].password == password)){
        // if the user is found but the password is wrong
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
      }
        
      // all is well, return successful user
      return done(null, rows[0]);

    }, function( err ){
      return done(err);
    })
    .finally(function(e){
      console.log("finally", e);
      return done(e);
    });


    }));

// passport.deserializeUser(Account.deserializeUser());

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
