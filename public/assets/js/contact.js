$(document).ready(function() {

//Code below grabs the URL and extracts the search value
//In this instance the search value is the user identified from the swipe activity
var parser = document.createElement('a');
parser.href = window.location.href;

//Code below parses our the splices out just the search term
var parseId = parser.search;
var onlyId = parseId.slice(4);

// Code below pulls in the user's information from the sql database
function getUserData(onlyId) {
	$.get("/api/users/" + onlyId, function(newUserData) {
		if (newUserData) {
		//Code below writes the selected match's name to the package
		$("#contactMatchImage").attr( 'src', newUserData.image);
		var matchName = newUserData.name;
		$("#matchName").html(matchName);
		$("#matchMessage").html("Message " + matchName + " below and gitUp!")
		getInterests(newUserData);
	}
});
}

// Code below pulls in the match's info from the db
getUserData(onlyId);

// Code below grabs the icons for the match's interests
function getInterests(newUserData) {
	if (newUserData.answer1 == "PC") {
		$("#matchInterests").append('<img src="./assets/img/windows.png" alt="Windows logo" class="interests" height="40px">');
	} else {
		$("#matchInterests").append('<img src="./assets/img/mac.png" alt="Mac logo" class="interests" height="40px">');
	};

	if (newUserData.answer2 == "iOS") {
		$("#matchInterests").append('<img src="./assets/img/ios.png" alt="iOS logo" class="interests" height="40px">');
	} else {
		$("#matchInterests").append('<img src="./assets/img/android.png" alt="Android logo" class="interests" height="40px">');
	};

	if (newUserData.answer3 == "React") {
		$("#matchInterests").append('<img src="./assets/img/react.png" alt="React logo" class="interests" height="40px">');
	} else {
		$("#matchInterests").append('<img src="./assets/img/angular.png" alt="Angular logo" class="interests" height="40px">');
	};

	if (newUserData.answer4 == "Sequelize") {
		$("#matchInterests").append('<img src="./assets/img/sequelize.png" alt="Sequelize logo" class="interests" height="40px">');
	} else {
		$("#matchInterests").append('<img src="./assets/img/mysql.png" alt="mySQL logo" class="interests" height="40px">');
	};

	if (newUserData.answer5 == "PHP") {
		$("#matchInterests").append('<img src="./assets/img/php.png" alt="PHP logo" class="interests" height="40px">');
	} else {
		$("#matchInterests").append('<img src="./assets/img/node.png" alt="Node logo" class="interests" height="40px">');
	};

	if (newUserData.answer6 == "Front-End") {
		$("#matchInterests").append('<img src="./assets/img/front.png" alt="Front-End logo" class="interests" height="40px">');
	} else {
		$("#matchInterests").append('<img src="./assets/img/back.png" alt="Back-End logo" class="interests" height="40px">');
	};
}

// socket.io chat js
$(function () {
	var socket = io();
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
		window.scrollTo(0, document.body.scrollHeight);
	});
});

// socket.io chat js

});
