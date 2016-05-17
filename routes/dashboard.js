var express = require('express');
var router = express.Router();
var Q = require('q');
var verify = require('../tokens.js').verifyToken;
var db = require('../db.js');
// var helper = require('./helper.js')

// authentication
router.use(function(req, res, next) {
  verify(req.headers.token, res, next);
});

// routes
router.get('/', function(req, res) {
  findUser(req, res);
});

router.post('/addChild', function(req,res) {
  var childInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    condition: req.body.condition,
    childImageUrl: req.body.image,
  };
  createChild(req, res, childInfo);
});

router.post('/removeChild', function(req, res) {
  var action = {$pull: { 'children' : { 'firstName' :req.body.firstName } } };
  updateUser(req, res, action);
});

router.post('/image', function(req, res) {
  var action = { $set: { 'imageUrl' : req.body.url } };
  updateUser(req, res, action);
});

router.post('/childImage', function(req, res) {
  var action = { $set: { 'children.$.childImageUrl' : req.body.url} };
  updateBabyPic(req, res, action);
});

//helper Functions
function updateBabyPic(req, res, action) {
  return new Q(db.users.findOneAndUpdate({username: req.headers.username,
    'children.firstName' : req.body.firstName}, action, {  new: true },
    function(err, user) {
      if(err) {
        console.log(err);
      } else {
        res.send(user);
      }
  }));
}

function updateUser(req, res, action) {
  return new Q(db.users.findOneAndUpdate({username: req.headers.username}, action, { new: true },
    function(err, user) {
      if(err) {
        console.log(err);
      } else {
        res.send(user);
      }
  }));
}

function findUser(req, res) {
  return new Q(db.users.find({username: req.headers.username}, function(err, user) {
      if(err) {
        console.log(err);
      } else {
        res.send(user);
      }
  })
  );
}

function createChild(req, res, childInfo) {
  return new Q(
    db.dose.find( {condition: req.body.condition}, function(err , dose) {
      childInfo.doses = dose[0].doses;
    }).exec())
    .then(function() {
      db.users.findOneAndUpdate(
      {username: req.headers.username, 'children.firstName' : { $ne: childInfo.firstName }},
      {$addToSet: { 'children': childInfo } }, { new: true }, function(err,user) {
        if(err) {
          console.log(err);
        } else {
          res.send(user);
        }
      });
    });
}

module.exports = router;
