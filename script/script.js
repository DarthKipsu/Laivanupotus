$(document).ready(function() {
	$('#game-starter, #rotate').mouseenter(function() {
		$(this).addClass('hover');
	});
	$('#game-starter, #rotate').mouseleave(function() {
		$(this).removeClass('hover');
	});
	$('#game-starter, #override').click(function() {
		if (placedShips == 6 || $(this).is('#override')) {
			$('#ship-wrapper, #rotate, #game-starter, #override').hide();
			$('#wrapper').css('width', '705')
			$(createTable('computer', "ai")).insertBefore('#player');
			aiShipPlacement();
			document.getElementById('instructions').innerHTML = "Your turn. Place a bomb \
			anywhere on the left grid by clicking on it.";
			turn = 'player';
		};
	});
	$('#rotate').click(function() {
		if ($('p img').hasClass('rotate90')) {
			$('p img').removeClass('rotate90');
		} else {
			$('p img').addClass('rotate90');
		};
	});
});