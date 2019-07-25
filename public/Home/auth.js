$(document).ready(function()
{

    var firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appID: "app-id",
    };

    const auth = firebase.auth();
    const db = firebase.firestore();


    //whenever auth status changes
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
        console.log("logged out");
    }
    });
    //db.settings({ timestampsInSnapshots: true});

    $(".signInBtn").click(function()
    {
        $(".container").fadeIn(500);
        $(".container").addClass("vis");
        //console.log(auth);
        //console.log(db);

    });

    $(window).click(function(evt)
    {
        //console.log(evt.target.className);
        if($(".container").hasClass("vis") && (evt.target.className) == ("bgimg-1"))
        {
            $(".container").fadeOut(500);
        }
    }); 
    
    $("#signInBtnModal").click(function(e)
    {
        //console.log($("#signInEmail")[0].value);
        //console.log($("#signInPsw")[0].value);

        e.preventDefault();

        var email = $("#signInEmail")[0].value;
        var pswd = $("#signInPsw")[0].value;

        auth.signInWithEmailAndPassword(email, pswd).then(cred =>
        {
        $(".container").fadeOut(500);
        $("#signInForm")[0].reset();
        });
    });

    $("#signUpBtn").click(function(e)
    {
        //console.log($("#signUpEmail")[0].value);
        //console.log($("#signUpPsw")[0].value);
        e.preventDefault();

        var name = $("#signUpName")[0].value;
        var email = $("#signUpEmail")[0].value;
        var pswd = $("#signUpPsw")[0].value;

        //console.log(email);

        auth.createUserWithEmailAndPassword(email, pswd).then(cred =>
        {
        console.log(cred.user);
        $(".container").fadeOut(500);
        $("#signUpForm")[0].reset();
        });
    });
});
