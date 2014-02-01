// Create Ship object
function Ship(name, intact, hit, sank) {
	this.name = name;
	this.intact = intact;
	this.hit = hit;
	this.sank = sank;
}

// Aircraft carrier images
var carrierArray = [
	'ships/carrier_1.png',
	'ships/carrier_2.png',
	'ships/carrier_3.png',
	'ships/carrier_4.png',
	'ships/carrier_5.png'
]
var carrierHitArray = [
	'ships/carrier_1_hit.png',
	'ships/carrier_2_hit.png',
	'ships/carrier_3_hit.png',
	'ships/carrier_4_hit.png',
	'ships/carrier_5_hit.png'
]
var carrierSankArray = [
	'ships/carrier_1_sank.png',
	'ships/carrier_2_sank.png',
	'ships/carrier_3_sank.png',
	'ships/carrier_4_sank.png',
	'ships/carrier_5_sank.png'
]

// Battleship images
var battleshipArray = [
	'ships/battleship_1.png',
	'ships/battleship_2.png',
	'ships/battleship_3.png',
	'ships/battleship_4.png'
]
var battleshipHitArray = [
	'ships/battleship_1_hit.png',
	'ships/battleship_2_hit.png',
	'ships/battleship_3_hit.png',
	'ships/battleship_4_hit.png'
]
var battleshipSankArray = [
	'ships/battleship_1_sank.png',
	'ships/battleship_2_sank.png',
	'ships/battleship_3_sank.png',
	'ships/battleship_4_sank.png'
]

// Cruiser images
var cruiserArray = [
	'ships/cruiser_1.png',
	'ships/cruiser_2.png',
	'ships/cruiser_3.png'
]
var cruiserHitArray = [
	'ships/cruiser_1_hit.png',
	'ships/cruiser_2_hit.png',
	'ships/cruiser_3_hit.png'
]
var cruiserSankArray = [
	'ships/cruiser_1_sank.png',
	'ships/cruiser_2_sank.png',
	'ships/cruiser_3_sank.png'
]

// Destroyer images
var destroyerArray = [
	'ships/destroyer_1.png',
	'ships/destroyer_2.png'
]
var destroyerHitArray = [
	'ships/destroyer_1_hit.png',
	'ships/destroyer_2_hit.png'
]
var destroyerSankArray = [
	'ships/destroyer_1_sank.png',
	'ships/destroyer_2_sank.png'
]

// Submarine images
var submarineArray = [
	'ships/submarine.png'
]
var submarineHitArray = [
	'ships/submarine_hit.png'
]
var submarineSankArray = [
	'ships/submarine_sank.png'
]

//Create the Ships
var aircraftCarrier = new Ship('Aircraft carrier', carrierArray, carrierHitArray,
	carrierSankArray);
var battleship = new Ship('Battleship', battleshipArray, battleshipHitArray, 
	battleshipSankArray);
var cruiser1 = new Ship('Cruiser', cruiserArray, cruiserHitArray, cruiserSankArray);
var cruiser2 = new Ship('Cruiser', cruiserArray, cruiserHitArray, cruiserSankArray);
var destroyer = new Ship('Destroyer', destroyerArray, destroyerHitArray, 
	destroyerSankArray);
var submarine = new Ship('Submarine', submarineArray, submarineHitArray, 
	submarineSankArray);

var shipArray = [aircraftCarrier, battleship, cruiser1, cruiser2, destroyer, submarine]

// Connect images with names inside p tags
function shipImages() {
	var pShipArray = [];
	for (var i=0; i<shipArray.length; i++) {
		var p = document.createElement('p');
		var ships = shipArray[i];
		p.appendChild(document.createTextNode(ships.name + ': '));
		var br = document.createElement('br');
		p.appendChild(br);
		var shipImages = ships.intact;
		for (var j=0; j<shipImages.length; j++) {
			var image = new Image();
			image.src = shipImages[j];
			p.appendChild(image);
		}
		pShipArray.push(p);
	}
	return pShipArray;
};

/*/ create ships in an array
var shipArray = [];
shipArray[0] = 'ships/aircraft_carrier.png';
shipArray[1] = 'ships/battleship.png';
shipArray[2] = 'ships/cruiser.png';
shipArray[3] = 'ships/cruiser.png';
shipArray[4] = 'ships/destroyer.png';
shipArray[5] = 'ships/submarine.png';

// Give ships names
var shipNames = [
	'Aircraft carrier: ', 
	'Battleship: ',
	 'Cruiser: ', 
	 'Cruiser: ', 
	 'Destroyer: ', 
	 'Submarine: ']

// Connect images with names inside p tags
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
*/

// call ships in the beginning
$(document).ready(function() {
	$('#ship-wrapper').append(shipImages());
});