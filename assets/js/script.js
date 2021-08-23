// variable to store and loop through scheduler
var myDay = document.getElementById('.container'); 

// gets data for the header date
function getHeaderDate() {
  var currentHeaderDate = moment().format('dddd, MMMM Do');
  $("#currentDay").text(currentHeaderDate);
}

// saves data to localStorage

function saveReminders() {
  localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayReminders() {
  storedDay.forEach(function (_thisHour) {
      $(`#${_thisHour.id}`).val(_thisHour.reminder);
  })
}

// sets any existing localStorage data to the view if it exists
function init() {
  var storedDay = JSON.parse(localStorage.getItem("myDay"));

  if (storedDay) {
      myDay = storedDay;
  }

  saveReminders();
  displayReminders();
}

// loads header date
getHeaderDate();

// creates the visuals for the scheduler body

myDay.forEach(function(thisHour) {
  // creates timeblocks row
  var hourRow = $("<form>").attr({
      "class": "row time-block"
  });
  $(".container").append(hourRow);

  // creates time field
  var hourField = $("<div>")
      .text(`${thisHour.hour}${thisHour.meridiem}`)
      .attr({
          "class": "col-md-2 hour"
  });

  // creates schdeduler data
  var hourPlan = $("<div>")
      .attr({
          "class": "col-md-9 description"
      });
  var planData = $("<textarea>");
  hourPlan.append(planData);
  planData.attr("id", thisHour.id);
  if (thisHour.time < moment().format("HH")) {
      planData.attr ({
          "class": "past", 
      })
  } else if (thisHour.time === moment().format("HH")) {
      planData.attr({
          "class": "present"
      })
  } else if (thisHour.time > moment().format("HH")) {
      planData.attr({
          "class": "future"
      })
  }

  // creates save button
  var saveButton = $("<i class='fas fa-save'></i>")
  var savePlan = $("<button>")
      .attr({
          "class": "saveBtn col-md-1"
  });
  savePlan.append(saveButton);
  hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();

// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".description").children(".future").attr("id");
  myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
  console.log(saveIndex);
  saveReminders();
  displayReminders();
})