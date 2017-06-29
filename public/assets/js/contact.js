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
	}
});
}

// Code below pulls in the match's info from the db
getUserData(onlyId);

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
