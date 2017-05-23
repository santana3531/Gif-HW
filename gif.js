var teams = ["New York Giants", "New York Yankees", "Pittsburgh Steelers", "Montreal Canadians", "FC Barcelona"]

function displayButtons() {

    $('#sportsButtons').empty();

    for (var i = 0; i < teams.length; i++) {

        
        var b = $('<button>');

        b.addClass("teams btn btn-primary");
        b.attr("data-teams", teams[i]);
        b.text(teams[i]);
        $("#sportsButtons").append(b);
    };
};

$("#addTeam").on("click", function(event) {
    event.preventDefault();

    var sportsTeam = $("#teams-input").val().trim()
    teams.push(team);

    displayButtons();
    $('#teams-input').val("");
});

$(document).on("click", ".team", function() {
    var teamClicked = $(this).attr("data-team")
    console.log(teamClicked);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + teamClicked + "&api_key=dc6zaTOxFJmzC&limit=5"

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "xxx");
                    var gifDiv = $("<span class='item'>");

                    // Store the rating
                    var rating = results[i].rating;

                    // paragraph that shows the rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Create image tag
                    var teamImage = $("<img>");

                    // animate/still gif
                    teamImage.attr("src", results[i].images.fixed_height_still.url);
                    teamImage.attr("data-still", results[i].images.fixed_height_still.url);
                    teamImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Append P tag and Image created: "gifDiv"
                    gifDiv.append(p);
                    gifDiv.append(teamImage);

                    // Prepend gifDiv in the HTML
                    $("#gifContent").prepend(gifDiv);
                }
            })
        })
    $(document).on("click", "img", function() {
        console.log("gif clicked")

        var state = $(this).attr("data-state")
        console.log(this)

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


displayButtons();