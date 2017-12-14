



var config = {
  ".chosen-select": {},
  ".chosen-select-deselect": {
    allow_single_deselect: true
  },
  ".chosen-select-no-single": {
    disable_search_threshold: 10
  },
  ".chosen-select-no-results": {
    no_results_text: "Oops, nothing found!"
  },
  ".chosen-select-width": {
    width: "95%"
  }
};

for (var selector in config) {
  $(selector).chosen(config[selector]);
}

// Capture the form inputs
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Form validation
  function validateForm() {
    var isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });

    $(".chosen-select").each(function() {

      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  // If all required fields are filled
  if (validateForm()) {
    // Create an object for the user"s data
    var userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    };

    // AJAX post the data to the friends API.
    $.post("/api/friends", userData, function(data) {

      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);

      // Show the modal with the best match
      $("#results-modal").modal("toggle");

    });
  } else {
    alert("Please fill out all fields before submitting!");
  }
});


//return all reservations that are currently on the waitlist
app.get("/api/waitlist", function(req, res) {
	//get all database info where successful reservation boolean is true
	connect.query("SELECT * FROM reservations WHERE on_res = FALSE", function(err, data){
		//notify user of error
		if (err) {
			console.log(err);
			res.json({ status: 500, msg: "Failure to retreive reservation data. Please try again."})
		}
		//create an array of JSON objects from the queried data
		var reference = [];
		for (i in data) {
			var temp = {
				reservation_id: data[i].res_id,
				name: data[i].name,
				phone_number: data[i].phone_num,
				email: data[i].email,
				party_size: data[i].party_size,
				time_reserved: data[i].on_res
			}
			reference.push(temp);
		}
		//push this data to the page
		res.json(reference);
	});
});