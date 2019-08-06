/*
Illia Shershun

File controls the behavior of the Load menu (starting from the Load button click)
*/

/*
PURPOSE: Show Saved table when the Load button is clicked
INVOKED: On Load button click
*/
$(document).on('click', '#load', function()
{
    hideContent();
    $("#content").hide().load("HTML/loadTable.html");
    $('link[rel=stylesheet][href~="CSS/loadTable.css"]').attr('disabled', false);
    $.when(
        populateTable(),
    ).done(function()
    {
        $("#content").fadeIn(1000);
    });

});

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

/*
PURPOSE: Helper function that finds users saved games and puts them in the table
INVOKED: On the Load button click (helper)
*/
function populateTable()
{
    var db = firebase.firestore();
    var gameRef = db.collection("Games");
    var qr = gameRef.where("uid", "==", firebase.auth().currentUser.uid);

    //For each document on the queried list create button
    qr.get().then(function(docs)
    {
        //Create buttons to load saved match
        var doc_cnt = 0;
        docs.forEach(function(doc)
        {
            var date = doc.data().date;
            createSaved(doc.id, doc_cnt, date);
            doc_cnt+=1;
        });
    });
}

/*
PURPOSE: Add row with all the info to the Saved table (helper function)
INVOKED: From populateTable() for each individual file
*/
function createSaved(id, cnt, date)
{
    $("#loadTable").append($("<tr />", {id:"tr"+cnt}));
    $("#tr"+cnt).append($("<td />", {id:"td"+cnt}));
    $("#tr"+cnt).append($("<td />", {id:"date"+cnt, text: date}));
    //For link
    $("#td"+cnt).append($("<li/>", 
    {
        id:id,
        text: id,
        click: function()
        {
            var queryString = "?load=" + id;
            window.location.href = "../Dashboard" + queryString;
        }
    }));

    //Make content visible
    showContent();
}
