/*
Illia Shershun

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
            //console.log("Logged in" + firebase.auth().currentUser);

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
            //console.log("Logged out" + firebase.auth().currentUser);

            sessionTimeout && clearTimeout(sessionTimeout);
            sessionTimeout = null;

            window.location.href = ".."
        }
    });

    /*
    Helper function that checks if load saved option was chosen, and if so
    loads the saved data

    TODO: display 404 page if trying to access file that doesnt exist, insted of opening Dashboard page
    */
    function loadUrl()
    {
        //Step 1: grab data from the URL (if data was passed)
        var queryString = decodeURIComponent(window.location.search);
        var url = queryString.split(/[?=&]/);
        console.log(url);
        //var job = url[1];
        
        if(url[1] == "homeTeam") createNewGame(url);
        else createSavedGame(url[2]);
    }

    function createNewGame(data)
    {
        T1.name = data[2];
        T2.name = data[4];
        timer.minutes = data[6];
        
        /*
        console.log($(".t1-name-input"));
        $(".t1-name-input")[0].value = homeName;
        $(".t2-name-input")[0].value = awayName;
        $(".timer-mins-input")[0].value = halfLength;
        $(".timer-secs-input")[0].value = "00";
        */

        loadPage();
    }

    function createSavedGame(filename)
    {
        //Step 2: query the saved file from firebase firestore
        const db = firebase.firestore();
        var gameRef = db.collection("Games");
        var qr = gameRef.where("uid", "==", firebase.auth().currentUser.uid);

        //Step 3: Get the document and set T1 and T2 to loaded vals
        gameRef.doc(filename).get().then(function(doc)
        {
            var dt = doc.data();
            var t1 = Object.values(dt.t1);
            var t2 = Object.values(dt.t2);

            //var ks = Object.keys(dt.t1);
            //console.log(ks);

            T1.loadFromSaved(t1);  //function from Team.js
            T2.loadFromSaved(t2);

        }).then(function()
        {
            loadPage();  //start the page load in loadHeader
        });
    }
    
});
