https://builddays19.splashthat.com/let mongoose = require("mongoose");
let shortid = require("shortid");

let idea = new mongoose.Schema({
  name: { type: String, default: null, require: true },
  time: { type: Date, default: Date.now },
  title: { type: String, default: null},
  desc: { type: String, default: null},
  club: { type: String, default: null },
  ideaId: { type: String, default: shortid.generate },
  email: { type: String, default: null},
  long_desc: { type: String, default: null},
  likes: [
    {
      type: String,
      unique: true
    }
  ]
});

module.exports = mongoose.model("ideas", idea);
