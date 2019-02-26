var express = require("express");
var router = express.Router();
var compression = require("compression");
var sanitizer = require("express-sanitizer");
const requestIp = require("request-ip");
const _ = require("lodash");
//var shortId = require("shortid");
var IDEA = require("../models/light-lamp.js");

router.use(sanitizer());
router.use(compression());

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//this route for idea submission
router.post("/idea/submission/", (req, res) => {
  console.log(req.body);
  let data = {
    title: req.sanitize(req.body.title),
    desc: req.sanitize(req.body.desc),
    email: req.sanitize(req.body.email),
    name: req.sanitize(req.body.name)
  };
  if (req.body.club != "") {
    data["club"] = req.sanitize(req.body.club);
  }
  if (req.body.long_desc != "") {
    data["long_desc"] = req.sanitize(req.body.long_desc);
  }

  let status = { task: "complete" };
  console.log(data);
  IDEA.create(data, (err, created) => {
    if (err) {
      status.task = "error";
      throw err;
    }
    if (!created) status.task = "NOT OK";
    res.json(status);
  });
});

//to fetch list of idea from db
router.get("/idea/list/", (req, res) => {
  let response = { status: "OK", list: [] };
  IDEA.find({}, "name title desc ideaId", (err, ideaList) => {
    if (err) {
      response.status = "ERROR";
      throw err;
    }
    if (ideaList) {
      response.list = ideaList;
    }
    res.json(response);
  });
});

//to get detail of any idea
router.get("/idea/:ideaId/", (req, res) => {
  let response = { status: "OK", idea: {} };

  const ideaID = req.params.ideaId;

  IDEA.find({ ideaId: ideaID }, (err, ideaGet) => {
    if (err) {
      response.status = "ERROR";
      throw err;
    }
    if (ideaGet) {
      ideaGet._id = " ";
      response.idea = ideaGet;
    }
    res.json(response);
  });
});

// Like any idea
router.get("/like/idea", (req, res) => {
  let { ideaId } = req.query;
  let ip = requestIp.getClientIp(req);
  IDEA.findByIdAndUpdate(
    ideaId,
    {
      $addToSet: {
        likes: ip
      }
    },
    { safe: true, new: true }
  )
    .then(response => {
      return res.send(response);
    })
    .catch(e => {
      return res.send({
        message: e.message
      });
    });
});
module.exports = router;
