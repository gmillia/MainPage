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

            //Set session timeout, so the user is logged out automatically after some time
            user.getIdTokenResult().then((idTokenResult)=>
            {
                const authTime = idTokenResult.claims.auth_time * 1000;
                const sessionDuration = 1000 * 60 * 60 * 3; //1000*64 = ~1 minute expiration -> right now set for 3 hours
                const milsUntilExpiration = sessionDuration - (Date.now() - authTime);
                sessionTimeout = setTimeout(() => firebase.auth().signOut(), milsUntilExpiration);
            })

            $("#load").click();
            toDisplay();
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
    //window.location.href = "New Game";
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
    const auth = firebase.auth();
    const db = firebase.firestore();

    //Check the user type, if user has certain type-> display special options for him
    db.collection("Users").doc(auth.currentUser.uid).get().then(function(doc)
    {
        var userType = doc.data().type;

        /*
        if(userType == "Regular" || userType == "Premium")
        {
            console.log(userType);

            var load_li = document.createElement("li");
            load_li.id = "load";

            var load_span = document.createElement("span");
            load_span.innerHTML = "Load";

            load_li.append(load_span);
            
            $(".menu").append(load_li);
        }
        */

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
PURPOSE: change the font size of all the menu options
INVOKED: when any menu li is click
*/
$(document).on('click', 'li', function()
{
    $("ul").children().removeClass("btnselected");
    $(this).addClass('btnselected');
});