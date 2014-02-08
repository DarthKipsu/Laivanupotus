function aiShipPlacement () {
	// Aircraft carrier
	if (Math.random() >= 0.5) { // horizonal alignment
		console.log('ship 1 horizonal')
		var randomLine = String.fromCharCode(Math.floor(Math.random()*10+65));
		var randomCell = Math.floor(Math.random()*6+1);
		for (var i=0; i<5; i++) {
			$('#ai' + randomLine + "-" + (randomCell + i)).css('background-color', '#ffffff');
			$('#ai' + randomLine + "-" + (randomCell + i)).data('hasAiShip', 1);
		}
	} else { // vertical alignment
		console.log('ship 1 vertical')
		var randomLine = Math.floor(Math.random()*6+65);
		var randomCell = Math.floor(Math.random()*10+1);
		for (var i=0; i<5; i++) {
			$('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).css('background-color', '#ffffff');
			$('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).data('hasAiShip', 1);
		}
	};
	// Battleship
	if (Math.random() >= 0.5) {
		console.log('ship 2 horizonal')
		var placed = 0;
		while (placed <= 0) {
			var randomLine = String.fromCharCode(Math.floor(Math.random()*10+65));
			var randomCell = Math.floor(Math.random()*7+1);
			var hasAiShip = 0;
			for (var i=0; i<4; i++) {
				var aiShip = $('#ai' + randomLine + "-" + (randomCell + i)).data('hasAiShip');
				if (aiShip == 1) {
					hasAiShip += 1;
					console.log('second try ship 2')
					break;
				}
			}
			if (hasAiShip == 0) {
				for (var i=0; i<4; i++) {
					$('#ai' + randomLine + "-" + (randomCell + i)).css('background-color', '#22f2f2');
					$('#ai' + randomLine + "-" + (randomCell + i)).data('hasAiShip', 1);
				}
				placed = 1
			}
		}
	} else {
		console.log('ship 2 vertical')
		var placed = 0;
		while (placed <= 0) {
			var randomLine = Math.floor(Math.random()*7+65);
			var randomCell = Math.floor(Math.random()*10+1);
			var hasAiShip = 0;
			for (var i=0; i<4; i++) {
				var aiShip = $('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).data('hasAiShip');
				if (aiShip == 1) { 
					hasAiShip += 1;
					console.log('second try ship 2')
					break;
				}
			}
			if (hasAiShip == 0) {
				for (var i=0; i<4; i++) {
					$('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).css('background-color', '#22f2f2');
					$('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).data('hasAiShip', 1);
				}
				placed = 1
			}
		}
	};
}