// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
var mongoose = require('mongoose');
var helpers = {};

helpers.updateUser = function(req, res, action) {
  return new Q(db.users.findOneAndUpdate({username: req.headers.username}, action, { new: true },
    function(err, user) {
      if(err) {
        console.log(err);
      } else {
        res.send(user);
      }
  }));
}

helpers.findUser = function(req, res) {
  return new Q(db.users.find({username: req.headers.username}, function(err, user) {
      if(err) {
        console.log(err);
      } else {
        res.send(user);
      }
  })
  );
}

module.exports = helpers;
