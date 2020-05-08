$(document).ready(function() {

	var canvas = $("canvas")[0];
	var ctx = canvas.getContext("2d");
	var playButton = $("#play-button")[0];
	var height = canvas.height;
	var width = canvas.width;
	var cw = 10; // Cell width
	var snake = [{x:100, y:100}]; // Array for Snake
	var direction = "RIGHT"; // Default direction of snake
	var food;
	var keyPressed = "RIGHT"; 
	$(document).keydown(controller); // Add event listener for keyboard control
	createFood();
	setInterval(draw, 100); // Draw snake every 100 ms


	function draw(){
		
		// draw food
		ctx.fillStyle = "yellow";
		ctx.fillRect(food.x, food.y, cw,cw);

	

		// Current Snake head position
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		// Remove the tail &/or Add a new head to simulate movement
		snake.pop();

		// draw Snake
		drawSnake();

		// Check the direction to change the head of snake
		if (direction == "LEFT")	snakeX -= cw;
		if (direction == "RIGHT")	snakeX += cw;
		if (direction == "UP")		snakeY -= cw;
		if (direction == "DOWN")	snakeY += cw;

		// Check if snake eats food
		if (snakeX == food.x && snakeY == food.y){
			createFood(); // Create New Food
		}
		else {
			// remove the tail
			snake.pop();
		}

		// Add a new Head
		let newHead = {
			x : snakeX,
			y : snakeY
		}
		snake.unshift(newHead);


	}


	// Create food on the canvas
	function createFood() {
		food = {
			x : Math.floor(Math.random() * (width - 30)),
			y : Math.floor(Math.random() * (height - 30))
		}
	}
	

	// Draw the snake
	function drawSnake(){
		for (let i = 0; i < snake.length; i++){
		    ctx.fillStyle = (i == 0) ? "green" : "blue"; // head is green, body is blue
			ctx.fillRect(snake[i].x, snake[i].y, cw, cw);
		}
	}


	// Handle Keylogs for controlling the snake
	function controller(event){

	  let key = event.which;

	  if(key == "37") 			//37: LEFT
		keyPressed = "LEFT";
	  else if(key == "38") 		//38: UP
	  	keyPressed = "UP";
	  else if(key == "39") 		//39: RIGHT
	  	keyPressed = "RIGHT";
	  else if(key == "40") 		//40: DOWN
	  	keyPressed = "DOWN";
	  else
		console.log("User pressed invalid key");
	}

})