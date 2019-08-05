var loadedSaved = false;

$(document).on('click', '#load', function()
{
    $("#content").hide().load("HTML/loadTable.html");

    $('link[rel=stylesheet][href~="CSS/loadTable.css"]').attr('disabled', false);

    populateTable();
    loadedSaved = true;
    $("#content").fadeIn(1000);
});

function populateTable()
{
    if(true)
    {
        console.log("Not Loaded");
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
    loadedSaved = true;
}

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
}
