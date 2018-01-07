// Initialize Firebase
let config = {
  apiKey: "AIzaSyCjkdE59wKrmZ3f-jhlHaUws6xxgAgUiRE",
  authDomain: "train-project-b3228.firebaseapp.com",
  databaseURL: "https://train-project-b3228.firebaseio.com",
  projectId: "train-project-b3228",
  storageBucket: "train-project-b3228.appspot.com",
  messagingSenderId: "927589049351"
};
firebase.initializeApp(config);

let database = firebase.database();

function log() {
  console.log("working");
};

let trainName = "";
let destinationName = "";
let trainTime = 0;
let trainFrequency = 0;

$("#submit").on("click", function(event) {
  event.preventDefault();
  trainName = $("#trainName").val().trim();
  destinationName = $("#destinationName").val().trim();
  trainTime = $("#time").val().trim();
  trainFrequency = $("#frequency").val().trim();
  database.ref().push({
    trainName: trainName,
    destinationName: destinationName,
    time: trainTime,
    frequency: trainFrequency,
    timeAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

database.ref().orderByChild("timeAdded").on("child_added", function(snapshot) {
  let sv = snapshot.val();
  $("#train").append("<tr><td>" + sv.trainName);
  $("#destination").append("<tr><td>" + sv.destinationName);
  $("#minutes").append("<tr><td>" + sv.frequency);
  let tFrequency = sv.frequency;
  let firstTime = sv.time
  let firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  let currentTime = moment();
  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  let tRemainder = diffTime % tFrequency;
  let tMinutesTillTrain = tFrequency - tRemainder;
  let nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm A');
  $("#nextArrival").append("<tr><td>" + nextTrain);
  $("#minutesAway").append("<tr><td>" + tMinutesTillTrain);
})

setInterval(function() {
  location.reload();
}, 60000)