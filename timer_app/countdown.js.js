var soundOnEnd = true;
var timerCount = 0;

// function checkTime(i){
	// if(i < 10){i = "0" + i};
	// if(i == 0 && i !== "00"){i = "00"};
	// return i;
// }

function createTimer(){
	var h = document.getElementById("hr").value;
	var m = document.getElementById("min").value;
	var s = document.getElementById("sec").value;
	
	var valid = checkInput(h, m, s);
	
	if(valid == 0){
		m = +m + Math.floor(s/60);
		s %= 60;
		h = +h + Math.floor(m / 60);
		m %= 60;
		var errorDiv = document.getElementById('errorMessage');
		errorDiv.innerHTML = "";
		var holderDiv = document.getElementById('timerTable');
		var i = 0;
		while (i < timerCount+1 && document.getElementById("timer"+i) != null){
			i++;
		}
		var newDiv = createDiv(i);
		holderDiv.appendChild(newDiv);
		countdown(i, h, m, s);
		timerCount++;
		document.getElementById("hr").value = 0;
		document.getElementById("min").value = 0;
		document.getElementById("sec").value = 0;
	} else {
		var errorDiv = document.getElementById('errorMessage');
		if(valid == 1){
			errorDiv.innerHTML = "Error: Hours out of range.";
		} else if(valid == 2){
			errorDiv.innerHTML = "Error: Minutes out of range.";
		} else if(valid == 3){
			errorDiv.innerHTML = "You must set at least a 1 second timer.";
		} else {
			errorDiv.innnerHTML = "Invalid time entry.";
		}
		document.getElementById("hr").value = 0;
		document.getElementById("min").value = 0;
		document.getElementById("sec").value = 0;
	}
}

function checkInput(h, m, s){
	var ret = -1; // -1 default state
	if(s > 0 && s <= 100000){
		if((h >= 0 && h <= 1000) && (m >= 0 && m <= 10000)){
			ret = 0;// valid state
		} else if(!(h >= 0 && h <= 1000)){
			ret = 1;// Hours out of range 
		} else if(!(m >= 0 && m <= 10000)){
			ret = 2;// Minutes out of range
		}
	}
	if(s == 0){
		if((h > 0 && h <= 1000) || (m > 0 && m <= 10000)){
			ret = 0;
		} else {
			ret = 3; // all zeros i think
		}
	}
	return ret;
}

function createDiv(index){
	var timerContainer = document.createElement("div");
	timerContainer.className = "ayyLmao";
	timerContainer.id = "timer"+index;
	return timerContainer;
}

function countdown(timerNum, hours, minutes, seconds){	
	var  timerDiv = document.getElementById("timer"+timerNum);
	
	var interval = setInterval(function(){
		if (seconds < 0){
			if (minutes == 0){
				if (hours == 0){
					clearInterval(interval);
					timerDiv.parentNode.removeChild(timerDiv);
					document.title = "0 sec";
					timerCount--;
					if(soundOnEnd){
						var audio = new Audio('time_up.mp3');
						audio.play();
					}
				} else {
					hours--;
					minutes = 59;
					seconds = 59;
				}
			} else {
				minutes--;
				seconds = 59;
			}
		}
		
		if (hours >= 0){
			var hour_text = hours + (hours > 1 ? ' hrs' : ' hr')
		} else {
			var hour_text = '';
		}
		
		if (minutes >= 0){
			var minute_text = minutes + (minutes > 1 ? ' mins' : ' min');
		} else {
			var minute_text = '';
		}
		
		var second_text = seconds > 1 ? 'secs' : 'sec';
		timerDiv.innerHTML = hour_text + ' ' +  minute_text + ' ' + (seconds) + ' ' + second_text + '';
		if(timerCount < 2 && seconds > 0){
			document.title = timerDiv.innerHTML;
		}else if(timerNum == 0 && seconds > 0){
			document.title = timerDiv.innerHTML;
		}
		seconds--;
	}, 1000);
}

function toggleMute(){
	soundOnEnd = !soundOnEnd;
	var iTag = document.getElementById("mute");
	if(soundOnEnd)
		iTag.className = "fa fa-volume-up";
	else{
		iTag.className = "fa fa-volume-off";
	}
}