// create ships in an array
var shipArray = [];
shipArray[0] = 'ships/aircraft_carrier.png';
shipArray[1] = 'ships/battleship.png';
shipArray[2] = 'ships/cruiser.png';
shipArray[3] = 'ships/cruiser.png';
shipArray[4] = 'ships/destroyer.png';
shipArray[5] = 'ships/submarine.png';

var shipNames = ['Aircraft carrier: ', 'Battleship: ', 'Cruiser: ', 'Cruiser: ', 'Destroyer: ', 'Submarine: ']

function shipImages() {
	var pShipArray = [];
	for (var i=0; i<shipArray.length; i++) {
		var p = document.createElement('p');
		p.appendChild(document.createTextNode(shipNames[i]));
		var image = new Image();
		image.src = shipArray[i];
		p.appendChild(image);
		pShipArray.push(p);
	};
	return pShipArray;
};

// call ships in the beginning
$(document).ready(function() {
	$('#ship-wrapper').append(shipImages());
});