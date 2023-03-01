const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const setupRouter = require('./routes/setup');
const transactionRouter = require('./routes/transaction');
const transactionsRouter = require('./routes/transactions')
const walletRouter = require('./routes/wallet');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connection with mongodb atlas
const db_conn_url = config.get('db.conn-url');
mongo_connect().catch(err => console.log(err));

async function mongo_connect() {
  mongoose.set('strictQuery', false);
  
  await mongoose.connect(db_conn_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Successfully connected to Mongo Atlas Db');
}

app.use('/', indexRouter);
app.use('/setup', setupRouter);
app.use('/transact', transactionRouter);
app.use('/transactions', transactionsRouter);
app.use('/wallet', walletRouter);

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
