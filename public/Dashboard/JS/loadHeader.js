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

$(document).on('click', '.backBtn', function()
{ 
    window.location.href = "../User";
});

//For play button
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

//For making the buttons have color when we are inside certain submenu
$("header").on('click', 'button', function(){
    $('button').removeClass('selected');
    $(this).addClass('selected');
});

$(document).on('click', '.saveBtn', function()
{
    console.log(1);
    window.print();
});
