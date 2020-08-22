var mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    file: String ,
    name: String,
    description: String,
    date: String,
    time: String,
    org: String,
    orgurl: String,
    city: String,
    payment: String
});
const Event = mongoose.model("Event", eventSchema);
module.exports = Event