let mongoose = require('mongoose');
let shortid = require("shortid");

let idea = new mongoose.Schema({
    name: {type: String, default: undefined, require: true},
    time: {type: Date, default: Date.now},
    title: {type: String, default: undefined, require: true, unique: true},
    desc: {type: String, default: undefined, require: true, unique: true},
    club: {type: String, default: undefined},
    ideaId: {type: String, default: shortid.generate},
    email: {type: String, require: true},
    long_desc: {type: String, default: undefined}
});

module.exports = mongoose.model('ideas',idea);