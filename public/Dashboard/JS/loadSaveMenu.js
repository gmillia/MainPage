/*
Illia Shershun

File controls behavior of te Save subpage
*/

/*
Function that controls behavior on the Save button click: opens Save submenu
*/
$(document).on('click', '.saveBtn', function()
{
    if(!$("#saveName")[0])
    {
        $(".Content").hide();
        $(".Content").load("HTML/saveMenu.html").fadeIn("slow");
    }
});

/*
Helper function that controls behavior when Save button is clicked in the Save-submenu (when user wants to save data)

TODO: alert user if file already exists uder certain name + limit number of charactes for filename
*/
$(document).on('click', '#saveGame', function()
{
    //console.log("Save");
    const db = firebase.firestore();

    //Grab the names of the teams
    var homeTeam = $(".t1-name-input")[0].value;
    var awayTeam = $(".t2-name-input")[0].value;

    //If empty save as home/away team for names
    if(homeTeam == "") homeTeam = "Home Team";
    if(awayTeam == "") awayTeam = "Away Team";

    var date = getDate();
    //Data to be saved is user id (for matching and making sure access is grandted only to auth users) and teams info
    var data = 
    {
        uid: firebase.auth().currentUser.uid,
        date: date,
        t1: T1,
        t2: T2
    }

    //Grab the desired save file name, save as Temporary is name is empty
    var filename = $("#saveName")[0].value;
    if(filename == "") filename = "Temporary";

    var docRef = db.collection("Games").doc(filename);
    
    docRef.get().then(function(doc)
    {
        //File already exist, override?
        if(doc)
        {
            $("#failOverlay")[0].style.display = "flex";

        }
    }).catch(function()
    {
        $("#saveOverlay")[0].innerHTML = "<span>" + "Saved as: " + filename + "</span>";
        $("#saveOverlay")[0].style.display = "flex";
        setTimeout(function()
        {
            $("#saveOverlay").fadeOut(800);
        }, 2000);
    });
    /*
    //Save data in the Games collection with the desired filename
    db.collection("Games").doc(filename).set(JSON.parse(JSON.stringify(data))).then(function()
    {
        $("#saveOverlay")[0].innerHTML = "<span>" + "Saved as: " + filename + "</span>";
        //$("#saveOverlay").show();
        $("#saveOverlay")[0].style.display = "flex";
        setTimeout(function()
        {
            $("#saveOverlay").fadeOut(800);
        }, 2000);
    });
    */
});

function getDate()
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

