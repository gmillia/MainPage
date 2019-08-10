/*
Illia Shershun

File that controls the behavior of the Dashboard initial load
Makes sure user is logged in, sets timer to 3hrs (session time) checks if we are loading saved file or new game
*/

/*
Initial function that starts when DOM is ready
*/
$(document).ready(function()
{
    //Check if the user is logged in or logged out
    firebase.auth().onAuthStateChanged(user =>
    {
        var sessionTimeout = null;
        //Case 1: User is logged in
        if(user)
        {
            //Set session timeout, so the user is logged out automatically after some time
            user.getIdTokenResult().then((idTokenResult)=>
            {
                const authTime = idTokenResult.claims.auth_time * 1000;
                const sessionDuration = 1000 * 60 * 60 * 3; //1000*64 = ~1 minute expiration -> right now set for 3 hours
                const milsUntilExpiration = sessionDuration - (Date.now() - authTime);
                sessionTimeout = setTimeout(() => firebase.auth().signOut(), milsUntilExpiration);
            });

            //Checks if we are loading or creating new game
            loadUrl();
        }
        //Case 2: user is logged out
        else
        {
            sessionTimeout && clearTimeout(sessionTimeout);
            sessionTimeout = null;

            window.location.href = ".."
        }
    });

    /*
    PURPOSE: Helper function that checks if we are loading or creating new game
    INVOKED: On the Dashboard initial load
    TODO: display 404 page if trying to access file that doesnt exist, insted of opening Dashboard page
    */
    function loadUrl()
    {
        //Grab data from the URL (if data was passed)
        var queryString = decodeURIComponent(window.location.search);
        //Split url into substrings
        var url = queryString.split(/[?=&]/);
        
        //Case 1: we are creating new game
        if(url[1] == "homeTeam") createNewGame(url); 
        //Case 2: we are loading saved game
        else createSavedGame(url[2]);
    }

    /*
    PURPOSE: Helper function that creates new game from the passed data in the url (from new game menu)
    INVOKED: When we create new game
    */
    function createNewGame(data)
    {
        T1.name = data[2];
        T2.name = data[4];
        timer.minutes = data[6];

        loadPage();  //Display page once everything is loaded
    }

    /*
    PURPOSE: Helper function that loads game from the saved file on the server
    INVOKED: When we load the game
    */
    function createSavedGame(filename)
    {
        //Query the saved file from firebase firestore
        const db = firebase.firestore();
        var gameRef = db.collection("Games");

        //Get the document and set T1 and T2 to loaded vals
        gameRef.doc(filename).get().then(function(doc)
        {
            var dt = doc.data();
            var t1 = Object.values(dt.t1);  //creates list from the queried data
            var t2 = Object.values(dt.t2);

            //var ks = Object.keys(dt.t1);  //names of the fields in Team

            T1.loadFromSaved(t1);  //function from Team.js
            T2.loadFromSaved(t2);

        }).then(function()
        {
            loadPage();  //start the page load in loadHeader
        });
    }
});
