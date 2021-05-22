var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keywords = new Schema({
    transcript: [{ type: Schema.ObjectId, ref: 'transcript',required:true}],
    user_mail: { type: String },
    file_name: {type: String },
})

module.exports = mongoose.model('keywords', keywords)