/*
Illia Shershun

File that controls the behavior of the User page
*/

/*
PURPOSE: initial function that checks if the user is logged in/out
INVOKED: Once the page starts loading
*/
window.onload = function()
{
    firebase.auth().onAuthStateChanged(user =>
    {
        var sessionTimeout = null;
        //Case 1: User is logged in
        if(user)
        {
            console.log("Logged in");
            toDisplay();

            //Set session timeout, so the user is logged out automatically after some time
            user.getIdTokenResult().then((idTokenResult)=>
            {
                const authTime = idTokenResult.claims.auth_time * 1000;
                const sessionDuration = 1000 * 60 * 60 * 3; //1000*64 = ~1 minute expiration -> right now set for 3 hours
                const milsUntilExpiration = sessionDuration - (Date.now() - authTime);
                sessionTimeout = setTimeout(() => firebase.auth().signOut(), milsUntilExpiration);
            })
        }
        //Case 2: user is logged out
        else
        {
            console.log("Logged out");

            sessionTimeout && clearTimeout(sessionTimeout);
            sessionTimeout = null;

            window.location.href = ".."
        }
    });
}

/*
PURPOSE: Start a new game 
INVOKED: New Game button click

TODO: Add modal that sets up new game info (teams names etc)
*/
$(document).on('click', '#newGame', function()
{
    window.location.href = "../Dashboard";
});

//Sign user out when sign out button is clicked
$(document).on('click', '#signOut', function()
{
    firebase.auth().signOut();
});

/*
PURPOSE: Helper function that decides what to display based on the user auth type
INVOKED: in onAuthChange function, when user is logged in 

IN-TEST: Currently testing loading options for users who have Premium account
*/
function toDisplay()
{
    var loadedSaved = false;
    const auth = firebase.auth();
    const db = firebase.firestore();

    //Check the user type, if user has certain type-> display special options for him
    db.collection("Users").doc(auth.currentUser.uid).get().then(function(doc)
    {
        var userType = doc.data().type;

        if(userType == "Premium")
        {
            console.log("Premium");

            var element = document.createElement("input");
            element.type = "button";
            element.value = "Load"
            element.onclick = function()
            { 
                createLoadButtons(loadedSaved);
                loadedSaved = true;
            };

            $("body").append(element);
        }

        //Show page once everything is set-up
        showPage();
    });
}

/*
PURPOSE: Show the page only when everything is ready
INVOKED: End of toDisplay function (once dynamic content is loaded)
*/
function showPage()
{
    document.getElementsByTagName("html")[0].style.visibility = "visible";  
}

/*
PURPOSE: Helper function that creates load buttons displayed in the loadModal when Load button is clicked
INVOKED: Load button click
*/
function createLoadButtons(loadedSaved)
{
    //Check if already loaded docs
    if(!loadedSaved)
    {
        var db = firebase.firestore();
        var gameRef = db.collection("Games");
        var qr = gameRef.where("uid", "==", firebase.auth().currentUser.uid);

        //For each document on the queried list create button
        qr.get().then(function(docs)
        {
            //Create buttons to load saved match
            docs.forEach(function(doc)
            {
                var element = document.createElement("input");
                element.type = "button";
                element.value = doc.id;  //button name = saved filename
                element.className = "loadBtns";

                //Once the button is clicked, open dashboard with the loaded data
                element.onclick = function()
                { 
                    var queryString = "?load=" + element.value;
                    window.location.href = "../Dashboard" + queryString;
                };

                //Add created buttons to the loadedModal
                $(".loadContent").append(element);
            });
        }).then(function()
        {
            //Once buttons are created -> show modal
            $("#loadModal").show();
        });
    }
    //If already created buttons -> just show the loadedModal
    else $("#loadModal").show();
}

/*
Function responsible to closing the loadModal 
TODO: Change to it closes the menu modal as well (once its done)
*/
window.onclick = function(evt)
{
    var modal = document.getElementById("loadModal");
    if(evt.target == modal)
    {
        modal.style.display = 'none';
    }
}