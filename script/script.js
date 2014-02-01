$(document).ready(function() {
	$('#game-starter').mouseenter(function() {
		$(this).addClass('hover');
	});
	$('#game-starter').mouseleave(function() {
		$(this).removeClass('hover');
	});
});