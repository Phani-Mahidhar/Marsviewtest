var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transcript = new Schema({
    transcript: {type: String, required: true},
    start_time : {type: String, required: true},
    end_time : {type: String, required: true},
    keywords :[{ type: Schema.ObjectId, ref: 'keyword' ,required:true}],
    key_sentence: {type: String},
    sentiment : [{type: Schema.ObjectId, ref:'Schema', required: true}],
    
})

module.exports = mongoose.model('transcript', transcript);