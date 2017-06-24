//combined with marvin

var express = require("express");
var bodyParser = require("body-parser");
var db = require("../models");

var User = db.User;

module.exports = function(app) {

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.get("/api/users", function(req, res) {
    db.User.findAll({
      order: [
      ['matchpoints', 'DESC']
      ]
    }).then(function(users) {
      res.json(users);
    });
  });

// POST route for saving new user info
app.post("/api/users", function(req, res) {
  var userData = req.body;
  console.log(userData);

  db.User.create({
    name: userData.name,
    age: userData.age,
    gender: userData.gender,
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
    res.json(data);

  });
});

  // PUT route for updating users
  app.put("/api/users:id", function(req, res) {
    db.User.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(answerObject) {
      res.json(answerObject);
    });
  });


  // Find specific id
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.json(user);
    });

  });

  // Find specific name
  app.get("/api/users/:name", function(req, res) {
    db.User.findAll({
      where: {
        name: req.body.name
      }
    }).then(function(users) {
      res.json(users);
    });

  });



  // // Find all the matches
  // app.get("/api/users/:match", function(req, res) {
  //   db.Users.findOne({
  //     where: {
  //       match: req.params.match
  //     }
  //   }).then(function(user) {
  //     res.json(user);
  //   });
  // });

};
