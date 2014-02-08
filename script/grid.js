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
	$('body').on('mouseenter', 'td', function() {
		var columnId = $(this).prop('id');
		var columnNumber;
		if (columnId.length >= 5) {
			columnNumber = parseInt(columnId.substring(4,6)) + 1;
		} else {
			columnNumber = parseInt(columnId.substring(2,4)) + 1;
		}
		$(this).siblings().addClass('hover');
		$(this).closest('table').find('tr td:nth-child(' + columnNumber + ')').addClass('hover');
	});
	$('body').on('mouseleave', 'td', function() {
		var columnId = $(this).prop('id');
		var columnNumber;
		if (columnId.length >= 5) {
			columnNumber = parseInt(columnId.substring(4,6)) + 1;
		} else {
			columnNumber = parseInt(columnId.substring(2,4)) + 1;
		}
		$(this).siblings().removeClass('hover');
		$(this).closest('table').find('tr td:nth-child(' + columnNumber + ')').removeClass('hover');
	});
});