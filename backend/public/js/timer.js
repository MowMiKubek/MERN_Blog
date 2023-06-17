var runningTimer = 0;
var timeNow;
var endTime;
var currentScramble;
var sortedTimeList = new Array();

// Function that initializes timer
// Add Key listeners, load times, calculate stats and show scramble
function timerInit()
{
	$(window).keydown(event =>{
		if(event.code=="Space")
			event.preventDefault();
	});
	// change color to red after pressing space
	$(document).keydown(function() {
		if(event.code == "Space")
			$("#timer").css("color", "red");
	});
	// timer control after space release
	$(document).keyup(event => {
		// change color back to black
		$("#timer").css("color", "black");
		if(event.code == "Space"){
		if(runningTimer == 0){
			startTime = performance.now()
			runningTimer++;
			$("#timer").html("Solve");
		}
		else{
			endTime = performance.now()
			var result = Math.round((endTime - startTime)/10)/100;
			$("#timer").html(result.toFixed(2));
			runningTimer = 0;
			saveTime(result);
			currentScramble = getScramble();
			$("#scramble").html(currentScramble);
			console.log(sortedTimeList);
		}
	}});
	// load time list
	loadTimeList();
	// calculate stats
	updateStats(sessionStorage);
	// show scramble
	currentScramble = getScramble();
	$("#scramble").html(currentScramble);
}

// Save given time to storage, sorted array and add to visible list
function saveTime(time){
	lista = $("#timeList");
	payload = "<li><span>";
	payload += time.toFixed(2);
	payload += "</span></li>";
	lista.html(payload + lista.html());
	// add to storage and to time array
	// and make sure index is unique
	var newIndex = sortedTimeList.length;
	while(sessionStorage.getItem(newIndex))
		newIndex++;
	var nowdate = Date.now();
	// it's sorted by date descending, so newest time goes on the front
	sortedTimeList.unshift({id:newIndex, value:time, date:nowdate});
	console.log(sortedTimeList);
	addToStorage(sessionStorage, newIndex, time, nowdate);
}

// load time list from storage to viisble list and sort them by date in memory
function loadTimeList(){
	if(sessionStorage.length>0){
		lista = $("#timeList");
		sortedTimeList = sortSessionStorage().reverse();
		var payload = "";
		for(var i=0; i<sortedTimeList.length; i++){
			var time = sortedTimeList[i].value;
			payload += "<li><span>";
			payload += time.toFixed(2).toString();
			payload += "</span></li>\n";
		}
		lista.html(payload);
	}	
}

// Add given time and other data to storage in JSON format
function addToStorage(storage, newIndex, time, date){
	var record = {};
	record.time = time;
	record.scramble = currentScramble;
	record.date = date;
	storage.setItem(newIndex, JSON.stringify(record));
	updateStats(storage);
}

// Calculate stats from data stored in storage
function updateStats(storage){
	// Collecting data for overall stats
	if(storage.length>0){
		var best = 99999999;
		var worst = 0;
		var average = 0;
		for(var i=0; i<storage.length; i++){
			const key = storage.key(i);
			var time = JSON.parse(storage.getItem(key)).time;
			if(time<best)
				best = time;
			if(time>worst)
				worst = time;
			average += time;
		}
		average = Math.round(average * 100 / storage.length)/100;
		$("#timerBest").html(best.toFixed(2));
		$("#timerWor").html(worst.toFixed(2));
		$("#timerAvg").html(average.toFixed(2));
	
		//Median
		var median;
		var sortedTimeListByTime = new Array();
		for(let i=0; i<sortedTimeList.length; i++)
			sortedTimeListByTime.push(sortedTimeList[i].value);
		sortedTimeListByTime.sort();
		console.log(sortedTimeListByTime);
		if(sortedTimeListByTime.length%2==1){
			median = sortedTimeListByTime[Math.floor(sortedTimeListByTime.length/2)];
			console.log(sortedTimeListByTime[Math.floor(sortedTimeListByTime.length/2)]);
		}
		else{
			median = (
			sortedTimeListByTime[Math.floor(sortedTimeListByTime.length/2)]+
			sortedTimeListByTime[Math.floor(sortedTimeListByTime.length/2)-1])/2;
			console.log(sortedTimeListByTime[Math.floor(sortedTimeListByTime.length/2)]);
			console.log(sortedTimeListByTime[Math.floor(sortedTimeListByTime.length/2)-1]);
		}
		$("#timerMed").html(median.toFixed(2));
	}	
	// Ao5, Ao12 etc. 
	var calcAo = (count) => {
		if(storage.length >= count){
			worst = 0;
			best = 99999999;
			average = 0;
			for(var i=0; i<count; i++){
				var time = sortedTimeList[sortedTimeList.length-1-i].value;
				if(time<best)
					best = time;
				if(time>worst)
					worst = time;
				average += time;
				//console.log(time);
			}
			average -= worst;
			average -= best;
			average = Math.round(average * 100 / (count-2))/100;
			return average.toFixed(2);
		}
		return "---";
	}
	$("#timerAo5").html(calcAo(5));
	$("#timerAo12").html(calcAo(12));
	$("#timerAo50").html(calcAo(50));
	$("#timerAo100").html(calcAo(100));
}

// returns sorted time list by date from local storage
function sortSessionStorage(){
   if(sessionStorage.length > 0){
      var sessionStorageArray = new Array();
      for (i=0;i<sessionStorage.length;i++){
          sessionStorageArray[i] = {
			  id: sessionStorage.key(i),
			  value: JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).time,
			  date: JSON.parse(sessionStorage.getItem(sessionStorage.key(i))).date
		  };
      }
   }
   var sortedArray = sessionStorageArray.sort((a,b) => {
	   return a.date-b.date;
   });
   return sortedArray;
}

// Show info about time
function showTimeInfo(){
	var listIndex = prompt("Podaj numer czasu z listy: ");
	if(listIndex && Number.isInteger(parseInt(listIndex)) && listIndex >0 && listIndex <= sortedTimeList.length){
		var object = JSON.parse(sessionStorage.getItem(sortedTimeList[sortedTimeList.length-listIndex].id));
		var message = "";
		message += "Czas: " + object.time.toFixed(2) + '\n';
		message += "Data: " + Date(object.date) + '\n';
		message += "Scramble: " + object.scramble + '\n';
		alert(message);
	}
}

// validate given index and call removeTimeByIdOnList
function removeTime(){
	var listIndex = prompt("Podaj numer czasu z listy: ");
	/*if(listIndex && confirm("Czy chcesz usunąć czas " + sortedTimeList[sortedTimeList.length-listIndex].value + " o indeksie: " + listIndex.toString())){
		if(Number.isInteger(parseInt(listIndex)) && listIndex >0 && listIndex <= sortedTimeList.length){
			removeTimeByIdOnList(listIndex);
		}
		updateStats(sessionStorage);
	}*/
	if(listIndex && Number.isInteger(parseInt(listIndex)) && listIndex >0 && listIndex <= sortedTimeList.length){
		if(confirm("Czy chcesz usunąć czas " + sortedTimeList[sortedTimeList.length-parseInt(listIndex)].value + " o indeksie: " + listIndex.toString())){
				removeTimeByIdOnList(listIndex);
			updateStats(sessionStorage);
		}
	}
}

// remove time from list
function removeTimeByIdOnList(listIndex){
	// list index needs to be converted to index in Array
	var realIndex = sortedTimeList.length-listIndex;
	var id = sortedTimeList[realIndex].id;
	sessionStorage.removeItem(id);
	sortedTimeList = sortSessionStorage();
	loadTimeList();
	updateStats(sessionStorage);
}

// Clear stored data
function clearTimes(){
	if(confirm("Czy na pewno chcesz usunąć wszystkie czasy?")){
		sessionStorage.clear();
		location.reload();
	}
}

///////////////////////// SCRAMBLER////////////////////////
function getScramble()
{
	var options = ["F", "F2", "F'", "R", "R2", "R'", "U", "U2", "U'", "B", "B2", "B'", "L", "L2", "L'", "D", "D2", "D'"]
    var numOptions = [0, 1, 2, 3, 4, 5] // 0 = F, 1 = R, 2 = U, 3 = B, 4 = L, 5 = D
    var scramble = []
    var scrambleMoves = []
    var bad = true

    while (bad) {
        scramble = []
        for (var i = 0; i < 20; i++) {
            scramble.push(numOptions[getRandomInt(6)])
        }
        // check if moves directly next to each other involve the same letter
        for (var i = 0; i < 20 - 1; i++) {
            if (scramble[i] == scramble[i + 1]) {
                bad = true
                break
            } else {
                bad = false
            }
        }
    }
    // switch numbers to letters
    var move
    for (var i = 0; i < 20; i++) {
        switch (scramble[i]) {
            case 0:
                move = options[getRandomInt(3)] // 0,1,2
                scrambleMoves.push(move)
                break
            case 1:
                move = options[getRandomIntBetween(3, 6)] // 3,4,5
                scrambleMoves.push(move)
                break
            case 2:
                move = options[getRandomIntBetween(6, 9)] // 6,7,8
                scrambleMoves.push(move)
                break
            case 3:
                move = options[getRandomIntBetween(9, 12)] // 9,10,11
                scrambleMoves.push(move)
                break
            case 4:
                move = options[getRandomIntBetween(12, 15)] // 12,13,14
                scrambleMoves.push(move)
                break
            case 5:
                move = options[getRandomIntBetween(15, 18)] // 15,16,17
                scrambleMoves.push(move)
                break
        }
    }
    return scrambleMoves.join(" ");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) // returns up to max - 1
}

function getRandomIntBetween(min, max) { // return a number from min to max - 1. Ex. 3, 9 returns 3 - 8
    return Math.floor(Math.random() * (max - min) + min)
}