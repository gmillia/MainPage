var green = "rgb(0, 128, 0)";
var red = "rgb(255, 0, 0)";
var yellow = "rgb(255, 255, 0)";

/*
Function that initially loads the stats (to display in the begining)
*/
$(document).ready(function()
{
    $(".Content").load("HTML/matchStats.html");

    $('link[rel=stylesheet][href~="CSS/inputDashboard.css"]').attr('disabled', 'true');
});

/*
Function that gets called when the match button is clicked to display Match stats
*/
$(document).on('click', '.matchBtn', function() 
{ 
    //We are not in the stats submenu -> need to load it
    if(!document.querySelector(".ball-poss-placeholder"))
    {
        $(".Content").hide();

        //Makes sure that DOM is loaded
        $(".Content").load("HTML/matchStats.html", function()
        {
            $('link[rel=stylesheet][href~="CSS/inputDashboard.css"]').attr('disabled', true);

            var cntn = document.querySelector(".Content");

            if(cntn)
                updateStats();
        }).fadeIn("slow");

        $('link[rel=stylesheet][href~="CSS/inputDashboard.css"]').attr('disabled', true);
    }
});

/*
Helper function that gets both stats and "draws" the bars for match stats
Calls all the other functions that actually do the work
*/
function updateStats()
{
    updateGoalAttempts();
    updateShotsOnGoal();
    updateShotsOffGoal();
    updateBlockedShots();
    updateCorners();
    updateOffsides();
    updateGKSaves();
    updateFoulsCommited();
    updateFoulsReceived();

    updateCompletePasses();
    updateIncompletePasses();
    updateTotalPasses();

    updateThrows();
}

/*
Helper function that updates the Goal Attempts numbers and graph
*/
function updateGoalAttempts()
{
    totalGoalAttempts = T1.totalShots + T2.totalShots;

    var t1_bar = Math.floor((T1.totalShots / totalGoalAttempts) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-goal-att-num").innerHTML = "<b>" + T1.totalShots + "</b>";
    document.querySelector(".t2-goal-att-num").innerHTML = "<b>" + T2.totalShots + "</b>";

    var bar1 = document.getElementsByClassName("t1-goal-att-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-goal-att-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Shots On Goal numbers and graph
*/
function updateShotsOnGoal()
{
    totalShotsOn = T1.shotsOnGoal + T2.shotsOnGoal;

    var t1_bar = Math.floor((T1.shotsOnGoal / totalShotsOn) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-shots-on-num").innerHTML = "<b>" + T1.shotsOnGoal + "</b>";
    document.querySelector(".t2-shots-on-num").innerHTML = "<b>" + T2.shotsOnGoal + "</b>";

    var bar1 = document.getElementsByClassName("t1-shots-on-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-shots-on-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Shots Off Goal numbers and graph
*/
function updateShotsOffGoal()
{
    totalShotsOff = T1.shotsOffGoal + T2.shotsOffGoal;

    var t1_bar = Math.floor((T1.shotsOffGoal / totalShotsOff) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-shots-off-num").innerHTML = "<b>" + T1.shotsOffGoal + "</b>";
    document.querySelector(".t2-shots-off-num").innerHTML = "<b>" + T2.shotsOffGoal + "</b>";

    var bar1 = document.getElementsByClassName("t1-shots-off-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-shots-off-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Blocked Shots numbers and graph
*/
function updateBlockedShots()
{
    totalBlock = T1.blockedShots + T2.blockedShots;

    var t1_bar = Math.floor((T1.blockedShots / totalBlock) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-block-shot-num").innerHTML = "<b>" + T1.blockedShots + "</b>";
    document.querySelector(".t2-block-shot-num").innerHTML = "<b>" + T2.blockedShots + "</b>";

    var bar1 = document.getElementsByClassName("t1-block-shot-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-block-shot-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Corners numbers and graph
*/
function updateCorners()
{
    totalCorners = T1.corners + T2.corners;

    var t1_bar = Math.floor((T1.corners / totalCorners) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-corners-num").innerHTML = "<b>" + T1.corners + "</b>";
    document.querySelector(".t2-corners-num").innerHTML = "<b>" + T2.corners + "</b>";

    var bar1 = document.getElementsByClassName("t1-corners-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-corners-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Offsides numbers and graph
*/
function updateOffsides()
{
    totalOffsides = T1.offsides + T2.offsides;

    var t1_bar = Math.floor((T1.offsides / totalOffsides) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-off-num").innerHTML = "<b>" + T1.offsides + "</b>";
    document.querySelector(".t2-off-num").innerHTML = "<b>" + T2.offsides + "</b>";

    var bar1 =  document.getElementsByClassName("t1-off-bar")[0].style;
    var bar2 =  document.getElementsByClassName("t2-off-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Goalkeeper Saves numbers and graph
*/
function updateGKSaves()
{
    totalSaves = T1.GKSaves + T2.GKSaves;

    var t1_bar = Math.floor((T1.GKSaves / totalSaves) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-gk-save-num").innerHTML = "<b>" + T1.GKSaves + "</b>";
    document.querySelector(".t2-gk-save-num").innerHTML = "<b>" + T2.GKSaves + "</b>";

    var bar1 = document.getElementsByClassName("t1-gk-save-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-gk-save-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Fouls Commited numbers and graph
*/
function updateFoulsCommited()
{
    totalFoulsComm = T1.foulsBy + T2.foulsBy;

    var t1_bar = Math.floor((T1.foulsBy / totalFoulsComm) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-foul-comm-num").innerHTML = "<b>" + T1.foulsBy + "</b>";
    document.querySelector(".t2-foul-comm-num").innerHTML = "<b>" + T2.foulsBy + "</b>";

    var bar1 = document.getElementsByClassName("t1-foul-comm-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-foul-comm-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Fouls Received numbers and graph
*/
function updateFoulsReceived()
{
    totalFoulsRec = T1.foulsOn + T2.foulsOn;

    var t1_bar = Math.floor((T1.foulsOn / totalFoulsRec) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-foul-rec-num").innerHTML = "<b>" + T1.foulsOn + "</b>";
    document.querySelector(".t2-foul-rec-num").innerHTML = "<b>" + T2.foulsOn + "</b>";

    var bar1 = document.getElementsByClassName("t1-foul-rec-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-foul-rec-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Complete passes numbers and graph
*/
function updateCompletePasses()
{
    totalComplPasses = T1.completedPasses + T2.completedPasses;

    var t1_bar = Math.floor((T1.completedPasses / totalComplPasses) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-pass-compl-num").innerHTML = "<b>" + T1.completedPasses + "</b>";
    document.querySelector(".t2-pass-compl-num").innerHTML = "<b>" + T2.completedPasses + "</b>";

    var bar1 = document.getElementsByClassName("t1-pass-compl-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-pass-compl-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Incomplete passes numbers and graph
*/
function updateIncompletePasses()
{
    totalIncPasses = T1.incompletePasses + T2.incompletePasses;

    var t1_bar = Math.floor((T1.incompletePasses / totalIncPasses) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-pass-inc-num").innerHTML = "<b>" + T1.incompletePasses + "</b>";
    document.querySelector(".t2-pass-inc-num").innerHTML = "<b>" + T2.incompletePasses + "</b>";

    var bar1 = document.getElementsByClassName("t1-pass-inc-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-pass-inc-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Total passes numbers and graph
*/
function updateTotalPasses()
{
    totalPasses = T1.totalPasses + T2.totalPasses;

    var t1_bar = Math.floor((T1.totalPasses / totalPasses) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-pass-tot-num").innerHTML = "<b>" + T1.totalPasses + "</b>";
    document.querySelector(".t2-pass-tot-num").innerHTML = "<b>" + T2.totalPasses + "</b>";

    var bar1 = document.getElementsByClassName("t1-pass-tot-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-pass-tot-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the Throw-ins numbers and graph
*/
function updateThrows()
{
    totalThrows = T1.throwIns + T2.throwIns;

    var t1_bar = Math.floor((T1.throwIns / totalThrows) * 100);
    var t2_bar = 100 - t1_bar;

    document.querySelector(".t1-throws-num").innerHTML = "<b>" + T1.throwIns + "</b>";
    document.querySelector(".t2-throws-num").innerHTML = "<b>" + T2.throwIns + "</b>";

    var bar1 = document.getElementsByClassName("t1-throws-bar")[0].style;
    var bar2 = document.getElementsByClassName("t2-throws-bar")[0].style;

    updateBarColor(t1_bar, t2_bar, bar1, bar2);

    bar1.width = t1_bar.toString() + "%";
    bar2.width = t2_bar.toString() + "%";
}

/*
Helper function that updates the bar color based on who has better stats
*/
function updateBarColor(t1_bar, t2_bar, bar1, bar2)
{
    if(t1_bar > t2_bar)
    {
        bar1.background = green;
        bar2.background = red;
    }
    else if(t1_bar < t2_bar)
    {
        bar1.background = red;
        bar2.background = green;
    }
    else
    {
        bar1.background = bar2.background = yellow;
    }
}