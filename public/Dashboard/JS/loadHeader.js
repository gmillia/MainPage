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
    const db = firebase.firestore();
    var homeTeam = $(".t1-name-input")[0].value;
    var awayTeam = $(".t2-name-input")[0].value;

    if(homeTeam == "") homeTeam = "Home Team";
    if(awayTeam == "") awayTeam = "Away Team";
    
    var data =
    {
        t1: homeTeam,
        t2: awayTeam
    }

    console.log(firebase.auth().currentUser.uid);
    db.collection("Games").doc(firebase.auth().currentUser.uid).collection("gms").doc('test').set(data);
    //db.collection("Games").doc(firebase.auth().currentUser.uid).collection("games").set(data);
});
