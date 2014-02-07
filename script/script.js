$(document).ready(function() {
	$('#game-starter, #rotate').mouseenter(function() {
		$(this).addClass('hover');
	});
	$('#game-starter, #rotate').mouseleave(function() {
		$(this).removeClass('hover');
	});
	$('#game-starter').click(function() {
		if (placedShips == 6) {
			$('#ship-wrapper, #rotate').hide();
			$('#wrapper').css('width', '705')
			$(createTable('player')).insertBefore('#player');
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