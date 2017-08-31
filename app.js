var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');

var app = express();
var flash    = require('connect-flash');
var passport = require('passport');
// view engine setup
app.set('views', path.join(__dirname, '/app'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'user','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'learningpassport', resave: true, saveUnitialized: true}))
app.use(session({cookie: { maxAge: 60 * 1000 }}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app
require('./app/booking/routes/customer')(app);
require('./app/booking/routes/api')(app);
require('./app/booking/routes/payment')(app);

//web
require('./app/user/middlewares/passport')(passport);
require('./app/user/routes/login')(app,passport);
require('./app/user/routes/account')(app);
require('./app/user/routes/reservation')(app);
require('./app/user/routes/check')(app);
require('./app/user/routes/customer')(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./user/views/error');
});

module.exports = app;
