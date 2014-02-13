var turn = 'computer';
var playerScore = 0;
var aiScore = 0;

var ship0 = 0;
var ship1 = 0;
var ship2 = 0;
var ship3 = 0;
var ship4 = 0;
var ship5 = 0;

var aiShip0 = 0;
var aiShip1 = 0;
var aiShip2 = 0;
var aiShip3 = 0;
var aiShip4 = 0;
var aiShip5 = 0;

document.addEventListener('click', function(event) {
	var el = event.target
	if ($(el).closest('#computer').length == 1 && turn == 'player' && el.nodeName == 'TD' &&
		!$(el).hasClass('no-hit') && !$(el).hasClass('hit')) {
		turn = 'computer'; // make it computers turn so player can't hit twice
		var aiShip = $(event.target).data('hasAiShip');
		if (aiShip >= 1) {
			$(event.target).addClass('hit');
			window['aiShip' + (aiShip - 1)] += 1;
			var shipImages = shipArray[aiShip - 1].intact;
			var shipLength = shipImages.length;
			if (window['aiShip' + (aiShip - 1)] == shipLength) {
				document.getElementById('instructions').innerHTML = "You sink computer " +
				shipArray[aiShip - 1].name + '!';
				$('#ai-ship-' + (aiShip - 1)).addClass('overline');
				playerScore += 1;
			} else {
				document.getElementById('instructions').innerHTML = "You hit!";
			};
			if (playerScore == 6) {
				$('<p>You got all the computer ships! Congratulations, you\'ve won!</p> \
				<p class="pointer" onclick="location.reload();">Play again?</p>').insertAfter('#instructions')
			} else {
				computerTurn(); // in ai.js
			};
		} else {
			$(event.target).addClass('no-hit');
			document.getElementById('instructions').innerHTML = "You miss.";
			computerTurn(); // in ai.js
		};
	};
});