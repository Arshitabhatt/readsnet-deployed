var mongoose = require("mongoose");

var twicereadSchema = new mongoose.Schema({
    sliderimg1 : String,
    sliderimg2 : String,
    sliderimg3 : String,
    name       : String,
    description: String,
    location   : String,
    href       : String,
    backgroundimg : String,
    single: [ 
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Single"
     }]
})

const Twiceread = mongoose.model("Twiceread", twicereadSchema);
module.exports = Twiceread