var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var putmedRouter = require('./routes/putmed');
var preRouter = require('./routes/prescribing');
var operRouter = require('./routes/operation');
var app = express();


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true"); //服务端允许携带cookie
    res.header("Access-Control-Allow-Origin", "*"); //允许的访问域
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); //访问头
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //访问方法
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    next();

});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/putmed', putmedRouter);
app.use('/prescribing', preRouter);
app.use('/operation', operRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;