var express = require('express');
var router = express.Router();
var Q = require('q');
var db = require('../db.js');
var verify = require('../tokens.js').verifyToken;

// authentication
router.use(function(req, res, next) {
  verify(req.headers.token, res, next);
});

router.post('/', function(req, res) {
  var events = req.body;
  console.log("This is our events",events)
  createEvent(req, res, events)
});

// router.post('/', function(req, res) {
//     db.users.find({username: req.headers.username}, function(err, users) {
//     var events = req.body;
//     if (err) {
//       console.error(err);
//     } else {
//         users[0].events.addToSet(events);
//         users[0].save(function() {
//         res.send(users);
//       });
//     }
//     });
// });

router.get('/', function(req, res) {
  findUser(req, res);
});

router.post('/remove', function(req, res) {
  var action = { $pull: { 'events' : { 'dt' :req.body.dt } } };

  updateUser(req, res, action);
});

// router.post('/remove', function(req, res) {
//   db.users.update({username : req.headers.username},{
//     $pull: { 'events' : { 'dt' :req.body.dt } } },
//     function(err, data) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('success',data);
//         res.send(data);
//       }
//   });
// });

router.post('/remove', function(req, res) {
  var action = { $pull: { 'events' : { 'dt' :req.body.dt } } };

  updateUser(req, res, action);
});
// router.post('/remove', function(req, res) {
//   db.users.update({username : req.headers.username},{
//     $pull: { 'events' : { 'dt' :req.body.dt } } },
//     function(err, data) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('success',data);
//         res.send(data);
//       }
//   });
// });

router.post('/edit', function(req, res) {
  var action = { $set: {
                'events.$.appointment' : req.body.appointment,
                'events.$.doctor' : req.body.doctor,
                'events.$.location' : req.body.location,
                'events.$.dt' : req.body.dt,
                'events.$.childName' : req.body.childName,
                'events.$.notes' : req.body.notes
                 } };

  updateUser(req, res, action);
});

// router.post('/edit', function(req, res) {
//   db.users.update({username : req.headers.username, 'events.dt' : req.body.oldDt},{
//     $set: {
//           'events.$.appointment' : req.body.appointment,
//           'events.$.doctor' : req.body.doctor,
//           'events.$.location' : req.body.location,
//           'events.$.dt' : req.body.dt,
//           'events.$.childName' : req.body.childName,
//           'events.$.notes' : req.body.notes
//            } },
//     function(err, data) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('success',data);
//         res.send(data);
//       }
//   });
// });

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

function createEvent(req, res, eventInfo) {
  return new Q(
    db.users.findOneAndUpdate(
      {username: req.headers.username, 'events.dt' :
      { $ne: eventInfo.dt } },
      {$addToSet: { 'events': eventInfo } },
      { new: true },
      function(err,data) {
        if(err) {
          console.log(err);
        } else {
          console.log('This is the create Event data', data);
          res.send(data);
        }
      }))
}

module.exports = router;