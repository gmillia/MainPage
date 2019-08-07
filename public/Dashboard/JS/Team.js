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
		this.GKSaves = savedList[0];
		this.assists = savedList[1];
		this.attacks = savedList[2];
		this.blockedShots = savedList[3];
		this.completedPasses = savedList[4];
		this.corners = savedList[5];
		this.dangerousAttacks = savedList[6];
		this.foulsBy = savedList[7];
		this.foulsOn = savedList[8];
		this.goals = savedList[9];
		this.incompletePasses = savedList[10];
		this.lastPosMin = savedList[11];
		this.lastPosSec = savedList[12];
		this.minutes = savedList[13];
		this.minutesGoal = savedList[14];
		this.name = savedList[15];
		this.offsides = savedList[16];
		this.possession = savedList[17];
		this.scorers = savedList[18];
		this.secInPoss = savedList[19];
		this.seconds = savedList[20];
		this.secondsGoal = savedList[21];
		this.shotsOffGoal = savedList[22];
		this.shotsOnGoal = savedList[23];
		this.throwIns = savedList[24];
		this.totalPasses = savedList[25];
		this.totalShots = savedList[26];
	}
}