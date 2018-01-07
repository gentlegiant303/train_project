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
  console.log(trainName);
  console.log(trainFrequency);

  database.ref().push({
    trainName: trainName,
    destinationName: destinationName,
    time: trainTime,
    frequency: trainFrequency
  });
});