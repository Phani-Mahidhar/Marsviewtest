var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const keywords = require('./models/keywords.js');
const transcript = require('./models/transcript.js');
const keyword = require('./models/keyword.js');
const sentiment = require('./models/sentiment.js');

const fs = require('fs');

let rawdata = fs.readFileSync('keywords.json');
const words = JSON.parse(rawdata)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://Phani:Phani1999@cluster0.lu89e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true},function(err, client){
  
  if (err) throw err;

  // let keywords_inst = new keywords({user_mail: words.user, file_name : words.file_name});
  // let transcripts = []
  // for (const trans_ele of words.transcript){

  //   let transcript_inst = new transcript();
  //   transcript_inst.transcript = trans_ele.transcript;
  //   transcript_inst.start_time = trans_ele.start_time;
  //   transcript_inst.end_time = trans_ele.end_time;

  //   let transcript_keywords = [];
  //   for (const transcript_keyword of trans_ele.keywords){
  //     let keyword_inst = new keyword();
  //     keyword_inst.keyword = transcript_keyword.keyword;
  //     keyword_inst.metadata = transcript_keyword.metadata;
  //     keyword_inst.type = transcript_keyword.type;
  //     keyword_inst.save(function (err_keyword) {
  //       if (err_keyword) throw (err_keyword);
  //     });
  //     transcript_keywords.push(keyword_inst._id)
  //   }
  //   transcript_inst.keywords = transcript_keywords;

  //   transcript_inst.key_sentence = trans_ele.key_sentence;

  //   let transcript_sentiments = [];
  //   for (const transcript_sentiment of trans_ele.sentiment){
  //     let sentiment_inst= new sentiment();
  //     sentiment_inst.start_time = transcript_sentiment.start_time;
  //     sentiment_inst.end_time = transcript_sentiment.end_time;
  //     sentiment_inst.sentiment = transcript_sentiment.sentiment;
  //     sentiment_inst.polarity = transcript_sentiment.polarity;
  //     sentiment_inst.subjectivity = transcript_sentiment.subjectivity;
  //     sentiment_inst.sentence = transcript_sentiment.sentence;
  //     sentiment_inst.save(function (err_sentiment) {
  //       if (err_sentiment) return handleError(err_sentiment);
  //     });
  //     transcript_sentiments.push(sentiment_inst._id);

  //   }
  //   transcript_inst.sentiment = transcript_sentiments;
  //   transcript_inst.save(function(err_transcript){
  //     if (err_transcript) throw (err_transcript);
  //   });

  //   transcripts.push(transcript_inst._id)
  // }

  // keywords_inst.transcript = transcripts;
  // console.log(keywords_inst)
  // keywords_inst.save(function(err_keywords){
  //   if (err_keywords) throw (err_keywords);
  // });
});


mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
