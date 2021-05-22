var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyword = new Schema({
    keyword: {type: String, required: true},
    metadata: [{type:String ,required: false}],
    type: {type: String, required: true},
})

module.exports = mongoose.model("word",keyword);