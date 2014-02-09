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

function computerTurn() {
	if (priorityTargetsArray.length > 0) {
		var randomPrioritySelector = Math.floor(Math.random()*priorityTargetsArray.length);
		var priorityTarget = priorityTargetsArray[randomPrioritySelector];
		var ifHit = $(priorityTarget).data('hasShip');
		if (ifHit == 2) {
			//
		} else {
			$(targetCell).addClass('ai-no-hit');
			$('#instructions').append(' Computer hits ' + targetCell.id + " which is a miss. Your turn.")
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
			console.log(shipSrcArray[parseInt(targetClass.substring(4,5))] + targetClass.substring(6,7) + '_h.png')
			targetShipHit.src = shipSrcArray[parseInt(targetClass.substring(4,5))] + targetClass.substring(6,7) + '_h.png';
			targetShipHit.className = targetClassList;

			$(targetShip).replaceWith(targetShipHit);

			console.log(targetCell.firstChild.classList[0])
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
			console.log(priorityTargetsArray)
			console.log(targetCell.firstChild)
			$('#instructions').append(' Computer hits ' + targetCell.id + " and hits your xx. Your turn.")
		} else {
			//miss
			$(targetCell).addClass('ai-no-hit');
			$('#instructions').append(' Computer hits ' + targetCell.id + " which is a miss. Your turn.")
		};
	};
	turn = 'player'; // in gameplay.js
}