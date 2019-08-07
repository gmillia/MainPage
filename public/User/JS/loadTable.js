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

        //If there is nothing to load just show the content
        if(docs.size == 0) showContent();
        //Else load everything into the table first
        else
        {
            docs.forEach(function(doc)
            {
                var date = doc.data().date;
                createSaved(doc.id, doc_cnt, date);
                doc_cnt+=1;
            });
        }
    });
}

/*
PURPOSE: Add row with all the info to the Saved table (helper function)
INVOKED: From populateTable() for each individual file
*/
function createSaved(id, cnt, date)
{
    $("#loadTable").append($("<tr />", {id:"tr"+cnt}));  //create new row
    $("#tr"+cnt).append($("<td />", {id:"td"+cnt}));  //column for filename
    $("#tr"+cnt).append($("<td />", {id:"date"+cnt, text: date}));  //column for date saved
    //Create clickable link in the filename column
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

    $("#tr"+cnt).append($("<td />", {id:"rmv"+cnt, class:"remove"}));  //column for remove button
    $("#rmv"+cnt).append($("<li/>", 
    {
        id:id,
        text: "X",
        click: function()
        {
            var db = firebase.firestore();
            var gameRef = db.collection("Games");

            var filename = $("#td"+cnt).text();
            gameRef.doc(filename).delete().then(function()
            {
                $("#load").click();
            });
        },
    }));

    //Make content visible
    showContent();
}
