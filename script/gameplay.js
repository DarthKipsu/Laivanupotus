var turn = null;

document.addEventListener('click', function(event) {
	var el = event.target
	if ($(el).closest('#computer').length == 1 && turn == 'player' && el.nodeName == 'TD') {
		console.log(el)
		var aiShip = $(event.target).data('hasAiShip');
		if (aiShip >= 1) {
			$(event.target).addClass('hit');
		} else {
			$(event.target).addClass('no-hit');
		};
	};
});