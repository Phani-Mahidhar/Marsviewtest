var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sentiment = new Schema({
    
    start_time : {type: String, required: true},
    end_time : {type: String, required: true},
    sentiment : [{type: String, required: true}],
    polarity: {type: Number, required: true},
    subjectivity : {type: Number, required: true},
    sentence: {type: String, required: true},
})

module.exports = mongoose.model('sentiment',sentiment);