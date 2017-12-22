// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");

// Global Sum Variable
var sum = [];
var diff = [];
var index;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req,res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have friends or not.
    // It will do this by sending out the value "true" have friends
   
    // Adding current user score sum to userScoresSum
    // Inserting Data into friendsData array
    var temp = 0;
    userScoresSum = 0;
    friendsData.push(req.body);
    for(var i=0; i<req.body.scores.length; i++)
      userScoresSum += parseInt(req.body.scores[i]);

    // getting friendsData sum in an array
    for(i=0; i<friendsData.length;i++){
      for(var j=0; j<friendsData[i].scores.length; j++){
        temp += parseInt(friendsData[i].scores[j]);
      }
      sum[i] = temp;
      temp = 0;
    }
    // Getting difference of Sum array and current user score
    for(i=0; i<sum.length-1; i++){
      diff[i] = Math.abs(userScoresSum - sum[i])
    }
    // getting the index of best macth in an array
    index = diff.indexOf(Math.min.apply(Math, diff));
    res.json(friendsData[index]);

    
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the survey while working with the functionality.
  

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];
    console.log(friendsData);
  });
};
