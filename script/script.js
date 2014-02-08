$(document).ready(function() {
	$('#game-starter, #rotate').mouseenter(function() {
		$(this).addClass('hover');
	});
	$('#game-starter, #rotate').mouseleave(function() {
		$(this).removeClass('hover');
	});
	$('#game-starter, #override').click(function() {
		if (placedShips == 6 || $(this).is('#override')) {
			$('#ship-wrapper, #rotate, #game-starter, #instructions, #override').hide();
			$('#wrapper').css('width', '705')
			$(createTable('computer', "ai")).insertBefore('#player');
			aiShipPlacement();
			$('<p id="player-first">Your turn. Place a bomb anywhere on the left grid by clicking on it.</p>').insertBefore('#wrapper');
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