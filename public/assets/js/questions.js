$(document).ready(function() {

  // Create global variables including those to hold responses to questions
  var id = 0;
  var friendName = "";
  var matchpoints = 0;
  var newFriendObj;
  var q01Answer = 0;
  var q02Answer = 0;
  var q03Answer = 0;
  var q04Answer = 0;
  var q05Answer = 0;
  var q06Answer = 0;
  var currentResponses = [];
  var prospectResponses = [];
  var prospectId = 0;


  // Create an object constructor to generate a user with responses
  var friendProfile = function(name, responseObj) {
    this.name = name;
    this.responseObj = responseObj;
  };

  // Write the user's name to the screen, over-writing generic copy
  //Code below grabs the URL and extracts the search value
  var parser = document.createElement('a');
  parser.href = window.location.href;

  //Code below parses our the splices out just the search term
  var searchString = parser.search;
  var slicedSearchString = searchString.slice(1);
  var hashString = parser.hash;
  var nameOnly = hashString.slice(6);
  var idOnly = searchString.slice(4);

  getUserData(idOnly);

  $("#contactHeader").html("id = '" + nameOnly + "'");
  $("#contactSubheader").html("Tell the world about #"+ nameOnly);

  // Code below pulls in the user's information from the sql database
  function getUserData(idOnly) {
    $.get("/api/users/" + idOnly, function(newUserData) {
      if (newUserData) {
      // If this post exists, prefill our cms forms with its data
      console.log(newUserData);
    }
  });
  }




  // Capture the form inputs
  $("#submit").on("click", function(event) {
    event.preventDefault();

    currentAnswer1 = $('input[name="question1"]:checked').val();
    currentAnswer2 = $('input[name="question2"]:checked').val();
    currentAnswer3 = $('input[name="question3"]:checked').val();
    currentAnswer4 = $('input[name="question4"]:checked').val();
    currentAnswer5 = $('input[name="question5"]:checked').val();
    currentAnswer6 = $('input[name="question6"]:checked').val();

      // Add responses to the Responses array
      currentResponses.push(currentAnswer1, currentAnswer2, currentAnswer3, currentAnswer4, currentAnswer5,
        currentAnswer6);


    // Create an object for the user's data
    var answerObject = {
      id: idOnly,
      answer1 : $('input[name="question1"]:checked').val(),
      answer2 : $('input[name="question2"]:checked').val(),
      answer3 : $('input[name="question3"]:checked').val(),
      answer4 : $('input[name="question4"]:checked').val(),
      answer5 : $('input[name="question5"]:checked').val(),
      answer6 : $('input[name="question6"]:checked').val()
    };

    updateUser(answerObject);

    // Update a given post, bring user to the blog page when done
    function updateUser(answerObject) {
      $.ajax({
        method: "PUT",
        url: "/api/users",
        data: answerObject
      })
      .done(function() {
        console.log("Post Happened!!!");
        getAllUserData();
      });
    }
  });
    // ____________________________________________________________________________ End of on click


    // Gets response data for a existing users
    function getAllUserData() {
      $.get("/api/users", function(data) {
        matchUser(data);
        console.log("Descent should be here");
        console.log(data);
      });
    }

    function matchUser(data) {
      // First loop to loop through potential matches
      for (var i = 0; i < data.length - 1; i++) {
        prospectId = data[i].id;
        console.log("This is the current prospectId ", prospectId);
        // create object for the current prospect to be passed to zeroMatchPoints
        matchpoints = 0;
        var zeroPoints = {
          id: prospectId,
          matchpoints: 0
        };
        zeroMatchPoints(zeroPoints);
        console.log("Current match points for prospect id: " + prospectId + " is " + data[i].matchpoints);
        console.log("Where we are in the i loop: ", i);
        prospectResponses = [];
        //This for inner loop, loops through the first three question answers
        for (var j = 0; j < 3; j++) {
          var plus1 = j + 1;
          var answercount = "answer" + String(plus1);
          prospectResponses.push(data[i].answercount);
          console.log(data[i]);
          console.log(data[i][answercount]);
          console.log(currentResponses[j]);
          if (currentResponses[j] == data[i][answercount]) {
            matchpoints = matchpoints + 1;
          }

          console.log("Current points coming out of the if statement for j loop: ", matchpoints);
          console.log("Where we are in the j loop: ", j);
        }
        for (var k = 3; k < 6; k++) {
          var plus2 = k + 1;
          var answercount2 = "answer" + String(plus2);
          prospectResponses.push(data[i].answercount2);
          console.log(data[i]);
          console.log(data[i][answercount2]);
          console.log(currentResponses[k]);
          if (currentResponses[k] !== data[i][answercount2]) {
            matchpoints = matchpoints + 1;
          }
          console.log("Current points coming out of the if statement for k loop: ", matchpoints);
          console.log("Where we are in the j loop: ", k);
        }
        var addPoints = {
          id: prospectId,
          matchpoints: matchpoints
        };
        addMatchPoints(addPoints);

      }
      nextPage();
    }
    // }

      // Function to set the current potential match's matchpoints to zero
      function zeroMatchPoints(zeroPoints){
        $.ajax({
          method: "PUT",
          url: "/api/users",
          data: zeroPoints
        })
        .done(function() {
          console.log("Zero Points Happened for ", zeroPoints);
        });
      }

      function addMatchPoints(addPoints) {
        $.ajax({
          method: "PUT",
          url: "/api/users",
          data: addPoints
        })
        .done(function() {
          console.log("Add Points Happened");
        });

      }

      function nextPage() {
        window.location = "swipe.html?id=" + idOnly;
      }



    });
