/*
Illia Shershun

File controls behavior of te Save subpage
*/

/*
PURPOSE: Function that controls behavior on the Save button click
INVOKED: On the Save button click in the header submenu
*/
$(document).on('click', '.saveBtn', function()
{
    //Load the content of the save menu if its not already open
    if(!$("#saveName")[0])
    {
        $(".Content").hide();
        $(".Content").load("HTML/saveMenu.html").fadeIn("slow");
    }
});

/*
PURPOSE: Helper function that controls behavior when Save button is clicked in Save menu
INVOKED: On the Save button click in the save submenu
*/
$(document).on('click', '#saveGame', function()
{
    const db = firebase.firestore();

    var data = getData();
    var filename = getFilename();

    var docRef = db.collection("Games").doc(filename);
    
    docRef.get().then(function(doc)
    {
        //File already exist, override?
        if(doc)
        {
            $("#failOverlay")[0].style.display = "flex";
            $("#saveContainer").hide();
            $("#overrideContainer")[0].style.display = "flex";
        }
    }).catch(function()
    {
        //file doesn't exist, errors out -> save
        var overlayText = "<span>" + "Saved as: " + filename + "</span>";  //text displayed when saved
        saveGame(filename, data, overlayText);
    });
});

/*
PURPOSE: Helper function that saves the game and displays success overlay
INVOKED: When the user decides to save/override file
*/
function saveGame(filename, data, overlayText)
{
    var db = firebase.firestore();
    data = JSON.parse(JSON.stringify(data));  //create savable data
    db.collection("Games").doc(filename).set(data).then(function()
    {
        $("#saveOverlay")[0].innerHTML = overlayText;  //text displayed
        $("#saveOverlay")[0].style.display = "flex";  //display the overlay

        //Fade out the overlay
        setTimeout(function()
        {
            $("#saveOverlay").fadeOut(800);
        }, 2000); 
    }); 
}

/*
PURPOSE: Override the saved file with new data
INVOKED: On the Yes click when override is asked
*/
$(document).on('click', '#override', function()
{
    $("#failOverlay").hide();  //hide fail overlay that asks about override
    $("#overrideContainer").hide();  //hide override buttons (yes/no)
    $("#saveContainer").show();  //display the Save button again

    var overlayText = "<span>" + getFilename() + " overridden" + "</span>";  //text displayed in the successful override
    saveGame(getFilename(), getData(), overlayText);
});

/*
PURPOSE: Hide override stuff
INVOKED: On the No click when override is asked
*/
$(document).on('click', '#notOverride', function()
{
    $("#failOverlay").fadeOut(800);  //hide failed overlay
    $("#overrideContainer").hide();  //hide override buttons
    $("#saveContainer").show();  //display Save button
});

/*
PURPOSE: get data to be saved
INVOKED: whenever we need data to save (in override or regular save)
*/
function getData()
{
    var date = getDate();
    //Data to be saved is user id (for matching and making sure access is grandted only to auth users) and teams info
    var data = 
    {
        uid: firebase.auth().currentUser.uid,
        date: date,
        t1: T1,
        t2: T2
    }

    return data;
}

/*
PURPOSE: Helper function that gets the name of the filename user wants to save the data (under)
INVOKED: Whenever we need the name of the file (when saving or overriding)
*/
function getFilename()
{
    //Grab the desired save file name, save as Temporary is name is empty
    var filename = $("#saveName")[0].value;
    if(filename == "") filename = "Temporary";

    return filename;
}

/*
PURPOSE: get todays date in the form DD/MM/YYYY
INVOKED: Whenever we need the data (when saving or overriding)
*/
function getDate()
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

