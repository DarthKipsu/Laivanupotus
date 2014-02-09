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
	if (priorityTargetsArray.length > 0) {
		var randomPrioritySelector = Math.floor(Math.random()*priorityTargetsArray.length);
		var priorityTargetId = priorityTargetsArray[randomPrioritySelector];
		var priorityObject = $(priorityTargetId); // middle phase to get the priorityTarget
		var priorityTarget = priorityObject[0];
		var ifHit = $(priorityTarget).data('hasShip');
		if (ifHit == 2) {
			console.log('second 1')
			var tdLetter1 = String.fromCharCode(priorityTargetId.substring(0,1).charCodeAt(0) - 1);
			var tdLetter = priorityTargetId.substring(0,1);
			var tdLetter2 = String.fromCharCode(priorityTargetId.substring(0,1).charCodeAt(0) + 1);
			var tdNumber = parseInt(priorityTargetId.substring(2,4), 10);

			console.log('second 2')
			var targetShip = priorityTarget.firstChild
			var targetClass = priorityTarget.firstChild.classList[0]
			var targetClassList = priorityTarget.firstChild.className
			var targetShipHit = new Image();
			targetShipHit.src = shipSrcArray[parseInt(targetClass.substring(4,5))] + targetClass.substring(6,7) + '_h.png';
			targetShipHit.className = targetClassList;
			var targetShipName = shipArray[parseInt(targetClass.substring(4,5))].name;

			console.log('second 3')
			$(targetShip).replaceWith(targetShipHit);

			if (targetClass.substring(4,5) == 0) {
				ship0 += 1;
				if (ship0 == 5) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + priorityTarget.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 1) {
				ship1 += 1;
				if (ship1 == 4) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + priorityTarget.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 2) {
				ship2 += 1;
				if (ship2 == 3) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + priorityTarget.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 3) {
				ship3 += 1;
				if (ship3 == 3) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + priorityTarget.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 4) {
				ship4 += 1;
				if (ship4 == 2) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + priorityTarget.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 5) {
				ship5 += 1;
				if (ship5 == 1) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + priorityTarget.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}

			console.log('second 4')
			if (tdLetter != 'A' && !priorityTarget.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter1 + '-' + tdNumber);
			}
			if (tdLetter != 'J' && !priorityTarget.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter2 + '-' + tdNumber);
			}
			if (tdNumber !== 1 && !priorityTarget.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter + '-' + (tdNumber - 1));
			}
			if (tdNumber !== 10 && !priorityTarget.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter + '-' + (tdNumber + 1));
			}
			$('#instructions').append(' Computer fires at ' + priorityTarget.id + " and hits your " +
				targetShipName + ". Your turn.")
		} else {
			$(priorityTarget).addClass('ai-no-hit');
			$('#instructions').append(' Computer fires at ' + priorityTarget.id + " which is a miss. Your turn.")
		}
	} else {
		var targetsArray = $('#player tr td:not(.ai-hit, .ai-no-hit)');
		var randomCellSelector = Math.floor(Math.random()*targetsArray.length);
		var targetCell = targetsArray.get(randomCellSelector); // attack this cell
		var targetId = targetCell.id;
		var ifHit = $(targetCell).data('hasShip');
		if (ifHit == 2) {
			var tdLetter1 = String.fromCharCode(targetId.substring(0,1).charCodeAt(0) - 1);
			var tdLetter = targetId.substring(0,1);
			var tdLetter2 = String.fromCharCode(targetId.substring(0,1).charCodeAt(0) + 1);
			var tdNumber = parseInt(targetId.substring(2,4), 10);

			var targetShip = targetCell.firstChild
			var targetClass = targetCell.firstChild.classList[0]
			var targetClassList = targetCell.firstChild.className
			var targetShipHit = new Image();
			targetShipHit.src = shipSrcArray[parseInt(targetClass.substring(4,5))] + targetClass.substring(6,7) + '_h.png';
			targetShipHit.className = targetClassList;
			var targetShipName = shipArray[parseInt(targetClass.substring(4,5))].name;

			$(targetShip).replaceWith(targetShipHit);

			if (targetClass.substring(4,5) == 0) {
				ship0 += 1;
				if (ship0 == 5) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + targetCell.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 1) {
				ship1 += 1;
				if (ship1 == 4) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + targetCell.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 2) {
				ship2 += 1;
				if (ship2 == 3) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + targetCell.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 3) {
				ship3 += 1;
				if (ship3 == 3) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + targetCell.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 4) {
				ship4 += 1;
				if (ship4 == 2) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + targetCell.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}
			if (targetClass.substring(4,5) == 5) {
				ship5 += 1;
				if (ship5 == 1) {
					// sink it
					priorityTargetsArray = [];
					$('#instructions').append(' Computer fires at ' + targetCell.id +
						" and sinks your " + targetShipName + ". Your turn.")
					turn = 'player'
					return;
				}
			}

			if (tdLetter != 'A' && !targetCell.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter1 + '-' + tdNumber);
			}
			if (tdLetter != 'J' && !targetCell.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter2 + '-' + tdNumber);
			}
			if (tdNumber !== 1 && !targetCell.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter + '-' + (tdNumber - 1));
			}
			if (tdNumber !== 10 && !targetCell.classList.contains('ai-hit', 'ai-no-hit')) {
				priorityTargetsArray.push('#' + tdLetter + '-' + (tdNumber + 1));
			}
			$('#instructions').append(' Computer fires at ' + targetCell.id + " and hits your " +
				targetShipName + ". Your turn.")
		} else {
			//miss
			$(targetCell).addClass('ai-no-hit');
			$('#instructions').append(' Computer fires at ' + targetCell.id + " which is a miss. Your turn.")
		};
	};
	turn = 'player'; // in gameplay.js
}