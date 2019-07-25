
$(document).ready(function()
{
    firebase.auth().onAuthStateChanged(user =>
    {
        var sessionTimeout = null;
        //Case 1: User is logged in
        if(user)
        {
            console.log("Logged in" + firebase.auth().currentUser);

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
            console.log("Logged out" + firebase.auth().currentUser);

            sessionTimeout && clearTimeout(sessionTimeout);
            sessionTimeout = null;

            //window.location = "index.html";
            window.location.href = ".."
            console.log(window.location);
        }
    });

    $('#newGame').click(function()
    {
        window.location.href = "../Dashboard";
    });

    //Sign user out when sign out button is clicked
    $("#signOut").click(function()
    {
        firebase.auth().signOut();
    });
});