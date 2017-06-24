$(document).ready(function() {

	//Code below grabs the URL and extracts the search value that contains user id
	var parser = document.createElement('a');
	parser.href = window.location.href;

	//Code below parses our the splices out just the search term
	var searchString = parser.search;
	var slicedSearchString = searchString.slice(1);
	var idOnly = searchString.slice(4);

	getUserData(idOnly);

	// Code below pulls in the user's information from the sql database
	function getUserData(idOnly) {
		$.get("/api/users/" + idOnly, function(newUserData) {
			console.log("Getting user data.");
			if (newUserData) {
			// If this post exists, prefill our cms forms with its data
			console.log(newUserData);
			getAllUserData();
		}
	});
	}

	// Code below pulls in their top matches
	function getAllUserData() {
		$.get("/api/users", function(data) {
			console.log("Populating panes");
			populatePanes(data);
			console.log("Panes populated");
			console.log(data);
		});
	}




	/**
	 * jTinder initialization
	 */

	// This function takes action when a match card is liked or disliked
	$("#tinderslide").jTinder({
		// dislike callback
		onDislike: function (item) {
		    // set the status text
		    console.log("This is 'item':");
		    console.log(item[0].innerText);
		    $('#status').html('Dislike image ' + (item.index()+1));
		},
		// like callback
		onLike: function (item) {
			console.log("This is 'item':");
			console.log(item);
			window.location.replace("../contact"+"?name=" + item[0].innerText);
			console.log(item);
			console.log(item[0].id);

		    // set the status text
		    $('#status').html('Like image ' + (item.index()+1));
		    console.log("You liked this item!!!");
		},
		animationRevertSpeed: 200,
		animationSpeed: 400,
		threshold: 1,
		likeSelector: '.like',
		dislikeSelector: '.dislike'
	});

	/**
	 * Set button action to trigger jTinder like & dislike.
	 */
	 $('.actions .like, .actions .dislike').click(function(e){
	 	e.preventDefault();
	 	$("#tinderslide").jTinder($(this).attr('class'));
	 });

	// -----------------------------------------------------------------------------------------------------
	// Code below contains js written by the team to compliment the code inherited from the jTinder package
	// -----------------------------------------------------------------------------------------------------

	// Declare a couple global variables
	var imgArray = [
	'url("./assets/img/pane/marissa_sm.jpg") no-repeat scroll center center',
	'url("./assets/img/pane/angela2.jpg") no-repeat scroll center center',
	'url("./assets/img/pane/jobs2.jpg") no-repeat scroll center center',
	'url("./assets/img/pane/laurie2.jpg") no-repeat scroll center center',
	'url("./assets/img/pane/elon2.jpg") no-repeat scroll center center',
	'url("./assets/img/pane/arianna2.jpg") no-repeat scroll center center',
	'url("./assets/img/pane/zuck2.jpg") no-repeat scroll center center'
	];

	// Code below populates the match cards with the matched user's information.
	// It is written in a way to override the jTinder package's handling of this function in css
	function populatePanes(data) {
		console.log("Data: " + data);
		var numUsers = 6;
		if (data.length < 6) {
			numUsers = data.length;
		}

		for (var i = 0; i < numUsers; i++) {
			console.log("Data.name: " + data[i].name);
			var paneId = "#paneId";
			var userInfo = "#userInfo" + i;
			console.log(paneId);
			console.log(userInfo);
			console.log("imageUrl: " + data[i].image.data);

			$(paneId + i + "Image").attr( 'src', data[i].image);

			$(paneId + i).css('background-image: url(' + data[i].image + ')');


			// This code adds the user info to the pane
			$(userInfo).css({
				'background-color':'white'
			});
			$(userInfo).html(data[i].name);
		}
	}

});
