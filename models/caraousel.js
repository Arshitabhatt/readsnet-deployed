var mongoose = require("mongoose");

const caraSchema = new mongoose.Schema({
    cara1: String,
    cara2: String
});
const Caraousel = mongoose.model("Caraousel", caraSchema);
module.exports = Caraousel