$(document).ready(function() {
	$('#game-starter, #rotate').mouseenter(function() {
		$(this).addClass('hover');
	});
	$('#game-starter, #rotate').mouseleave(function() {
		$(this).removeClass('hover');
	});
	$('#game-starter, #override').click(function() {
		if (placedShips == 6 || $(this).is('#override')) {
			$('#ship-wrapper, #rotate, #game-starter, #instructions').hide();
			$('#wrapper').css('width', '705')
			$(createTable('computer', "ai")).insertBefore('#player');
			aiShipPlacement();
			//$('<p>Computer | Player</p>').insertBefore('#wrapper');
		};
		console.log(placedShips);
	});
	$('#rotate').click(function() {
		if ($('p img').hasClass('rotate90')) {
			$('p img').removeClass('rotate90');
		} else {
			$('p img').addClass('rotate90');
		};
	});
});