var mongoose = require('mongoose');
var singleSchema = new mongoose.Schema({
    profile1: String,
    profile2: String,
    profile3: String,
    profile4: String,
    book1   : String,
    book2   : String,
    book3   : String,
    book4   : String,
    book5   : String,
    book6   : String,
    blog   : String,
    link1: String,
    link2: String
})

var Single = mongoose.model("Single", singleSchema);
module.exports = Single;