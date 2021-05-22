var express = require('express');
var keyword = require('../models/keyword');
const keywords = require('../models/keywords');
var router = express.Router();
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
 
  async.parallel({
    PhraseCloud: function(callback){
      keyword.find({"type":"DNN"},'keyword').exec(callback);
    },
    Techphrase: function(callback){
      keyword.find({"type":"Techphrase"},'keyword').exec(callback);
    },
    NER: function(callback){
      (keyword.find({"type":"NER"},'keyword').exec(callback));
    }},
    function (err, results) {
      if (err) {return next(err);} // Error in API usage.
   
      console.log(results);
      res.render('index',{ "title_tabs":[{ title: 'Phase Cloud', data: results.PhraseCloud},{ title: 'Terms', data: results.Techphrase},{ title: 'Entities', data:results.NER}]});
    });
  
});

module.exports = router;
