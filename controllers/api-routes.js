// Pull in all required packages

var express = require("express");
var bodyParser = require("body-parser");
var passportGithub = require('../public/assets/js/github');
var db = require("../models");

var User = db.User;

module.exports = function(app) {

  app.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

  app.get('/auth/github/callback',
    passportGithub.authenticate('github', { failureRedirect: '/login' }),
    function(req, res, next) {
    // Successful authentication
    res.status(404).json(req.user);
  });

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.get("/api/users", function(req, res, next) {
    db.User.findAll({
      order: [
      ['matchpoints', 'DESC']
      ]
    }).then(function(users) {
      res.status(200).json(users);
    });
  });

// POST route for saving new user info
app.post("/api/users", function(req, res, next) {
  var userData = req.body;
  console.log(userData);

  db.User.create({
    name: userData.name,
    age: userData.age,
    gender: userData.gender,
    targetGender: userData.targetGender,
    quote: userData.quote,
    image: userData.image,
    answer1: userData.answer1,
    answer2: userData.answer2,
    answer3: userData.answer3,
    answer4: userData.answer4,
    answer5: userData.answer5,
    answer6: userData.answer6,
    matchpoints: userData.matchpoints,
  }).then(function(data) {
    res.status(200).json(data);

  });
});

// // PUT route for updating user info
//
// app.put("/api/users", function(req, res, next) {
//   db.User.update(
//     req.body,
//     {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(result) {
//       res.status(200).json(result);
//     });
//   });

  // PUT route for updating profile
  app.put("/api/users", function(req, res, next) {
    db.User.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(answerObject) {
      res.status(200).json(answerObject);
    });
  });


  // Find specific id
  app.get("/api/users/:id", function(req, res, next) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.status(200).json(user);
    });

  });

  // Find specific name
  app.get("/api/users/:name", function(req, res, next) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(user) {
      console.log("***********************get name is running");
      res.status(200).json(user);
    });

  });

  // // Find all the matches
  // app.get("/api/users/:match", function(req, res, next) {
  //   db.Users.findOne({
  //     where: {
  //       match: req.params.match
  //     }
  //   }).then(function(user) {
  //     res.json(user);
  //   });
  // });

};
