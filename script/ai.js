function aiShipPlacement() { // place ships on ai map
	for (var i=0; i<shipArray.length; i++) { // loop for all ships
		var shipImages = shipArray[i].intact;
		var shipLength = shipImages.length; // get length of each ship
		if (Math.random() >= 0.5) { // choose if ship goes horizonal
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
						$('#ai' + randomLine + "-" + (randomCell + j)).data('hasAiShip', (i+1));
					}
					placed = 1
				}
			}
		} else { // vertical
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
						$('#ai' + String.fromCharCode(randomLine + j) + "-" + randomCell).data('hasAiShip', (i+1));
					}
					placed = 1
				}
			}
		};
	};
};

var potentialTargetsArray = [];
var priorityTargetsArray = [];
var aiHitCout = 0;

function computerTurn() {
	priorityTargetsArray = [];
	for (var i=0; i<potentialTargetsArray.length; i++) {
		var target = potentialTargetsArray[i]
		if (target[0].classList.contains('ai-hit') || target[0].classList.contains('ai-no-hit')) {
				potentialTargetsArray.splice(i, 1);
		};
	};
	findStraights();
	/*if (priorityTargetsArray.length > 0) {
		aiHitAction(priorityTargetsArray);
	} else */if (potentialTargetsArray.length > 0) {
		aiHitAction(potentialTargetsArray);
	} else {
		var targetArray = $('#player tr td:not(.ai-hit, .ai-no-hit)');
		aiHitAction(targetArray)
	};
	if (aiScore == 6) {
		$('<p>Computer got all your ships! You\'ve lost!</p> \
			<p class="pointer" onclick="location.reload();">Play again?</p>').insertAfter('#instructions')
	} else {
		turn = 'player'
	}
}

function findStraights() {
	var aiHits = document.querySelectorAll('td.ai-hit:not(.sank)');
	if (aiHits.length >= 2) {
		var aiVerticalHits = [];
		var aiHorizonalHits = [];
		for (var i=0; i<aiHits.length; i++) {
			for (var j=0; j<aiHits.length; j++) {
				if (aiHits[i].id != aiHits[j].id && (aiHits[i].nextSibling == aiHits[j] ||
					aiHits[i].previousSibling == aiHits[j])) {
					aiHorizonalHits.push(aiHits[i]);
				};
			};
		};
		console.log(aiHorizonalHits);
		for (var i=0; i<aiHorizonalHits.length; i++) {
			var nextSibling = aiHorizonalHits[i].nextSibling;
			var previousSibling = aiHorizonalHits[i].previousSibling;
			if (nextSibling != null) {
				if (!nextSibling.classList.contains('ai-hit') && 
					!nextSibling.classList.contains('ai-no-hit')) priorityTargetsArray.push(nextSibling);
			};
			if (previousSibling.nodeName == 'TD') {
				if (!previousSibling.classList.contains('ai-hit') &&
					!previousSibling.classList.contains('ai-no-hit')) priorityTargetsArray.push(previousSibling);
			};
		};
		/*for (var i=0; i<aiHits.length; i++) {
			var nextSibling = aiHits[i].nextSibling;
			var previousSibling = aiHits[i].previousSibling;
			if (nextSibling != null) {
				if (!nextSibling.classList.contains('ai-hit') && 
					!nextSibling.classList.contains('ai-no-hit')) priorityTargetsArray.push(nextSibling);
			};
			if (previousSibling.nodeName == 'TD') {
				if (!previousSibling.classList.contains('ai-hit') &&
					!previousSibling.classList.contains('ai-no-hit')) priorityTargetsArray.push(previousSibling);
			};
		};*/
	};
	console.log(aiHits);
	console.log(priorityTargetsArray);
}

function aiHitAction(array) {
	var targetArray = array;
	var randomTargetSelector = Math.floor(Math.random()*targetArray.length); // randomize attack
	var targetCell = targetArray[randomTargetSelector]; // attack this cell
	if (targetArray == potentialTargetsArray) {
		var targetCell = targetCell[0];
	}
	console.log(targetCell)
	var targetId = targetCell.id;
	var ifHit = $(targetCell).data('hasShip');
	if (ifHit == 2) {
		aiHitCout += 1;
		//aiHitArray.push(targetCell);
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
		$(targetCell).addClass('ai-hit');

		var offset = $(targetCell).offset()
		$('.boom').css('left', (offset.left - 15));
		$('.boom').css('top', (offset.top - 15));
		$('.boom').show().delay(800).fadeOut(100);

		var shipNumber = targetClass.substring(4,5); // get ship id

		console.log(shipNumber)
		console.log(targetId)
		console.log(targetShip)
		console.log(targetShipName)
		if (aiSinkShip(targetCell, shipNumber, targetId, targetShip, targetShipName) == true) {
			return;
		}

		if (tdLetter != 'A') {
			var priorityObject = $('#' + tdLetter1 + '-' + tdNumber);
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				potentialTargetsArray.push(priorityObject);
			}
		}
		if (tdLetter != 'J') {
			var priorityObject = $('#' + tdLetter2 + '-' + tdNumber);
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				potentialTargetsArray.push(priorityObject);
			}
		}
		if (tdNumber !== 1) {
			var priorityObject = $('#' + tdLetter + '-' + (tdNumber - 1));
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				potentialTargetsArray.push(priorityObject);
			}
		}
		if (tdNumber !== 10) {
			var priorityObject = $('#' + tdLetter + '-' + (tdNumber + 1));
			if (!priorityObject.hasClass('ai-hit') ||
				!priorityObject.hasClass('ai-no-hit')) {
				potentialTargetsArray.push(priorityObject);
			}
		}
		$('#instructions').append(' Computer fires at ' + targetId + " and hits your " +
			targetShipName + ". Your turn.")
	} else {
		//miss
		$(targetCell).addClass('ai-no-hit');
		$('#instructions').append(' Computer fires at ' + targetId + " which is a miss. Your turn.")
	};
};

/*function aiParallelHit(targetArray) {
	var target0 = targetArray[0];
	var target1 = targetArray[1];
	var nextTarget1;
	var nextTarget2;
	if (target0.nextSibling == target1 || target0.previousSibling == target1) {
		console.log('hit the same line')
		var targetArraylength = targetArray.length;
		for (var i=0; i<targetArraylength; i++) {
			//console.log(targetArray[i].nextSibling)
			//console.log(targetArray[i].previousSibling)
			targetArray.push(targetArray[i].nextSibling);
			targetArray.push(targetArray[i].previousSibling);
		}
		for (var i=0; i<targetArray.length; i++) {
			if (targetArray[i].classList.contains('ai-hit') ||
				targetArray[i].classList.contains('ai-no-hit'))
				targetArray.splice(i--, 1);
		}
		console.log(targetArray);
		aiHitAction(targetArray);
	} else {
		console.log('hit the same column')
	}
}*/

function aiSinkShip(targetCell, shipNumber, targetId, targetShip, targetShipName) { // check if ship is sank
	for (var i=0; i<shipArray.length; i++) {
		if (shipNumber == i) {
			window['ship' + i] += 1; // adds hit to var shipX
			var shipImages = shipArray[i].intact;
			var shipLength = shipImages.length;
			if (window['ship' + i] == shipLength) {
				//sink it!
				$('#instructions').append(' Computer fires at ' + targetId +
					" and sinks your " + targetShipName + ". Your turn.")
				aiScore += 1;
				for (j=0; j<shipLength; j++) {
					var sankShip = new Image();
					sankShip.src = shipImages[j].substring(0,11) + '_s.png';
					sankShip.classList.add(targetShip.classList[1], 'ai-hit');
					$('.ship' + i + '_' + (j + 1)).closest('td').addClass('sank');
					$('.ship' + i + '_' + (j + 1)).replaceWith(sankShip);
				};
				//targetCell.classList.add('sank');
				$('#ship-' + shipNumber).addClass('overline');
				if (shipLength == aiHitCout) { // if no other ships were hit
					potentialTargetsArray = [];
					aiHitCout = 0;
				} else {
					aiHitCout = (aiHitCout - shipLength);
				}
				return true;
			} else {
				return false;
			}
		};
	};
}