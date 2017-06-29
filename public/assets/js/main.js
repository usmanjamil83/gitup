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
		    console.log("This is 'item':" + item);
		    console.log(item[0].innerText);
				console.log(item[0]);
		    $('#status').html('Dislike image ' + (item.index()+1));
		},
		// like callback
		onLike: function (item) {
			console.log("This is 'item':");
			console.log(item);
			var id = $(item[0]).attr('data-id');
			window.location.replace("../contact"+"?id=" + id);
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

	// Code below populates the match cards with the matched user's information.
	// It is written in a way to override the jTinder package's handling of this function in css
	function populatePanes(data) {
		console.log("Data: " + data);
		var numUsers = 11;
		if (data.length < 11) {
			numUsers = data.length;
		}

		for (var i = 0; i < numUsers; i++) {
			var paneId = "#paneId";
			var userInfo = "#userInfo" + i;
			console.log("imageUrl: " + data[i].image.data);

			$(paneId + i + "Image").attr( 'src', data[i].image);
			$(paneId + i).css('background-image: url(' + data[i].image + ')');
			$(paneId + i).attr('data-id', data[i].id)


			// This code adds the user info to the pane
			// $(userInfo).css({
			// 	'background-color':'white'
			// });
			$(userInfo).html(data[i].name);
		}
	}

});
