$(document).on('click', '#analysis', function()
{
    console.log(4);
    $("#content").hide();
    $("#content").load("HTML/analysis.html").fadeIn(1000);
});