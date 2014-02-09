var turn = 'computer';

document.addEventListener('click', function(event) {
	var el = event.target
	console.log(el)
	if ($(el).closest('#computer').length == 1 && turn == 'player' && el.nodeName == 'TD' &&
		!$(el).hasClass('no-hit') && !$(el).hasClass('hit')) {
		turn = 'computer'; // make it computers turn so player can't hit twice
		var aiShip = $(event.target).data('hasAiShip');
		if (aiShip >= 1) {
			$(event.target).addClass('hit');
			document.getElementById('instructions').innerHTML = "You hit!";
			computerTurn(); // in ai.js
		} else {
			$(event.target).addClass('no-hit');
			document.getElementById('instructions').innerHTML = "You miss.";
			computerTurn(); // in ai.js
		};
	};
});