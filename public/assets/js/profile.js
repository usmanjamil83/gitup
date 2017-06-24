$(document).ready(function() {
    $('select').material_select();

    // Initialize collapse button
    $(".button-collapse").sideNav();
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    $('.collapsible').collapsible();

    var imgContent = "";
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.addEventListener("load", function() {
                imgContent = reader.result;
                document.getElementById('myPhotoDiv').style.backgroundImage = "url(" + imgContent + ")";
            }, false);
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#uploadedPhoto").change(function() {
        readURL(this);
    });

    // Capture the form inputs
    $("#questions-link").on("click", function(e) {
        e.preventDefault();

        // Create an object for the user's data
        var userData = {
            name: $("#name").val(),
            quote: $("#quote").val(),
            gender: $("#gender").val(),
            image: imgContent,
            age: $("#age").val()
        };

        $.post("/api/users", userData, function(data) {
            window.location = "questions.html?id=" + data.id + "#name=" + data.name;
        });
    });
});
