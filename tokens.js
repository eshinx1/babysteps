var jwt = require('jsonwebtoken');
// var dotenv = require('dotenv').config();

var tokens = {};

tokens.generateToken = function (username) {
  return jwt.sign({username: username}, '888h');
};

tokens.verifyToken = function (token, successCb, errorCb) {
  return jwt.verify(token, function (err) {
    if (err) {
      errorCb();
    } else {
      successCb();
    }
  });
};

module.exports = tokens;