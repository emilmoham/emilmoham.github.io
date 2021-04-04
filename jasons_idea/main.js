var crossValues = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
var crosses = [0, 0, 0, 0, 0];
var skippedTurns = 0;
var scoreTotals = [ 0, 0, 0, 0, 0, 0];


window.onload = function () {
	var buttonGroups = document.getElementsByClassName('colorGroup');
	var skipBoxes = document.getElementsByClassName('skip');
	
	for(i = 0; i < skipBoxes.length; i++){
		skipBoxes[i].checked = false;
		skipBoxes[i].addEventListener('click', skipTurn);
	}
	
	for (i = 0; i < buttonGroups.length; i++) {
		var buttons = buttonGroups[i].getElementsByTagName('button');
		for (j = 0; j < buttons.length; j++) {
			buttons[j].addEventListener('click', toggleCross);
		}
	}
	
	updateScoreBoxes();
}

function mapColorIdToIndex(colorId) {
	if(colorId == "red")
		return 0;
	else if(colorId == "yellow")
		return 1;
	else if (colorId == "green")
		return 2;
	else if (colorId == "blue")
		return 3;
	else 
		return -1;
}

function toggleCross() {
	var currentClasses = this.className;
	var colorIdIndex = mapColorIdToIndex(this.parentElement.id);
	if(currentClasses.search("selected") >= 0){
		crosses[colorIdIndex] -= 1;
		this.className = currentClasses.replace("selected", "").trim();
	} else {
		this.className += "selected";
		crosses[colorIdIndex] += 1;
	}
	
	updateScore(colorIdIndex);
}

function skipTurn() {
	var skipBoxes = document.getElementsByClassName('skip');
	var total = 0;
	for(i = 0; i < skipBoxes.length; i++){
		if(skipBoxes[i].checked)
			total += 1;
	}
	skippedTurns = total;
	updateScore(4);
	
}

function updateScore(colorIdIndex) {
	if(colorIdIndex < 0 || colorIdIndex > 5){
		console.log("Invalid colorIdIndex: " + colorIdIndex);
		return;
	}
	
	if(colorIdIndex <= 3)
		scoreTotals[colorIdIndex] = crossValues[crosses[colorIdIndex]];
	else 
		scoreTotals[colorIdIndex] = -5 * skippedTurns;
	
	var totalScore = 0;
	for(i = 0; i < scoreTotals.length - 1; i++)
		totalScore += scoreTotals[i];
	scoreTotals[scoreTotals.length -1] = totalScore;
	updateScoreBoxes();
	
}

function updateScoreBoxes(){
	scoreBoxes = document.getElementsByClassName('tbScore');
	if(scoreBoxes.length != scoreTotals.length)
		console.log("Unmatched score boxes and score totals array lengths");
	for(i = 0; i < scoreBoxes.length && i < scoreTotals.length; i++) {
		scoreBoxes[i].value = scoreTotals[i];
	}
}