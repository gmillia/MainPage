/*
Illia Shershun

File that is fully responsible for the dashboard: figuring everything out (which teams stats to update)
and updating those stats
*/

/*
Closes Stats menu and opens dashboard for input when Dashboard button is clicked, or when Play button is clicked
*/
$(document).on('click', '.dashboardBtn', function() 
{ 
    //If we are not inside the dashboard -> load, otherwise do nothing
    if(!document.querySelector('.t1-dashboard'))
    {
        $(".Content").hide();
        $(".Content").load("HTML/inputDashboard.html").fadeIn("slow");

        $('link[rel=stylesheet][href~="CSS/inputDashboard.css"]').attr('disabled', false);
    }
});

/*
Function gets called when Complete Pass button has been pressed
*/
$(document).on('click', '.complPass', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.completedPasses += 1;
    currTeam.totalPasses += 1;

    addEffect($(this)[0]);
});


/*
Function gets called when Incomplete Pass button has been pressed
TODO: Need to automatically change possession on incomplete pass. 
*/
$(document).on('click', '.incPass', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.incompletePasses += 1;
    currTeam.totalPasses += 1;

    addEffect($(this)[0]);
});

/*
Function gets called when Shot off Goal button has been pressed
*/
$(document).on('click', '.shotOff', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.shotsOffGoal += 1;
    currTeam.totalShots += 1;

    addEffect($(this)[0]);
});

/*
Function gets called when Goalkeeper Save button is pressed
*/
$(document).on('click', '.GKSave', function()
{ 
    var currTeam = getTeam($(this));  //get current team
    var otherTeam;

    if(currTeam == T1) otherTeam = T2;
    else otherTeam = T1;

    currTeam.shotsOnGoal += 1;
    otherTeam.GKSaves += 1;
    currTeam.totalShots += 1;

    addEffect($(this)[0]);
});

/*
Function gets called when Blocked Shot button is called
*/
$(document).on('click', '.shotBlock', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.blockedShots += 1;
    currTeam.totalShots += 1;

    addEffect($(this)[0]);
});

/*
Function is called when Corner button is pressed
*/
$(document).on('click', '.corner', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.corners += 1;

    addEffect($(this)[0]);
});

/*
Function gets called when Offside button is pressed
*/
$(document).on('click', '.offside', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.offsides += 1;

    addEffect($(this)[0]);
});

/*
Function gets called when Foul Commited button is pressed
*/
$(document).on('click', '.foulComm', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.foulsBy += 1;

    addEffect($(this)[0]);
});

/*
Function gets called when Foul Received button is pressed
*/
$(document).on('click', '.foulRec', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.foulsOn += 1;

    addEffect($(this)[0]);
});

/*
Function is called when Goal button is pressed
*/
$(document).on('click', '.goal', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.goals += 1;

    addEffect($(this)[0]);
});

/*
Function is called when Throw-in button is pressed
*/
$(document).on('click', '.throw', function()
{ 
    var currTeam = getTeam($(this));  //get current team

    currTeam.throwIns += 1;

    addEffect($(this)[0]);
});

/*
Helper function that adds ripple effect
*/
function addEffect(thisObj)
{
    if (!thisObj.classList.contains('rippling'))
    {
        thisObj.classList.add('rippling');

        thisObj.addEventListener('animationend', e => 
        {
            thisObj.classList.add('fade');
            thisObj.classList.remove('rippling');

            setTimeout(() => 
            {
                thisObj.classList.remove('fade');
                
            }, 300);
        });
    } 
}

/*
Helper function that returns current team in possession
Also updates current team in possession
*/
function getTeam(thisObj)
{
    if(thisObj.parent().parent().attr('class') == "t1-dashboard") 
        return T1;
    else 
        return T2;
}



