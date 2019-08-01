/*
Illia Shershun

File that is responsible to load header and control buttons present in the header
*/

/*
$(document).ready(function()
{
    $("header").load("HTML/header.html", function()
    {
        //Make sure Match button is selected initially 
        var loaded = document.querySelector('.matchBtn');

        if(loaded)
            $(".matchBtn").click();
    });
});
*/

/*
Helper function that loads header and starts loading the stats into Content of the page
Gets called from auth.js 
*/
function loadPage()
{
    $("header").load("HTML/header.html", function()
    {
        //Make sure Match button is selected initially 
        var loaded = document.querySelector('.matchBtn');

        if(loaded)
            $(".matchBtn").click();
    });   
}

/*
Controls behavior on Back (button) click -> goes back to User page

TODO: check if unsaved and give option to save
*/
$(document).on('click', '.backBtn', function()
{ 
    window.location.href = "../User";
});

/*
Controls behavior on Play button
*/
$(document).on('click', '.play', function()
{
    //setParams();

    $(this).toggleClass('active');
    
    //Was stopped, now playing
    if(!$(this).hasClass('playing'))
    {
        $(this).addClass('playing');

        if($(".timer-mins-input")[0].value == '')
            timer.minutes = 40;
        else
            timer.minutes = $(".timer-mins-input")[0].value;
        
        timer.start();
    }
    //Was playing, now stopped
    else if($(this).hasClass('playing'))
    {
        $(this).removeClass('playing');
        timer.stop();
    }

    return false;
});

/*
For making the buttons have color when we are inside certain submenu
*/
$("header").on('click', 'button', function()
{
    $('button').removeClass('selected');
    $(this).addClass('selected');
});


