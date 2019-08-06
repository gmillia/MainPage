$(document).on('click', '#account', function()
{
    console.log(55);
    $("#content").hide();
    $("#content").load("HTML/account.html").fadeIn(1000);
});