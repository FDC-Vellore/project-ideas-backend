var mongoose = require('mongoose');
var shortid = require("shortid");

let idea = new mongoose.Schema({
    name: {type: String, default: undefined, require: true},
    time: {type: Date, default: Date.now},
    title: {type: String, require: true, unique: true},
    desc: {type: String, require: true, unique: true},
    club: {type: String, default: "FDC-Vellore"},
    ideaId: {type: String, default: shortid.generate}
});

module.exports = mongoose.model('ideas',idea);