/*
Illia Shershun

This file controls the behavior of the Analysis (subpage) content, starting from the click on the analysis button
*/

/*
PURPOSE: Controls the behavior of the page once the Analysis button is clicked
INVOKED: on Analysis button click
*/
$(document).on('click', '#analysis', function()
{
    $("#content").hide();
    $("#content").load("HTML/analysis.html").fadeIn(1000);
});