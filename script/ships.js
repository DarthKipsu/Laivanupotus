// Create Ship object
function Ship(name, intact, hit, sank, url) {
	this.name = name;
	this.intact = intact;
	this.hit = hit;
	this.sank = sank;
	this.url = url;
};

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
	carrierSankArray, 'ships/aircraft_carrier.png');
var battleship = new Ship('Battleship', battleshipArray, battleshipHitArray, 
	battleshipSankArray, 'ships/battleship.png');
var cruiser1 = new Ship('Cruiser', cruiserArray, cruiserHitArray, cruiserSankArray,
	'ships/cruiser.png');
var cruiser2 = new Ship('Cruiser', cruiserArray, cruiserHitArray, cruiserSankArray,
	'ships/cruiser.png');
var destroyer = new Ship('Destroyer', destroyerArray, destroyerHitArray, 
	destroyerSankArray, 'ships/destroyer.png');
var submarine = new Ship('Submarine', submarineArray, submarineHitArray, 
	submarineSankArray, 'ships/submarine.png');

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
		var image = new Image();
		image.src = shipArray[i].url;
		image.setAttribute('class', 'ship' + i);
		image.setAttribute('draggable', 'true');
		// add handledragstart function
		image.addEventListener('dragstart', handleDragStart, false);
		p.appendChild(image);
		pShipArray.push(p);
	};
	return pShipArray;
};

// call ships in the beginning
$(document).ready(function() {
	$('#ship-wrapper').append(shipImages());
});

// Drag & drop

// Make table droppable
$(document).ready(function() {
	var tds = document.querySelectorAll('td');
	Array.prototype.forEach.call(tds, function(td) { // get method from Array prototype
		td.addEventListener('dragenter', handleDragEnter, false)
		td.addEventListener('dragover', handleDragOver, false)
		td.addEventListener('dragleave', handleDragLeave, false)
		td.addEventListener('drop', handleDrop, false)
		td.addEventListener('drop', handleDragEnd, false)
	});
	// remove over class
	function handleDragEnd(event) {
		Array.prototype.forEach.call(tds, function(td) {
			td.classList.remove('over');
		});
	};
});

var dragSrcEl = null;

// Change opacity while dragging
function handleDragStart(event) {
	$(this).addClass('used');
	$(this).attr('draggable', 'false');
	dragSrcEl = this;
	event.dataTransfer.effectAllowed = 'copy'; // allow moving object
	event.dataTransfer.setData('image/png', this.outerHTML);
	var dragIcon = document.createElement('img');
	if ($(this).hasClass('ship0')) {
		dragIcon.src = 'ships/aircraft_carrier.png';
		event.dataTransfer.setDragImage(dragIcon, 77, 15);
	} else if ($(this).hasClass('ship1')) {
		dragIcon.src = 'ships/battleship.png';
		event.dataTransfer.setDragImage(dragIcon, 77, 15);
	} else if ($(this).hasClass('ship2') ||
			$(this).hasClass('ship3')) {
		dragIcon.src = 'ships/cruiser.png';
		event.dataTransfer.setDragImage(dragIcon, 46, 15);
	} else if ($(this).hasClass('ship4')) {
		dragIcon.src = 'ships/destroyer.png';
		event.dataTransfer.setDragImage(dragIcon, 46, 15);
	} else if ($(this).hasClass('ship5')) {
		dragIcon.src = 'ships/submarine.png';
		event.dataTransfer.setDragImage(dragIcon, 15, 15);
	};
};

// Remove used class if drop doesn't fit in the grid
document.addEventListener('dragend', function noDrop(event) {
	if (event.dataTransfer.dropEffect === 'copy') {
		console.log("drop success")
	} else {
			$(dragSrcEl).removeClass('used');
			$(dragSrcEl).attr('draggable', 'true');
			console.log("drop failed")
	}
});

function handleDragOver(event) {
	if (event.preventDefault) {
		event.preventDefault(); // Allow drop.
	}
	if (!$(this).hasClass('forbidden')) {
		event.dataTransfer.dropEffect = 'copy'; // move the object
	} else {
		event.dataTransfer.dropEffect = 'none'; // don't add ships to forbidden cells
	}
	return false;
};

// add over class to hover target
function handleDragEnter(event) {
	var tdId = $(this).prop('id');
	var tdNumber = parseInt(tdId.substring(2,3));
	var tdLetter = tdId.substring(0,2);
	if ($(dragSrcEl).hasClass('ship0')) {
		if (tdNumber <= 8 && tdNumber >= 3) {
			for (var i=0; i<5; i++) {
				var over = tdLetter + (tdNumber - 2 + i)
				$('#' + over).addClass('over');
			};
		} else {
			$(this).addClass('forbidden');
		}
	} else if ($(dragSrcEl).hasClass('ship1')) {
		if (tdNumber <= 9 && tdNumber >= 3) {
			for (var i=0; i<4; i++) {
				var over = tdLetter + (tdNumber - 2 + i)
				$('#' + over).addClass('over');
			};
		} else {
			$(this).addClass('forbidden');
		}
	} else if ($(dragSrcEl).hasClass('ship2') ||
			$(dragSrcEl).hasClass('ship3')) {
		if (tdNumber <= 9 && tdNumber >= 2) {
			for (var i=0; i<3; i++) {
				var over = tdLetter + (tdNumber - 1 + i)
				$('#' + over).addClass('over');
			};
		} else {
			$(this).addClass('forbidden');
		}
	} else if ($(dragSrcEl).hasClass('ship4')) {
		if (tdNumber >= 2) {
			for (var i=0; i<2; i++) {
				var over = tdLetter + (tdNumber - 1 + i)
				$('#' + over).addClass('over');
			};
		} else {
			$(this).addClass('forbidden');
		}
	} else {
		$(this).addClass('over');
	};
};

// remove over class
function handleDragLeave(event) {
	$(this).removeClass('over');
	$(this).siblings().removeClass('over');
	$(this).removeClass('forbidden');
};

// Drop the ship
function handleDrop(event) {
	if (event.stopPropagation) {
		event.stopPropagation(); // stops browser redirects
	}
	event.preventDefault(); // stops browser image dropping
	var tdId = $(this).prop('id');
	var tdNumber = parseInt(tdId.substring(2,3));
	var tdLetter = tdId.substring(0,2);
	for (var i=0; i<shipArray.length; i++) {
		if ($(dragSrcEl).hasClass('ship' + i)) {
			var arrayImages = shipArray[i].intact;
			var shipImages = [];
			for (var j=0; j<arrayImages.length; j++) {
				var image = new Image();
				image.src = arrayImages[j];
				image.setAttribute('class', 'ship' + i);
				image.setAttribute('draggable', 'false');
				image.onmousedown = function(event) {
					event.preventDefault();
					return false;
				};
				shipImages.push(image)
			};
			for (var j=0; j<arrayImages.length; j++) {
				if (arrayImages.length > 3) {
					$('#' + tdLetter + (tdNumber + (-2 + j))).append(shipImages[j]);
				} else if (arrayImages.length > 1) {
					$('#' + tdLetter + (tdNumber + (-1 + j))).append(shipImages[j]);
				} else {
					$('#' + tdLetter + (tdNumber + j)).append(shipImages[j]);
				}
			};
			console.log(shipImages)
		}
	};
	return false;
};