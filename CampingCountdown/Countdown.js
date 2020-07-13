var targetTime = new Date("2020/07/24").getTime();
var timeRemaining = 0;

function updateAnswer() {
  var divAnswer = document.getElementById("Answer");

  if(timeRemaining > 0){
    divAnswer.innerText = "No :(";
    divAnswer.style.color = "red";
  }
  else {
    divAnswer.innerText = "YES!";
    divAnswer.style.color = "limegreen";
  }

};

var countdownTimer = setInterval(function() {
  var now = new Date().getTime();

  timeRemaining = targetTime - now;

  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  var divTimer = document.getElementById("TimeLeft");
  divTimer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s Remaining";

  updateAnswer();

  if(timeRemaining < 0)
  {
    clearInterval(countdownTimer);
    divTimer.innerHTML = "PARTY TIME";
  }
}, 1000);
