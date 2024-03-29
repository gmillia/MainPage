/*
Illia Shershun

File cntrols the behavior of the Accunt (subpage) content, starting with the Account button click
*/

/*
PURPOSE: Control the behavior of the page once the Account button is clicked
INVOKED: On Account button click
*/
$(document).on('click', '#account', function()
{
    hideContent();
    $("#content").hide();
    $("#content").load("HTML/account.html").fadeIn(1000);

    $.when(
        loadUserInfo(),
    ).done(function()
    {
        $("#content").fadeIn(1000);
    });
});

/*
PURPOSE: Load used info before displaying the page
INVOKED: on inital page load when user clicks on account menu button
*/
function loadUserInfo()
{
    var db = firebase.firestore();
    var userRef = db.collection("Users");
    var userInfo = userRef.where("uid", "==", firebase.auth().currentUser.uid);

    userInfo.get().then(function(docs)
    {
        docs.forEach(function(doc)
        {
            var firstName = doc.data().firstName;
            var lastName = doc.data().lastName;

            $("#firstName")[0].innerHTML = firstName;  //display users firstName
            $("#lastName")[0].innerHTML = lastName;  //display users lastName
        });
    });

    showContent();  //display content
}

/*
PURPOSE: Hide content (hide content before everything on the page loads up)
INVOKED: When content needs to be hidden
*/
function hideContent()
{
    document.getElementById("content").style.visibility = "hidden";   
}

/*
PURPOSE: Show content (show content when everything on the page is loaded up)
INVOKED: When content needs to be shown
*/
function showContent()
{
    document.getElementById("content").style.visibility = "visible";
}