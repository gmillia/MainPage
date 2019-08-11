/*
Illia Shershun

File that controls the behavior of the Main page
*/

/*
Controls the behavior of the page once its loaded
*/
$(document).ready(function()
{
    //firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    /*
    PURPOSE: Display Sign In Modal
    INVOKED: On the Sign In button on the main page
    */
    $(".signInBtn").click(function()
    {
        $(".container").fadeIn(500);
        $(".container").addClass("vis");
    });

    /*
    PURPOSE: Close the modal on the click outside of the modal
    INVOKED: When user clicks outside the modal (when its open)
    */
    $(window).click(function(evt)
    {
        if($(".container").hasClass("vis") && (evt.target.className) == ("bgimg-1"))
        {
            $(".container").fadeOut(500);
        }
    }); 
    
    /*
    PURPOSE: Sign the user in
    INVOKED: On the click of Sign In button inside the signIn modal
    */
    $("#signInBtnModal").click(function(e)
    {
        e.preventDefault();

        var email = $("#signInEmail")[0].value;
        var pswd = $("#signInPsw")[0].value;

        auth.signInWithEmailAndPassword(email, pswd).then(function()
        {
            $(".container").fadeOut(500);
            $("#signInForm")[0].reset();
            window.location = 'User/';
        }).catch(function(error)
        {
            $("#signInError").show();
        });

    });

    /*
    PURPOSE: Sign user up (create new user)
    INVOKED: On the Sign Up button click (inside Sign In modal)
    */
    $("#signUpBtn").click(function(e)
    {
        e.preventDefault();

        var firstName = $("#signUpFirstName")[0].value;
        var lastName = $("#signUpLastName")[0].value;
        var email = $("#signUpEmail")[0].value;
        var pswd = $("#signUpPsw")[0].value;

        var nonEmpty = verifySignUpInfo(firstName, lastName, email, pswd);

        if(nonEmpty)
        {
            createAccount(firstName, lastName, email, pswd);
        }
    });

    /*
    PURPOSE: Helper function that creates new user account with user-supplied info
    INVOKED: When Sign Up button is clicked (helper function)
    */
    function createAccount(firstName, lastName, email, pswd)
    {
        auth.createUserWithEmailAndPassword(email, pswd).then(function()
        {
            firebase.auth().currentUser.sendEmailVerification();
            const auth = firebase.auth();
            var data = 
            {
                uid: auth.currentUser.uid,
                type: "Regular",
                firstName: firstName,
                lastName: lastName
            };

            const db = firebase.firestore();
            db.collection("Users").doc(auth.currentUser.uid).set(data).then(function()
            {
                $(".container").fadeOut(500);
                $("#signUpForm")[0].reset();
                window.location = 'User/';
            });
        }).catch(function(error)
        {
            if(error.code == "auth/email-already-in-use")
            {
                $("#emailInUseUp")[0].style.display = "flex";
            }
        });   
    }

    /*
    PURPOSE: Display error when user doesn't fill out all the info during sign-up
    INVOKED: When not all fields are filled out during sign-up
    */
    function verifySignUpInfo(firstName, lastName, email, pswd)
    {
        if(firstName == "" || lastName == "" || email == "" || pswd == "")
        {
            $("#signUpError")[0].style.display = "flex";
            return false;
        }
        return true;
    }
});
