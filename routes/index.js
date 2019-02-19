var express = require('express');
var router = express.Router();
var compression = require("compression");
var sanitizer = require('express-sanitizer');
//var shortId = require("shortid");
var IDEA = require("../models/light-lamp.js");

router.use(sanitizer());
router.use(compression());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//this route for idea submission
router.post('/idea/submission/', (req,res)=>{
    console.log(req.body);
    let data = {
        title: req.sanitize(req.body.title),
        desc: req.sanitize(req.body.desc),
        club: req.sanitize(req.body.club),
        name: req.sanitize(req.body.name)
    }
    
    let status = {task: "complete"};
    console.log(data);
    IDEA.create(data, (err, created)=>{
       if (err){ 
            status.task = "error";
            throw err;
       }if (!created)
            status.task = "NOT OK";
        res.json(status);
    });
    
});

//to fetch list of idea from db
router.get("/idea/list/", (req,res)=>{
    let response = {"status": "OK", list: []};
    IDEA.find({}, "name title club ideaId", (err, ideaList)=>{
       if  (err)
       {
           response.status = "ERROR";
           throw err;
       }if (ideaList)
       {
           response.list = ideaList;
       }
       res.json(response);
    });
});

//to get detail of any idea 
router.get("/idea/:ideaId/", (req,res)=>{
    let response = {"status": "OK", idea: {}};
    
    const ideaID  = req.params.ideaId;
    
    IDEA.find({ideaId: ideaID} , "name title desc",(err, ideaGet)=>{
       if  (err)
       {
           response.status = "ERROR";
           throw err;
       }if (ideaGet){
            ideaGet._id  = " ";
            response.idea = ideaGet;
       }
        res.json(response);
    }); 
    
});  
       
module.exports = router;
