$(document).ready(function() {

	var canvas = $("canvas")[0];
	var ctx = canvas.getContext("2d");
	var playButton = $("#play-button")[0];
	var height = canvas.height;
	var width = canvas.width;
	var cw = 15; // Cell width
	var snake = []; // Array for Snake
	var keyPressed = "RIGHT" // Default direction of snake
	setInterval(drawSnake, 100); // Draw snake every 100 ms



	function drawSnake() {
		snake = {
			x : Math.round(Math.random() * (width - cw)/cw),
			y : Math.round(Math.random() * (height - cw) / cw)
		}
	}
	

	function start(){
		if (keyPressed == "RIGHT")
			snake.x = snake.x + 1;
		else if (keyPressed == "LEFT")
			snake.x = snake.x - 1;
		else if (keyPressed == "UP")
			snake.y = snake.y - 1;
		else if (keyPressed == "DOWN")
			snake.y = snake.y + 1;
		else
			console.log("User pressed invalid key");
	}

	function createFood(){
		// Create food
	}


})