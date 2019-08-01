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
            loadSaved();
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
    function loadSaved()
    {
        //Step 1: grab data from the URL (if data was passed)
        var queryString = decodeURIComponent(window.location.search);
        var load = queryString.substring(1);
        
        //If loading was chosen
        if(load)
        {
            //Step 1: Split the passed string to contain name of the saved file
            load = load.split("=");
            load = load[1];

            //Step 2: query the saved file from firebase firestore
            const db = firebase.firestore();
            var gameRef = db.collection("Games");
            var qr = gameRef.where("uid", "==", firebase.auth().currentUser.uid);

            //Step 3: Get the document and set T1 and T2 to loaded vals
            var dc = gameRef.doc(load).get().then(function(doc)
            {
                var dt = doc.data();
                var t1 = Object.values(dt.t1);
                var t2 = Object.values(dt.t2);

                var ks = Object.keys(dt.t1);
                //console.log(ks);

                T1.loadFromSaved(t1);
                T2.loadFromSaved(t2);

            }).then(function()
            {
                //console.log("Done Loading");
                //console.log(1 + " blocked: " + T1.blockedShots);
                loadPage();  //start the page load in loadHeader
            });
        }
        else 
            loadPage();  //start the page load in loadHeader
    }
});
