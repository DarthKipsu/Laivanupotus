$(document).ready(function() {
	// hover columns and rows
	var columnNumber = 0;
	$('td').mouseenter(function() {
		$(this).siblings().addClass('hover');
		columnNumber = $(this).attr('class');
		$("." + columnNumber).addClass('hover');
	});
	$('td').mouseleave(function() {
		$(this).siblings().removeClass('hover');
		$("." + columnNumber).removeClass('hover');
	});
});