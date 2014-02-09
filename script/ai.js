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

function computerTurn() {
	var targetsArray = $('#player tr td:not(.ai-hit, .ai-no-hit)');
	var randomCellSelector = Math.floor(Math.random()*targetsArray.length);
	var targetCell = targetsArray.get(randomCellSelector); // attack this cell
	var ifHit = $(targetCell).data('hasShip');
	if (ifHit >= 1) {
		//hit
	} else {
		//miss
		$(targetCell).addClass('ai-no-hit');
		$('#instructions').append(' Computer hits ' + targetCell.id + " which is a miss. Your turn.")
	}
	turn = 'player';
	/*var randomLine = String.fromCharCode(Math.floor(Math.random()*10 + 65));
	var randomCell = Math.floor(Math.random()*10+1);
	console.log('#' + randomLine + "-" + randomCell)
	if ($('#' + randomLine + "-" + randomCell).hasClass('ai-hit') || $('#' + randomLine + "-" + randomCell).hasClass('ai-no-hit')) {
		console.log('hit twice the same');
		computerTurn();
	} else {
		console.log('hit');
		$('#' + randomLine + "-" + randomCell).addClass('ai-no-hit');
		turn = 'player'; // in gameplay.js
	}*/
}