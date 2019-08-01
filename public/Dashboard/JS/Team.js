/*
Illia Shershun

CLass stores all team related info that will be updated during the game
*/

class Team
{
	constructor(name, lastPosMin)
	{
		this.name = name;
		this.possession = 0.0;
		this.totalShots = 0;
		this.shotsOnGoal = 0;
		this.shotsOffGoal = 0;
		this.blockedShots = 0;
		this.corners = 0;
		this.offsides = 0;
		this.GKSaves = 0;
		this.foulsOn = 0;
		this.foulsBy = 0;
		this.totalPasses = 0;
		this.completedPasses = 0;
		this.incompletePasses = 0;
		this.attacks = 0;
		this.dangerousAttacks = 0;
		this.throwIns = 0;
		this.goals = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.lastPosMin = lastPosMin;  //denotes min when team lost possession
		this.lastPosSec = 0;  //denotes sec when team lost possession
		this.secInPoss = 0;  //Denotes seconds spent in possession of the ball
		this.goals = 0;
		this.scorers = [];
		this.assists = [];
		this.minutesGoal = [];
		this.secondsGoal = [];
	}

	/*Helper function that gets called when we load data and need to reset initial values to
	loaded values [20]
	loadFromSaved(assists, blockedShots, complPass, corners, foulsComm, foulsRec, gkSaves, goals,
				  incPass, minsGoal, name, offsides, possession, scorers, secsGoal, shotsOff, shotsOn,
				  throws, totalPass, totalShots)
	*/
	loadFromSaved(savedList)
	{
		//this.assists = savedList[0];
		this.blockedShots = savedList[3];
	}
}