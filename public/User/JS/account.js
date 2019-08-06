/*
Illia Shershun

File cntrols the behavior of the Accunt (subpage) content, starting with the Account button click
*/

/*
PURPOSE: Control the behavior of the page once the Account button is clicked
INVOKED: On Account button click
*/
$(document).on('click', '#account', function()
{
    $("#content").hide();
    $("#content").load("HTML/account.html").fadeIn(1000);
});