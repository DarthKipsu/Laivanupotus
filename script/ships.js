// create ships
function createShips() {
	var aircraftCarrier = document.createElement('img');
	aircraftCarrier.src = 'ships/aircraft_carrier.png';
	var battleship = document.createElement('img');
	battleship.src = 'ships/battleship.png';
	var battleship = document.createElement('img');
	battleship.src = 'ships/battleship.png';
	var cruiser = document.createElement('img');
	cruiser.src = 'ships/cruiser.png';
	var cruiser2 = document.createElement('img');
	cruiser2.src = 'ships/cruiser.png';
	var destroyer = document.createElement('img');
	destroyer.src = 'ships/destroyer.png';
	var submarine = document.createElement('img');
	submarine.src = 'ships/submarine.png';
	return [aircraftCarrier, battleship, cruiser, cruiser2, destroyer, submarine];
};

// call ships in the beginning
$(document).ready(function() {
	$('#ship-wrapper').append(createShips());
});