// creates game grid
function createTable(id, pre) {
	var table = document.createElement('table');
	table.id = id;
	var tr = document.createElement('tr');
	var th = document.createElement('th');
	th.className = 'diagonal';
	tr.appendChild(th);
	for (var i=0; i<10; i++) {
		var th = document.createElement('th');
		th.className = 'vertical';
		th.innerHTML = i + 1;
		tr.appendChild(th);
	}
	table.appendChild(tr);
	for (var i=0; i<10; i++) {
		var tr = document.createElement('tr');
		var th = document.createElement('th');
		th.className = 'horizonal';
		th.innerHTML = String.fromCharCode(i + 65);
		tr.appendChild(th);
		for (var j=0; j<10; j++) {
			var td = document.createElement('td');
			td.id = pre + String.fromCharCode(i + 65) + "-" + (j + 1);
			td.className = pre + 'col' + (j + 1);
			var div = document.createElement('div');
			tr.appendChild(td);
		};
		table.appendChild(tr);
	};
	return table;
};

// call grid in the beginning
$(document).ready(function() {
	$(createTable('player', '')).insertBefore('#ship-wrapper');
});

// hover columns and rows
$(document).ready(function() {
	var columnNumber;
	$('body').on('mouseenter', 'td', function() {
		$(this).siblings().addClass('hover');
		columnNumber = $(this).attr('class');
		$("." + columnNumber).addClass('hover');
	});
	$('body').on('mouseleave', 'td', function() {
		$(this).siblings().removeClass('hover');
		$("." + columnNumber).removeClass('hover');
	});
});