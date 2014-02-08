function aiShipPlacement () {
	// Aircraft carrier
	if (Math.random() >= 0.5) { // horizonal alignment
		console.log('ship 1 horizonal')
		var randomLine = String.fromCharCode(Math.floor(Math.random()*10+65));
		var randomCell = Math.floor(Math.random()*6+1);
		for (var i=0; i<5; i++) {
			$('#ai' + randomLine + "-" + (randomCell + i)).css('background-color', '#ffffff');
			$('#ai' + randomLine + "-" + (randomCell + i)).data('hasAiShip', 1);
			console.log(randomLine + "-" + (randomCell + i))
		}
	} else { // vertical alignment
		console.log('ship 1 vertical')
		var randomLine = Math.floor(Math.random()*6+65);
		var randomCell = Math.floor(Math.random()*10+1);
		for (var i=0; i<5; i++) {
			$('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).css('background-color', '#ffffff');
			$('#ai' + String.fromCharCode(randomLine + i) + "-" + randomCell).data('hasAiShip', 1);
			console.log(String.fromCharCode(randomLine + i) + "-" + randomCell)
		}
	};
}