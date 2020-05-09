$(document).ready(function() {

	const ground = new Image();
	ground.src = "assets/ground.png";

	const apple = new Image();
	apple.src = "assets/food.png";

	const eat = new Audio();
	eat.src = "assets/eat.mp3";

	const dead = new Audio();
	dead.src = "assets/dead.mp3";

	const keyPress = new Audio ();
	keyPress.src = "assets/key.mp3";

	var canvas = $("canvas")[0];
	var ctx = canvas.getContext("2d");
	var playButton = $("#play-button")[0];
	var height = canvas.height;
	var width = canvas.width;
	var cw = 32; // Cell width
	var speed = 10; // initial speed
	var snake = [{x : Math.floor(Math.random()*17+1) * cw,
				y : Math.floor(Math.random()*17+1) * cw}]; // Array for Snake
	var rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
	var food;
	var keyPressed = "RIGHT"; 
	$(document).keydown(controller); // Add event listener for keyboard control
	createFood();
	setInterval(draw, 100)// Draw snake every 100 ms


	function draw(){
		// clear the canvas
		ctx.drawImage(ground, 0, 0);


		// draw food
		ctx.drawImage(apple, food.x, food.y);

	

		// Current Snake head position
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		// Remove the tail &/or Add a new head to simulate movement
		
		// draw Snake
		drawSnake();
	

		// Check the direction to change the head of snake
		if (keyPressed == "LEFT")	snakeX -= speed;
		if (keyPressed == "RIGHT")	snakeX += speed;
		if (keyPressed == "UP")		snakeY -= speed;
		if (keyPressed == "DOWN")	snakeY += speed;

		console.log("SnakeX, Snake y = " + snakeX + " " + snakeY );
		console.log ("Food x, food y = " + food.x + " " + food.y);
		// Check if snake eats food
		if (snakeX == food.x && snakeY == food.y){
			console.log("Food eaten");
			createFood(); // Create New Food
			eat.play();
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
		snake.unshift(newHead); // add a new head to new position


	}


	// Create food on the canvas
	function createFood() {
		food = {
			x : Math.floor(Math.random()*17+1) * 2 * cw,
			y : Math.floor(Math.random()*17+1) * 2 * cw
		}
	}
	

	// Draw the snake
	function drawSnake(){
		for (let i = 0; i < snake.length; i++){
		    ctx.fillStyle = (i == 0) ? "green" : rainbow[Math.floor(Math.random() * rainbow.length)];
			ctx.fillRect(snake[i].x, snake[i].y, cw, cw);
		}
	}


	// Handle Keylogs for controlling the snake
	function controller(event){

	  let key = event.which;

	  if(key == "37" && keyPressed != "RIGHT") 			//37: LEFT
		keyPressed = "LEFT";
	  else if(key == "38" && keyPressed != "DOWN") 		//38: UP
	  	keyPressed = "UP";
	  else if(key == "39" && keyPressed != "LEFT") 		//39: RIGHT
	  	keyPressed = "RIGHT";
	  else if(key == "40" && keyPressed != "UP") 		//40: DOWN
	  	keyPressed = "DOWN";
	  else
		console.log("User pressed invalid key");
		keyPress.play();
	}

})