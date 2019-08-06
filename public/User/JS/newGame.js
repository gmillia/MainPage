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
    console.log("New game clicked");

    $("#content").hide().load("HTML/newGame.html");
    $("#content").fadeIn(1000);
});

$(document).on('click', '#startGame', function()
{
    window.location.href = "../Dashboard";
});