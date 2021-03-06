// Create Ship object
function Ship(name, intact, url) {
	this.name = name;
	this.intact = intact;
	this.url = url;
};

// Aircraft carrier images
var carrierArray = [
	'ships/car_1.png',
	'ships/car_2.png',
	'ships/car_3.png',
	'ships/car_4.png',
	'ships/car_5.png'
]

// Battleship images
var battleshipArray = [
	'ships/bat_1.png',
	'ships/bat_2.png',
	'ships/bat_3.png',
	'ships/bat_4.png'
]

// Cruiser images
var cruiserArray = [
	'ships/cru_1.png',
	'ships/cru_2.png',
	'ships/cru_3.png'
]

// Destroyer images
var destroyerArray = [
	'ships/des_1.png',
	'ships/des_2.png'
]

// Submarine images
var submarineArray = [
	'ships/sub_1.png'
]

//Create the Ships
var aircraftCarrier = new Ship('Aircraft carrier', carrierArray, 'ships/aircraft_carrier.png');
var battleship = new Ship('Battleship', battleshipArray, 'ships/battleship.png');
var cruiser1 = new Ship('Cruiser', cruiserArray, 'ships/cruiser.png');
var cruiser2 = new Ship('Cruiser', cruiserArray, 'ships/cruiser.png');
var destroyer = new Ship('Destroyer', destroyerArray, 'ships/destroyer.png');
var submarine = new Ship('Submarine', submarineArray, 'ships/sub_1.png');

// ship objects in one array
var shipArray = [aircraftCarrier, battleship, cruiser1, cruiser2, destroyer, submarine]

// for changing ship hit and sank pictures
var shipSrcArray = ['ships/car_', 'ships/bat_', 'ships/cru_', 'ships/cru_', 'ships/des_', 'ships/sub_']

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
		image.setAttribute('class', 'ship' + i); // id the ships wth classes
		image.setAttribute('draggable', 'true'); // make them draggable
		// add handledragstart function:
		image.addEventListener('dragstart', handleDragStart, false);
		p.appendChild(image);
		pShipArray.push(p);
	};
	return pShipArray; // returns p with ship name and ship
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

// object that is being dragged
var dragObject = null;

function handleDragStart(event) {
	$(this).addClass('used'); // add class to fade the ship
	$(this).attr('draggable', 'false');
	this.onmousedown = function(event) { // makes the ship unselectable
		event.preventDefault();
		return false;
	};
	dragObject = this; // put dragged object into global variable dragObject
	event.dataTransfer.effectAllowed = 'move'; // allow moving object
	event.dataTransfer.setData('image/png', this.innerHTML);
	// add custom drag images, to control where the object is on grid
	var dragIcon = document.createElement('img');
	if ($(this).hasClass('ship0')) {
		if ($(this).hasClass('rotate90')) {
			dragIcon.src = 'ships/aircraft_carrier_rot.png';
			event.dataTransfer.setDragImage(dragIcon, 15, 77);
		} else {
			dragIcon.src = 'ships/aircraft_carrier.png';
			event.dataTransfer.setDragImage(dragIcon, 77, 15); // grap coordinates
		}
	} else if ($(this).hasClass('ship1')) {
		if ($(this).hasClass('rotate90')) {
			dragIcon.src = 'ships/battleship_rot.png';
			event.dataTransfer.setDragImage(dragIcon, 15, 77);
		} else {
			dragIcon.src = 'ships/battleship.png';
			event.dataTransfer.setDragImage(dragIcon, 77, 15);
		}
	} else if ($(this).hasClass('ship2') || $(this).hasClass('ship3')) {
		if ($(this).hasClass('rotate90')) {
			dragIcon.src = 'ships/cruiser_rot.png';
			event.dataTransfer.setDragImage(dragIcon, 15, 46);
		} else {
			dragIcon.src = 'ships/cruiser.png';
			event.dataTransfer.setDragImage(dragIcon, 46, 15);
		}
	} else if ($(this).hasClass('ship4')) {
		if ($(this).hasClass('rotate90')) {
			dragIcon.src = 'ships/destroyer_rot.png';
			event.dataTransfer.setDragImage(dragIcon, 15, 15);
		} else {
			dragIcon.src = 'ships/destroyer.png';
			event.dataTransfer.setDragImage(dragIcon, 46, 15);
		}
	} else if ($(this).hasClass('ship5')) {
		dragIcon.src = 'ships/sub_1.png';
		event.dataTransfer.setDragImage(dragIcon, 15, 15);
	};
};

// listen to dragend function
document.addEventListener('dragend', function noDrop(event) {
	if (event.dataTransfer.dropEffect === 'move') { //if drop successfull, ok
	} else { // if it didn't fit the grid, restore the ship to be placed again
			$(dragObject).removeClass('used');
			$(dragObject).attr('draggable', 'true');
			dragObject.onmousedown = function(event) {
				return true;
			};
	}
});

function handleDragEnter(event) {
	var tdId = $(this).prop('id'); // get id of the cell that's been hovered over
	var tdNumber = parseInt(tdId.substring(2,4)); // substring cell column
	var tdLetter = tdId.substring(0,2); // substring cell letter
	var letterHex = tdId.substring(0,1).charCodeAt(0); // transfrom the cell lette to Hex
	if ($(dragObject).hasClass('ship0')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (letterHex <= 72 && letterHex >= 67) { // add hover effect showing rotated ship position
				for (var i=0; i<5; i++) {
					var letterString = String.fromCharCode(letterHex - 2 + i) + '-';
					var over = letterString + tdNumber;
					$('#' + over).addClass('over');
				};
			} else {
				// restrict cells where part of the ship wouldn't fit the grid
				$(this).addClass('forbidden');
			}
		} else {
			if (tdNumber <= 8 && tdNumber >= 3) { // add hover effect showing ship position
				for (var i=0; i<5; i++) {
					var over = tdLetter + (tdNumber - 2 + i);
					$('#' + over).addClass('over');
				};
			} else {
				// restrict cells where part of the ship wouldn't fit the grid
				$(this).addClass('forbidden');
			}
		}
	} else if ($(dragObject).hasClass('ship1')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (letterHex <= 72 && letterHex >= 66) {
				for (var i=0; i<4; i++) {
					var letterString = String.fromCharCode(letterHex - 1 + i) + '-';
					var over = letterString + tdNumber;
					$('#' + over).addClass('over');
				};
			} else {
				$(this).addClass('forbidden');
			}
		} else {
			if (tdNumber <= 9 && tdNumber >= 3) {
				for (var i=0; i<4; i++) {
					var over = tdLetter + (tdNumber - 2 + i);
					$('#' + over).addClass('over');
				};
			} else {
				$(this).addClass('forbidden');
			}
		}
	} else if ($(dragObject).hasClass('ship2') ||
			$(dragObject).hasClass('ship3')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (letterHex <= 73 && letterHex >= 66) {
				for (var i=0; i<3; i++) {
					var letterString = String.fromCharCode(letterHex - 1 + i) + '-';
					var over = letterString + tdNumber;
					$('#' + over).addClass('over');
				};
			} else {
				$(this).addClass('forbidden');
			}
		} else {
			if (tdNumber <= 9 && tdNumber >= 2) {
				for (var i=0; i<3; i++) {
					var over = tdLetter + (tdNumber - 1 + i);
					$('#' + over).addClass('over');
				};
			} else {
				$(this).addClass('forbidden');
			}
		}
	} else if ($(dragObject).hasClass('ship4')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (letterHex <= 73 && letterHex >= 65) {
				for (var i=0; i<2; i++) {
					var letterString = String.fromCharCode(letterHex + i) + '-';
					var over = letterString + tdNumber;
					$('#' + over).addClass('over');
				};
			} else {
				$(this).addClass('forbidden');
			}
		} else {
			if (tdNumber >= 2) {
				for (var i=0; i<2; i++) {
					var over = tdLetter + (tdNumber - 1 + i);
					$('#' + over).addClass('over');
				};
			} else {
				$(this).addClass('forbidden');
			}
		}
	} else {
		$(this).addClass('over');
	};
};

// remove over and forbidden class when leaving cell
function handleDragLeave(event) {
	if ($(dragObject).hasClass('rotate90')) {
		var oldClass = $(this).prop('class').substring(0,5).trim();
		$('td.' + oldClass).removeClass('over');
	} else {
		$(this).siblings().andSelf().removeClass('over');
	}
	$(this).removeClass('forbidden');
};

function handleDragOver(event) { // when dragging over the grid
	if (event.preventDefault) {
		event.preventDefault(); // Allow drop.
	}
	// Don't allow ship placement on top of other ships or outside the grid
	var hasShip = $(this).data('hasShip');
	var hasRotShip = $(this).data('hasRotShip');
	if ($(dragObject).hasClass('ship0')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (hasRotShip < 9 && hasRotShip > 4 || hasShip == 2 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		} else {
			if (hasShip >= 0 && hasShip < 5 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	} else if ($(dragObject).hasClass('ship1')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (hasRotShip < 8 && hasRotShip > 4 || hasShip == 2 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		} else {
			if (hasShip > 0 && hasShip < 5 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	} else if ($(dragObject).hasClass('ship2') || $(dragObject).hasClass('ship3')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (hasRotShip < 8 && hasRotShip > 5 || hasShip == 2 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		} else {
			if (hasShip > 0 && hasShip < 4 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	} else if ($(dragObject).hasClass('ship4')) {
		if ($(dragObject).hasClass('rotate90')) {
			if (hasRotShip == 6 || hasShip == 2 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		} else {
			if (hasShip > 1 && hasShip < 4 || $(this).hasClass('forbidden')) {
				event.dataTransfer.dropEffect = 'none';
			} else {
				event.dataTransfer.dropEffect = 'move';
			}
		}
	} else {
		if (hasShip == 2 || $(this).hasClass('forbidden')) {
			event.dataTransfer.dropEffect = 'none';
		} else {
			event.dataTransfer.dropEffect = 'move';
		}
	}
	return false;
};

var placedShips = 0;

// Drop the ship
function handleDrop(event) {
	if (event.stopPropagation) {
		event.stopPropagation(); // stops browser redirects
	}
	event.preventDefault(); // stops browser image dropping
	placedShips += 1;
	var tdId = $(this).prop('id');
	var tdNumber = parseInt(tdId.substring(2,4));
	var tdLetter = tdId.substring(0,2);
	var letterHex = tdId.substring(0,1).charCodeAt(0);
	for (var i=0; i<shipArray.length; i++) { // take this to all the ships
		if ($(dragObject).hasClass('ship' + i)) { // select the ship being dragged
			var arrayImages = shipArray[i].intact;
			var shipImages = [];
			for (var j=0; j<arrayImages.length; j++) {
				var image = new Image();
				image.src = arrayImages[j];
				image.setAttribute('class', 'ship' + i + "_" + (j+1));
				if ($(dragObject).hasClass('rotate90')) {
					image.classList.add('rotate90');
				}
				image.onmousedown = function(event) { // pravent ship from being copied
					event.preventDefault();
					return false;
				};
				shipImages.push(image) // push ship parts into shipImages array
			};
			for (var j=0; j<arrayImages.length; j++) {
				var grapPos = 2; //how far the ship is grapped from the first image
				if (arrayImages.length == 1) grapPos = 0;
				else if (arrayImages.length < 4) grapPos = 1;
				var grapReach = 1; //how far the ship extends beyond grap
				if (arrayImages.length < 3) grapReach = 0;
				else if (arrayImages.length == 5) grapReach = 2;
				if ($(dragObject).hasClass('rotate90')) {
					var letterString = String.fromCharCode(letterHex + grapPos - j) + '-';
					$('#' + letterString + tdNumber).append(shipImages[j]);
					$('#' + letterString + tdNumber).data('hasShip', 2);
					// reserving space around the ships
					var hasRotShip5 = '#' + String.fromCharCode(letterHex - (grapReach + 2)) + '-' + tdNumber;
					var hasRotShip6 = '#' + String.fromCharCode(letterHex - (grapReach + 1)) + '-' + tdNumber;
					var hasRotShip7 = '#' + String.fromCharCode(letterHex + (grapPos + 1)) + '-' + tdNumber;
					var hasRotShip8 = '#' + String.fromCharCode(letterHex + (grapPos + 2)) + '-' + tdNumber;
					if (letterHex >= (67 + grapReach)) $(hasRotShip5).data('hasRotShip', 5);
					if (letterHex >= (66 + grapReach)) $(hasRotShip6).data('hasRotShip', 6);
					$(hasRotShip7).data('hasRotShip', 7);
					$(hasRotShip8).data('hasRotShip', 8);
					for (var k=0; k<arrayImages.length; k++) {
						var letterString = String.fromCharCode(letterHex - grapReach + k) + '-';
						if ($('#' + letterString + (tdNumber - 2)).data('hasShip') != 2)
							$('#' + letterString + (tdNumber - 2)).data('hasShip', 0);
						if ($('#' + letterString + (tdNumber - 1)).data('hasShip') != 2)
							$('#' + letterString + (tdNumber - 1)).data('hasShip', 1);
						if ($('#' + letterString + (tdNumber + 1)).data('hasShip') != 2)
							$('#' + letterString + (tdNumber + 1)).data('hasShip', 3);
						if ($('#' + letterString + (tdNumber + 2)).data('hasShip') != 2)
							$('#' + letterString + (tdNumber + 2)).data('hasShip', 4);
					};
				} else {
					$('#' + tdLetter + (tdNumber + (-grapPos + j))).append(shipImages[j]);
					$('#' + tdLetter + (tdNumber + (-grapPos + j))).data('hasShip', 2);
					// reserving space around ships
					if ($('#' + tdLetter + (tdNumber - grapPos - 2)).data('hasShip') != 2)
						$('#' + tdLetter + (tdNumber - grapPos - 2)).data('hasShip', 0);
					if ($('#' + tdLetter + (tdNumber - grapPos - 1)).data('hasShip') != 2)
						$('#' + tdLetter + (tdNumber - grapPos - 1)).data('hasShip', 1);
					if ($('#' + tdLetter + (tdNumber + grapReach + 1)).data('hasShip') != 2)
						$('#' + tdLetter + (tdNumber + grapReach + 1)).data('hasShip', 3);
					if ($('#' + tdLetter + (tdNumber + grapReach + 2)).data('hasShip') != 2)
						$('#' + tdLetter + (tdNumber + grapReach + 2)).data('hasShip', 4);
					if (letterHex >= 67) {for (var k=0; k<arrayImages.length; k++) {
						var letterString = String.fromCharCode(letterHex - 2) + '-';
						$('#' + letterString + (tdNumber + (- grapPos + j))).data('hasRotShip', 5);
					}};
					if (letterHex >= 66) {for (var k=0; k<arrayImages.length; k++) {
						var letterString = String.fromCharCode(letterHex - 1) + '-';
						$('#' + letterString + (tdNumber + (- grapPos + j))).data('hasRotShip', 6);
					}};
					for (var k=0; k<arrayImages.length; k++) {
						var letterString = String.fromCharCode(letterHex + 1) + '-';
						$('#' + letterString + (tdNumber + (- grapPos + j))).data('hasRotShip', 7);
					}
					for (var k=0; k<arrayImages.length; k++) {
						var letterString = String.fromCharCode(letterHex + 2) + '-';
						$('#' + letterString + (tdNumber + (- grapPos + j))).data('hasRotShip', 8);
					}
				}
			}
		}
	};
	return false;
};