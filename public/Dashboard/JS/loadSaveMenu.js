$(document).on('click', '.saveBtn', function()
{
    if(!document.querySelector(".saveContainer"))
    {
        $(".Content").hide();
        $(".Content").load("HTML/saveMenu.html").fadeIn("slow");
    }
});

$(document).on('click', '#saveData', function()
{
    console.log("Save");
    const db = firebase.firestore();
    var homeTeam = $(".t1-name-input")[0].value;
    var awayTeam = $(".t2-name-input")[0].value;

    if(homeTeam == "") homeTeam = "Home Team";
    if(awayTeam == "") awayTeam = "Away Team";

    var data =
    {
        uid: firebase.auth().currentUser.uid,
        t1Name: homeTeam,
        t2Name: awayTeam,
        t1Possession: T1.possession,
        t2Possession: T2.possession,
        t1totalShots: T1.totalShots,
        t2totalShots: T2.totalShots,
        t1ShotsOnGoal: T1.shotsOnGoal,
        t2ShotsOnGoal: T2.shotsOnGoal,
        t1ShotsOffGoal: T1.shotsOffGoal,
        t2ShotsOffGoal: T2.shotsOffGoal,
        t1BlockedShots: T1.blockedShots,
        t2BlockedShots: T2.blockedShots,
        t1Corners: T1.corners,
        t2Corners: T2.corners,
        t1Offsides: T1.offsides,
        t2Offsides: T2.offsides,
        t1GKSaves: T1.GKSaves,
        t2GKSaves: T2.GKSaves,
        t1FoulsComm: T1.foulsBy,
        t2FouldComm: T2.foulsBy,
        t1FoulsRec: T1.foulsOn,
        t2FouldRec: T2.foulsOn,
        t1ComplPass: T1.completedPasses,
        t2ComplPass: T2.completedPasses,
        t1IncPass: T1.incompletePasses,
        t2IncPass: T2.incompletePasses,
        t1TotalPass: T1.totalPasses,
        t2TotalPass: T2.totalPasses,
        t1Throws: T1.throwIns,
        t2Throws: T2.throwIns,
        t1Goals: T1.goals,
        t2Goals: T2.goals,
        t1Scorers: T1.scorers,
        t2Scorers: T2.scorers,
        t1Assists: T1.assists,
        t2Assists: T2.assists,
        t1MinutesGoal: T1.minutesGoal,
        t2MinutesGoal: T2.minutesGoal,
        t1SecsGoal: T1.secondsGoal,
        t2SecsGoal: T2.secondsGoal
    }

    var filename = $("#saveName")[0].value;
    if(filename == "") filename = "Temporary";

    console.log(filename);
    db.collection("Games").doc(filename).set(data);
    console.log("Done");

});

$(document).on('click', '#loadData', function()
{
    const db = firebase.firestore();

    var gameRef = db.collection("Games");

    /*
    gameRef.get().then(function(doc)
    {
        if(doc.exists) console.log("Exists");
        else console.log("Not");
    });
    */

    var qr = gameRef.where("uid", "==", firebase.auth().currentUser.uid);

    //console.log(qr);

    //Gets all user docs
    qr.get().then(function(docs)
    {
        docs.forEach(function(doc)
        {
            console.log(doc.id);
        });
    });

    /*.catch(function(error)
    {
        console.log("Error");
    });
    */
    
});
