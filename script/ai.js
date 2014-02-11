function aiShipPlacement() { // place ships on ai map
	for (var i=0; i<shipArray.length; i++) { // loop for all ships
		var shipImages = shipArray[i].intact;
		var shipLength = shipImages.length; // get length of each ship
		if (Math.random() >= 0.5) { // choose if ship goes horizonal or vertical
			var placed = 0;
			while (placed <= 0) {
				var randomLine = String.fromCharCode(Math.floor(Math.random()*10 + 65));
				var randomCell = Math.floor(Math.random()*(11 - shipLength) + 1);
				var hasAiShip = 0;
				for (var j=0; j<shipLength; j++) {
					var aiShip = $('#ai' + randomLine + "-" + (randomCell + j)).data('hasAiShip');
					if (aiShip >= 1) {
						hasAiShip += 1;
						break;
					}
				}
				if (hasAiShip == 0) {
					for (var j=0; j<shipLength; j++) {
						//$('#ai' + randomLine + "-" + (randomCell + j)).css('background-color', '#ffffff');
						$('#ai' + randomLine + "-" + (randomCell + j)).data('hasAiShip', (i+1));
					}
					placed = 1
				}
			}
		} else {
			var placed = 0;
			while (placed <= 0) {
				var randomLine = Math.floor(Math.random()*(11 - shipLength) + 65);
				var randomCell = Math.floor(Math.random()*10+1);
				var hasAiShip = 0;
				for (var j=0; j<shipLength; j++) {
					var aiShip = $('#ai' + String.fromCharCode(randomLine + j) + "-" + randomCell).data('hasAiShip');
					if (aiShip >= 1) { 
						hasAiShip += 1;
						break;
					}
				}
				if (hasAiShip == 0) {
					for (var j=0; j<shipLength; j++) {
						//$('#ai' + String.fromCharCode(randomLine + j) + "-" + randomCell).css('background-color', '#ffffff');
						$('#ai' + String.fromCharCode(randomLine + j) + "-" + randomCell).data('hasAiShip', (i+1));
					}
					placed = 1
				}
			}
		};
	};
};

var priorityTargetsArray = [];

var ship0 = 0;
var ship1 = 0;
var ship2 = 0;
var ship3 = 0;
var ship4 = 0;
var ship5 = 0;

function computerTurn() {
	console.log(priorityTargetsArray);
	for (var i=0; i<priorityTargetsArray.length; i++) {
		var target = priorityTargetsArray[i]
		if (target[0].classList.contains('ai-hit') || target[0].classList.contains('ai-no-hit')) {
				priorityTargetsArray.splice(i, 1);
		};
	};
	console.log(priorityTargetsArray);
	if (priorityTargetsArray.length > 0) {
		aiHitAction(priorityTargetsArray);
	} else {
		var targetArray = $('#player tr td:not(.ai-hit, .ai-no-hit)');
		aiHitAction(targetArray)
	};
	turn = 'player'; // in gameplay.js
}

function aiHitAction(array) {
	console.log('phase 1');
	var targetArray = array;
	console.log(targetArray);
	var randomTargetSelector = Math.floor(Math.random()*targetArray.length); // randomize attack
	var targetCell = targetArray[randomTargetSelector]; // attack this cell
	var targetId = targetCell.id;
	if (targetArray == priorityTargetsArray) {
		var targetCell = targetCell[0];
		var targetId = targetCell.id;
	}
	console.log('targetId: ' + targetId)
	var ifHit = $(targetCell).data('hasShip');
	if (ifHit == 2) {
		var tdLetter1 = String.fromCharCode(targetId.substring(0,1).charCodeAt(0) - 1);
		var tdLetter = targetId.substring(0,1);
		var tdLetter2 = String.fromCharCode(targetId.substring(0,1).charCodeAt(0) + 1);
		var tdNumber = parseInt(targetId.substring(2,4), 10);
		console.log('phase 2');

		var targetShip = targetCell.firstChild
		var targetClass = targetCell.firstChild.classList[0]
		var targetClassList = targetCell.firstChild.className
		var targetShipHit = new Image();
		targetShipHit.src = shipSrcArray[parseInt(targetClass.substring(4,5))] + targetClass.substring(6,7) + '_h.png';
		targetShipHit.className = targetClassList;
		var targetShipName = shipArray[parseInt(targetClass.substring(4,5))].name;
		console.log(targetCell);
		console.log(targetShip);

		$(targetShip).replaceWith(targetShipHit);
		$(targetCell).addClass('ai-hit');
		console.log('phase 2.5');

		var shipNumber = targetClass.substring(4,5);

		if (shipNumber == 0) {
			ship0 += 1;
			if (ship0 == 5) {
				// sink it
				priorityTargetsArray = [];
				$('#instructions').append(' Computer fires at ' + targetId +
					" and sinks your " + targetShipName + ". Your turn.")
				turn = 'player'
				console.log('ship0 phase 4');
				return;
			}
		} else if (shipNumber == 1) {
			ship1 += 1;
			if (ship1 == 4) {
				// sink it
				priorityTargetsArray = [];
				$('#instructions').append(' Computer fires at ' + targetId +
					" and sinks your " + targetShipName + ". Your turn.")
				turn = 'player'
				console.log('ship1 phase 4');
				return;
			}
		} else if (shipNumber == 2) {
			ship2 += 1;
			if (ship2 == 3) {
				// sink it
				priorityTargetsArray = [];
				$('#instructions').append(' Computer fires at ' + targetId +
					" and sinks your " + targetShipName + ". Your turn.")
				turn = 'player'
				console.log('ship2 phase 4');
				return;
			}
		} else if (shipNumber == 3) {
			ship3 += 1;
			if (ship3 == 3) {
				// sink it
				priorityTargetsArray = [];
				$('#instructions').append(' Computer fires at ' + targetId +
					" and sinks your " + targetShipName + ". Your turn.")
				turn = 'player'
				console.log('ship3 phase 4');
				return;
			}
		} else if (shipNumber == 4) {
			ship4 += 1;
			if (ship4 == 2) {
				// sink it
				priorityTargetsArray = [];
				$('#instructions').append(' Computer fires at ' + targetId +
					" and sinks your " + targetShipName + ". Your turn.")
				turn = 'player'
				console.log('ship4 phase 4');
				return;
			}
		} else if (shipNumber == 5) {
			// sink it
			priorityTargetsArray = [];
			$('#instructions').append(' Computer fires at ' + targetId +
				" and sinks your " + targetShipName + ". Your turn.")
			turn = 'player'
			console.log('ship5 phase 4');
			return;
		}

		if (tdLetter != 'A') {
			var priorityObject = $('#' + tdLetter1 + '-' + tdNumber);
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				priorityTargetsArray.push(priorityObject);
			}
		}
		if (tdLetter != 'J') {
			var priorityObject = $('#' + tdLetter2 + '-' + tdNumber);
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				priorityTargetsArray.push(priorityObject);
			}
		}
		if (tdNumber !== 1) {
			var priorityObject = $('#' + tdLetter + '-' + (tdNumber - 1));
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				priorityTargetsArray.push(priorityObject);
			}
		}
		if (tdNumber !== 10) {
			var priorityObject = $('#' + tdLetter + '-' + (tdNumber + 1));
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				priorityTargetsArray.push(priorityObject);
			}
		}
		console.log('phase 3');
		$('#instructions').append(' Computer fires at ' + targetId + " and hits your " +
			targetShipName + ". Your turn.")
	} else {
		//miss
		$(targetCell).addClass('ai-no-hit');
		$('#instructions').append(' Computer fires at ' + targetId + " which is a miss. Your turn.")
	};
};