/*
Illia Shershun

Contains helper functions which are getting called when certain keys are pressed (functions are getting called rom Listeners.js)
Updates onscreen info + stats
*/
var t1_name = null;
var t2_name = null;
var timer_mins = null;
var timer_halfs = 2;
var starting_team = 1;

var T1 = new Team("Home Team", 40);
var T2 = new Team("Away Team", 40);
var timer = new Timer(40, 0, 2);

var currTeam = 1;
var numChanges = 0;  //will be used to see that timer is not updated when running

/*
Helper function into which stuff will be supplied from settings to create teams + timer
*/
function setSettings(t1Name, t2Name, timerMins, startingTeam)
{
    t1_name = t1Name;
    t2_name = t2Name;
    timer_mins = timerMins;
    starting_team = startingTeam;

    document.getElementsByClassName("team-one")[0].innerHTML = t1Name;
    T1.name = t1Name;

    document.getElementsByClassName("team-two")[0].innerHTML = t2Name;
    T2.name = t2Name;

    document.getElementsByClassName("minutes")[0].innerHTML = timer_mins;
    timer.minutes = timer_mins;

    document.getElementsByClassName("input-team")[0].innerHTML = "<b>Possession: " + starting_team + "</b>";
    currTeam = starting_team;
}

/*
Helper function that will be called prior to start to create teams and timer
*/
function changeObs()
{
    T1.name = t1_name;
    T2.name = t2_name;
    timer.minutes = timer_mins;
    timer.halves = timer_halves;
    currTeam = starting_team;
}

/*
Helper function for mouse listener
Purpose: Starts/stops timer (starts/stops record keeping)
*/
function startStopTimer()
{
    if(timer.isRunning) 
    {
        timer.stop();
        startsStats = false;
    }
	else
	{
		timer.start();
		startStats = true;
	}
}

function changePossession(team)
{
    //Case 1: 1 is pressed
    if(team == 1)
    {
        if(currTeam != 1)
        {
            currTeam = 1;
            updatePossession();
        }
    }
    else if(team == 2)
    {
        if(currTeam != 2)
        {
            currTeam = 2;
            updatePossession();
        }
    }
}

/*
Helper function to update possession stats:
Invoked: Either 1/2 pressed (change of possession occurs) this function is called by changePossession()
Purpose: Calculate possession % based on time team spends with the ball
*/
function updatePossession()
{
	var time = 0;  //time in secs spent in possession
	var passedMins = 40 - timer.minutes - 1;
	var passedSecs = 60 - timer.seconds;
	var totalTime = (passedMins * 60) + passedSecs;

	var possession = 0;
	//Switched from team 2 to team 1 -> update all team 2 info and display along with team 1
	if(currTeam == 1)
	{
		//Update that T2 last possession -> record time
		T2.lastPosMin = timer.minutes;
		T2.lastPosSec = timer.seconds;

		T2.secInPoss += ((T1.lastPosMin * 60) + T1.lastPosSec) - ((timer.minutes * 60) + timer.seconds);  //get total time spent in posession

		possession = Math.floor((T2.secInPoss / totalTime) * 100);

		document.getElementsByClassName("t2-ball-poss-bar")[0].style.width = possession.toString() + "%";
		document.getElementsByClassName("t1-ball-poss-bar")[0].style.width = (100-possession).toString() + "%";

		document.getElementsByClassName("t2-ball-poss-name")[0].innerHTML = "<b>Ball Possession: " + possession.toString() + "%" + "[TIME: " + T2.secInPoss + "s]" + "</b>";
		document.getElementsByClassName("t1-ball-poss-name")[0].innerHTML = "<b>Ball Possession: " + (100 - possession).toString() + "%" + "[TIME: " + T1.secInPoss + "s]" + "</b>";

		document.getElementsByClassName("input-team")[0].innerHTML = "<b>Possession: 1</b>";
	}
	else
	{
		//Update that T1 last possession -> record time
		T1.lastPosMin = timer.minutes;
		T1.lastPosSec = timer.seconds;

		T1.secInPoss += ((T2.lastPosMin * 60) + T2.lastPosSec) - ((timer.minutes * 60) + timer.seconds);  //get total time spent in posession

		possession = Math.floor((T1.secInPoss / totalTime) * 100);

		console.log("1: " + possession);

		document.getElementsByClassName("t1-ball-poss-bar")[0].style.width = possession.toString() + "%";
		document.getElementsByClassName("t2-ball-poss-bar")[0].style.width = (100-possession).toString() + "%";

		document.getElementsByClassName("t1-ball-poss-name")[0].innerHTML = "<b>Ball Possession: " + possession.toString() + "%" + "[TIME: " + T1.secInPoss + "s]" + "</b>";
		document.getElementsByClassName("t2-ball-poss-name")[0].innerHTML = "<b>Ball Possession: " + (100 - possession).toString() + "%" + "[TIME: " + T2.secInPoss + "s]" + "</b>";

		document.getElementsByClassName("input-team")[0].innerHTML = "<b>Possession: 2</b>";
	}	
}

/*
Helper function that gets called from other pass functions to update total passes
*/
function updateTotalPasses()
{
	var totalPasses = 0;

	if(currTeam == 1) 
	{
		T1.totalPasses += 1;

		totalPasses = T1.totalPasses + T2.totalPasses;

		var t1_bar = Math.floor((T1.totalPasses / totalPasses) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-tot-pass-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-tot-pass-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-tot-pass-name")[0].innerHTML = "<b>Total Passes: " + T1.totalPasses + "</b>";
	}
	else
	{
		T2.totalPasses += 1;

		totalPasses = T1.totalPasses + T2.totalPasses;

		var t2_bar = Math.floor((T2.totalPasses / totalPasses) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-tot-pass-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-tot-pass-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-tot-pass-name")[0].innerHTML = "<b>Total Passes: " + T2.totalPasses + "</b>";
	}
}

/*
Helper function that updates completed passes + total passes
Updates info, screen info, bars.
*/
function updateCompletedPasses()
{
	var totalComplPasses = 0;

	if(currTeam == 1) 
	{
		T1.completedPasses += 1;

		//Step 1: Update total passes
		updateTotalPasses();

		//Step 2: Update shots on goal
		totalComplPasses = T1.completedPasses + T2.completedPasses;

		var t1_bar = Math.floor((T1.completedPasses / totalComplPasses) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-compl-pass-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-compl-pass-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-compl-pass-name")[0].innerHTML = "<b>Completed Passes: " + T1.completedPasses + "</b>";
	}
	else
	{
		T2.completedPasses += 1;

		//Step 1: Update total passes
		updateTotalPasses();
	
		//Step 2: Update shots on goal
		totalComplPasses = T1.completedPasses + T2.completedPasses;

		var t2_bar = Math.floor((T2.completedPasses / totalComplPasses) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-compl-pass-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-compl-pass-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-compl-pass-name")[0].innerHTML = "<b>Completed Passes: " + T2.completedPasses + "</b>";
	}
}

/*
Helper function that updates completed passes + total passes
Updates info, screen info, bars.
*/
function updateIncompletePasses()
{
	var totalIncPasses = 0;

	if(currTeam == 1) 
	{
		T1.incompletePasses += 1;

		//Step 1: Update total passes
		updateTotalPasses();

		//Step 2: Update shots on goal
		totalIncPasses = T1.incompletePasses + T2.incompletePasses;

		var t1_bar = Math.floor((T1.incompletePasses / totalIncPasses) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-inc-pass-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-inc-pass-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-inc-pass-name")[0].innerHTML = "<b>Incomplete Passes: " + T1.incompletePasses + "</b>";
	}
	else
	{
		T2.incompletePasses += 1;

		//Step 1: Update total passes
		updateTotalPasses();
	
		//Step 2: Update shots on goal
		totalIncPasses = T1.incompletePasses + T2.incompletePasses;

		var t2_bar = Math.floor((T2.incompletePasses / totalIncPasses) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-inc-pass-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-inc-pass-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-inc-pass-name")[0].innerHTML = "<b>Incomplete Passes: " + T2.incompletePasses + "</b>";
	}
}

/*
Helper function that gets called within other shot functions to update total attempts
*/
function updateGoalAttempts()
{
	var totShots = 0;

	if(currTeam == 1) 
	{
		T1.totalShots += 1;

		totShots = T1.totalShots + T2.totalShots;

		//Step 1: Update total shots
		var t1_bar = Math.floor((T1.totalShots / totShots) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-goal-att-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-goal-att-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-goal-att-name")[0].innerHTML = "<b>Goal Attempts: " + T1.totalShots + "</b>";
	}
	else
	{
		T2.totalShots += 1;

		totShots = T1.totalShots + T2.totalShots;

		var t2_bar = Math.floor((T2.totalShots / totShots) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-goal-att-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-goal-att-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-goal-att-name")[0].innerHTML = "<b>Goal Attempts: " + T2.totalShots + "</b>";
	}	
}

/*
Helper function that fully deals with updating shots on goal + total shots for both teams:
Updates info, updates screen info + bars. 
*/
function updateShotsOnGoal()
{
	var totalShotsOnGoal = 0;

	if(currTeam == 1) 
	{
		T1.shotsOnGoal += 1;

		//Step 1: Update total attempts
		updateGoalAttempts();

		//Step 2: Update shots on goal
		totalShotsOnGoal = T1.shotsOnGoal + T2.shotsOnGoal;

		var t1_bar = Math.floor((T1.shotsOnGoal / totalShotsOnGoal) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-shots-on-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-shots-on-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-shots-on-name")[0].innerHTML = "<b>Shots on Goal: " + T1.shotsOnGoal + "</b>";
	}
	else
	{
		T2.shotsOnGoal += 1;

		//Step 1: Update total attempts
		updateGoalAttempts();
	
		//Step 2: Update shots on goal
		totalShotsOnGoal = T1.shotsOnGoal + T2.shotsOnGoal;

		var t2_bar = Math.floor((T2.shotsOnGoal / totalShotsOnGoal) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-shots-on-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-shots-on-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-shots-on-name")[0].innerHTML = "<b>Shots on Goal: " + T2.shotsOnGoal + "</b>";
	}
}

/*
Helper function that fully deals with updating shots off goal + total shots for both teams:
Updates info, updates screen info + bars. 
*/
function updateShotsOffGoal()
{
	var totalShotsOffGoal = 0;

	if(currTeam == 1) 
	{
		T1.shotsOffGoal += 1;

		//Step 1: Update total attempts
		updateGoalAttempts();

		//Step 2: Update shots on goal
		totalShotsOffGoal = T1.shotsOffGoal + T2.shotsOffGoal;

		var t1_bar = Math.floor((T1.shotsOffGoal / totalShotsOffGoal) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-shots-off-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-shots-off-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-shots-off-name")[0].innerHTML = "<b>Shots off Goal: " + T1.shotsOffGoal + "</b>";
	}
	else
	{
		T2.shotsOffGoal += 1;

		//Step 1: Update total attempts
		updateGoalAttempts();
	
		//Step 2: Update shots on goal
		totalShotsOffGoal = T1.shotsOffGoal + T2.shotsOffGoal;

		var t2_bar = Math.floor((T2.shotsOffGoal / totalShotsOffGoal) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-shots-off-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-shots-off-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-shots-off-name")[0].innerHTML = "<b>Shots off Goal: " + T2.shotsOffGoal + "</b>";
	}
}

/*
Helper function that fully deals with updating shots on goal + total shots for both teams:
Updates info, updates screen info + bars. 
*/
function updateBlockedShots()
{
	var totalBlockShots = 0;

	if(currTeam == 1) 
	{
		T1.blockedShots += 1;

		//Step 1: Update total attempts
		updateGoalAttempts();

		//Step 2: Update shots on goal
		totalBlockShots = T1.blockedShots + T2.blockedShots;

		var t1_bar = Math.floor((T1.blockedShots / totalBlockShots) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-block-shot-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-block-shot-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-block-shot-name")[0].innerHTML = "<b>Blocked Shots: " + T1.blockedShots + "</b>";
	}
	else
	{
		T2.blockedShots += 1;

		//Step 1: Update total attempts
		updateGoalAttempts();
	
		//Step 2: Update shots on goal
		totalBlockShots = T1.blockedShots + T2.blockedShots;

		var t2_bar = Math.floor((T2.blockedShots / totalBlockShots) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-block-shot-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-block-shot-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-block-shot-name")[0].innerHTML = "<b>Blocked Shots: " + T2.blockedShots + "</b>";
	}
}

/*
Helper function that updates GK saves
Invoked: S + G [pressed]
Purpose: updates team in possession goal attempts and other teams GK saves
*/
function updateGKSaves()
{
	var totalGKSaves = 0;

	if(currTeam == 1) 
	{
		T2.GKSaves += 1;

		//Step 1: Update goal attempts by the team
		updateGoalAttempts();

		//Step 2: Update GK saves for the other team
		totalGKSaves = T1.GKSaves + T2.GKSaves;

		var t2_bar = Math.floor((T2.GKSaves / totalGKSaves) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t1-gk-save-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-gk-save-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t2-gk-save-name")[0].innerHTML = "<b>Goalkeeper Saves: " + T2.GKSaves + "</b>";
	}
	else
	{
		T1.GKSaves += 1;

		//Step 1: Update goal attempts by the team
		updateGoalAttempts();

		//Step 2: Update GK saves for the other team
		totalGKSaves = T1.GKSaves + T2.GKSaves;

		var t1_bar = Math.floor((T1.GKSaves / totalGKSaves) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t2-gk-save-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-gk-save-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t1-gk-save-name")[0].innerHTML = "<b>Goalkeeper Saves: " + T1.GKSaves + "</b>";
	}
}

/*
Updates corners for team
Invoked: C
Purpose: adds corner count, adjust graphs, displays/updates info
*/
function updateCorners()
{
	var totalCorners = 0;

	if(currTeam == 1) 
	{
		T1.corners += 1;

		totalCorners = T1.corners + T2.corners;

		var t1_bar = Math.floor((T1.corners / totalCorners) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-cor-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-cor-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-cor-name")[0].innerHTML = "<b>Corner Kicks: " + T1.corners + "</b>";
	}
	else
	{
		T2.corners += 1;

		totalCorners = T1.corners + T2.corners;

		var t2_bar = Math.floor((T2.corners / totalCorners) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-cor-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-cor-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-cor-name")[0].innerHTML = "<b>Corner Kicks: " + T2.corners + "</b>";
	}
}

/*
Updates offsides for team
Invoked: O
Purpose: adds offside count, adjust graphs, displays/updates info
*/
function updateOffsides()
{
	var totalOffsides = 0;

	if(currTeam == 1) 
	{
		T1.offsides += 1;

		totalOffsides = T1.offsides + T2.offsides;

		var t1_bar = Math.floor((T1.offsides / totalOffsides) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-off-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-off-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-off-name")[0].innerHTML = "<b>Offsides: " + T1.offsides + "</b>";
	}
	else
	{
		T2.offsides += 1;

		totalOffsides = T1.offsides + T2.offsides;

		var t2_bar = Math.floor((T2.offsides / totalOffsides) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-off-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-off-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-off-name")[0].innerHTML = "<b>Offsides: " + T2.offsides + "</b>";
	}
}

/*
Updates fouls stats
Invoked: F 
Purpose: increases fouls commited
*/
function updateFoulsCommited()
{
	var totalFolComm = 0;

	//IF team 1 is in possession, foul is commited by team 2, therefore add info to team 2
	if(currTeam == 1) 
	{
		T2.foulsBy += 1;

		totalFolComm = T1.foulsBy + T2.foulsBy;

		var t2_bar = Math.floor((T2.foulsBy / totalFolComm) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-fol-comm-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-fol-comm-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-fol-comm-name")[0].innerHTML = "<b>Fouls Commited: " + T2.foulsBy + "</b>";
	}
	//IF team 2 is in possession, foul is commited by team 1, therefore add info to team 1
	else
	{
		T1.foulsBy += 1;

		totalFolComm = T1.foulsBy + T2.foulsBy;

		var t1_bar = Math.floor((T1.foulsBy / totalFolComm) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-fol-comm-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-fol-comm-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-fol-comm-name")[0].innerHTML = "<b>Fouls Commited: " + T1.foulsBy + "</b>";
	}
}

/*
Updates fouls received
Invoked: F
Purpose: increases fouls received
*/
function updateFoulsReceived()
{
	var totalFolRec = 0;

	if(currTeam == 1) 
	{
		T1.foulsOn += 1;

		totalFolRec = T1.foulsOn + T2.foulsOn;

		var t1_bar = Math.floor((T1.foulsOn / totalFolRec) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-fol-rec-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-fol-rec-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-fol-rec-name")[0].innerHTML = "<b>Fouls Received: " + T1.foulsOn + "</b>";
	}
	else
	{
		T2.foulsOn += 1;

		totalFolRec = T1.foulsOn + T2.foulsOn;

		var t2_bar = Math.floor((T1.foulsOn / totalFolRec) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-fol-rec-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t1-fol-rec-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t2-fol-rec-name")[0].innerHTML = "<b>Fouls Received: " + T2.foulsOn + "</b>";
	}
}

/*
Helper function that gets invoked when back button in scoring menu is pressed
Adds scoring info to the scorer, assist, and time lists
*/
function updateScoringInfo()
{
    //Step 1: Grab values
    var scorer = document.getElementsByClassName("scorer-name")[0].value;
    var assist = document.getElementsByClassName("assist-name")[0].value;

    //Step 2: push values into lists
    if(currTeam == 1)
    {
        T1.scorers.push(scorer);
        T1.assists.push(assist);
        T1.minutesGoal.push(timer.minutes);
        T1.secondsGoal.push(timer.seconds);
    }
    else
    {
        T2.scorers.push(scorer);
        T2.assists.push(assist);
        T2.minutesGoal.push(timer.minutes);
        T2.secondsGoal.push(timer.seconds);
    }
}

/*
Updates goals scored by the team
Invoked: G
Purpose: increase goals scored by the team
*/
function updateGoals()
{
    //Step 1: Stop timer
    startStopTimer();
    //Show goal scoring submenu -> allows entry for scorer + assists names
    document.getElementsByClassName("menu")[0].style.display = "none";
    document.getElementsByClassName("scoring-menu")[0].style.display = "block";
    
	if(currTeam == 1)
	{
		T1.goals += 1;
		document.getElementsByClassName("team-one-score")[0].innerHTML = T1.goals;
	}
	else
	{
		T2.goals += 1;
		document.getElementsByClassName("team-two-score")[0].innerHTML = T2.goals;
	}
}

/*
Updates fouls received
Invoked: T
Purpose: increases fouls received
*/
function updateThrowIns()
{
	var totalThrowIns = 0;

	if(currTeam == 1) 
	{
		T1.throwIns+= 1;

		totalThrowIns = T1.throwIns + T2.throwIns;

		var t1_bar = Math.floor((T1.throwIns / totalThrowIns) * 100);
		var t2_bar = 100 - t1_bar;

		document.getElementsByClassName("t1-throws-bar")[0].style.width = t1_bar.toString() + "%";
		document.getElementsByClassName("t2-throws-bar")[0].style.width = t2_bar.toString() + "%";

		document.getElementsByClassName("t1-throws-name")[0].innerHTML = "<b>Throw-ins: " + T1.throwIns + "</b>";
	}
	else
	{
		T2.throwIns+= 1;

		totalThrowIns = T1.throwIns + T2.throwIns;

		var t2_bar = Math.floor((T2.throwIns / totalThrowIns) * 100);
		var t1_bar = 100 - t2_bar;

		document.getElementsByClassName("t2-throws-bar")[0].style.width = t2_bar.toString() + "%";
		document.getElementsByClassName("t1-throws-bar")[0].style.width = t1_bar.toString() + "%";

		document.getElementsByClassName("t2-throws-name")[0].innerHTML = "<b>Throw-ins: " + T2.throwIns + "</b>";
	}
}