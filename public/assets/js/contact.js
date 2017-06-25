$(document).ready(function() {

//Code below grabs the URL and extracts the search value
//In this instance the search value is the user identified from the swipe activity
var parser = document.createElement('a');
parser.href = window.location.href;

console.log(window.location.href);
console.log(parser.search);

//Code below parses our the splices out just the search term
var searchName = parser.search;
var slicedsearchName = searchName.slice(6);
var nameOnly = slicedsearchName.replace("%20"," ");
newNameOnly = nameOnly;
console.log(newNameOnly);

// Code below pulls in the user's information from the sql database
function getUserData(newNameOnly) {
	$.get("/api/users/" + newNameOnly, function(newUserData) {
		if (newUserData) {
		// If this profile exists, log it
		console.log(newUserData);
		//Code below writes the selected match's name to the package
		$("#contactMatchImage").attr( 'src', newUserData.image);

	}
});
}

// Code below pulls in the match's info from the db
getUserData(nameOnly);




//Code below will write user info onto the package
$("#userNameCard").html("Say hello to " + nameOnly);

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
