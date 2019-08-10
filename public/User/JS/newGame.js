/*
Illia Shershun

File controls the behavior of the New Game (subpage) content, starting with the New Game button click
*/

/*
PURPOSE: Start a new game. Control the behavior when the New Game button is clicked
INVOKED: New Game button click
*/
$(document).on('click', '#newGame', function()
{
    $("#content").hide().load("HTML/newGame.html");
    $("#content").fadeIn(1000);
});

/*
PURPOSE: Create URL and open Dashboard with added URL
INVOKED: On the Start click in the start game submenu
*/
$(document).on('click', '#startGame', function()
{
    var homeTeamName = $("#homeName")[0].value;
    var awayTeamName = $("#awayName")[0].value;
    var halfLength = $("#halfLength")[0].value;

    if(homeTeamName == "") homeTeamName = "Home Team";
    if(awayTeamName == "") awayTeamName = "Away Team";
    if(halfLength == "") halfLength = "40";

    var queryString = "?homeTeam="+homeTeamName+"&awayTeam="+awayTeamName+"&halfLength="+halfLength;
    window.location.href = "../Dashboard" + queryString;
});