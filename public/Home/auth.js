$(document).ready(function()
{
    const firebaseConfig = 
    {
        apiKey: "AIzaSyCedruI1MjG3M75uvIKawSrx4XKyx8HibE",
        authDomain: "soccer-stats-keeper.firebaseapp.com",
        databaseURL: "https://soccer-stats-keeper.firebaseio.com",
        projectId: "soccer-stats-keeper",
        storageBucket: "soccer-stats-keeper.appspot.com",
        messagingSenderId: "917015476956",
        appId: "1:917015476956:web:1ce9a2c655906550"
    };

    //firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();


    //whenever auth status changes
    /*
    auth.onAuthStateChanged(user =>
    {
        //case 1: user exists -> logged in
        if(user)
        {
            console.log("logged in");
            window.location = 'User/';

        }
        else
        {
            console.log("Logged out");
        }
    });
    */

    $(".signInBtn").click(function()
    {
        $(".container").fadeIn(500);
        $(".container").addClass("vis");
    });

    $(window).click(function(evt)
    {
        if($(".container").hasClass("vis") && (evt.target.className) == ("bgimg-1"))
        {
            $(".container").fadeOut(500);
        }
    }); 
    
    $("#signInBtnModal").click(function(e)
    {
        e.preventDefault();

        var email = $("#signInEmail")[0].value;
        var pswd = $("#signInPsw")[0].value;

        auth.signInWithEmailAndPassword(email, pswd).then(cred =>
        {
            $(".container").fadeOut(500);
            $("#signInForm")[0].reset();
        });

        window.location = 'User/';
    });

    $("#signUpBtn").click(function(e)
    {
        e.preventDefault();

        var name = $("#signUpName")[0].value;
        var email = $("#signUpEmail")[0].value;
        var pswd = $("#signUpPsw")[0].value;

        auth.createUserWithEmailAndPassword(email, pswd).then(function()
        {
            var data = 
            {
                type: "Regular"
            };

            const db = firebase.firestore();
            const auth = firebase.auth();
            db.collection("Users").doc(auth.currentUser.uid).set(data).then(function()
            {
                $(".container").fadeOut(500);
                $("#signUpForm")[0].reset();
                window.location = 'User/';
            });
    
            //console.log(db.collection("Users"));
        })
    });
});
