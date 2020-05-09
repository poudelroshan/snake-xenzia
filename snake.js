$(document).ready(function() {

    
    const apple = new Image("assets/food.png");
  
    const eat = new Audio("assets/eat.mp3");

    const dead = new Audio("assets/dead.mp3");

    const up = new Audio("assets/up.mp3");

    const down = new Audio("assets/down.mp3");

    const left = new Audio("assets/left.mp3");

    const right = new Audio("assets/right.mp3");

    const error = new Audio("assets/error.mp3");


    var canvas = $("canvas")[0];
    var ctx = canvas.getContext("2d");
    var playButton = $("#play-button")[0];
    playButton.click(startGame);
    var height = canvas.height;
    var width = canvas.width;
    var cw = 10; // Cell width
    var speed = 10; // initial speed
    var snake = [randomPoints(), randomPoints()]; // Array for Snake, default length is 2
    var rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    var food;
    var keyPressed = "RIGHT";
    $(document).keydown(controller); // Add event listener for keyboard control
    
    function startGame(){
    	console.log("user pressed play");
    	createFood();
    	var	game = setInterval(draw, 100); // Draw snake every 100 ms	
    } 


    function draw() {
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);



        // draw food
        ctx.drawImage(apple, food.x, food.y, 15, 15);



        // Current Snake head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Remove the tail &/or Add a new head to simulate movement

        // draw Snake
        drawSnake();


        // Check the direction to change the head of snake
        if (keyPressed == "LEFT") snakeX -= speed;
        if (keyPressed == "RIGHT") snakeX += speed;
        if (keyPressed == "UP") snakeY -= speed;
        if (keyPressed == "DOWN") snakeY += speed;


        // Check if snake eats food
        if (snakeX == food.x && snakeY == food.y) {
            console.log("Food eaten");
            createFood(); // Create New Food
            eat.play();
        } else {
            // remove the tail
            snake.pop();
        }

        // Add a new Head
        let newHead = {
            x: snakeX,
            y: snakeY
        }
        checkCollision(newHead, snake);
        snake.unshift(newHead); // add a new head to new position
    }


    // Create food on the canvas
    function createFood() {
        food = randomPoints();
    }

    // function to create an object with random x and y coordinates
    function randomPoints() {
        let x = {
            x: Math.floor(Math.random() * 17 + 1) * cw,
            y: Math.floor(Math.random() * 15 + 3) * cw
        };
        return x;
    }

    // Draw the snake
    function drawSnake() {
        for (let i = 0; i < snake.length; i++) {
            ctx.beginPath();
            ctx.arc(snake[i].x, snake[i].y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = (i == 0) ? "white" : rainbow[Math.floor(Math.random() * rainbow.length)];
            ctx.fill();
        }
    }


    // Handle Keylogs for controlling the snake
    function controller(event) {

        let key = event.which;

        if (key == "37" && keyPressed != "RIGHT") { //37: LEFT
            keyPressed = "LEFT";
            left.play();
        } else if (key == "38" && keyPressed != "DOWN") { //38: UP
            keyPressed = "UP";
            up.play();
        } else if (key == "39" && keyPressed != "LEFT") { //39: RIGHT
            keyPressed = "RIGHT";
            right.play();
        } else if (key == "40" && keyPressed != "UP") { //40: DOWN
            keyPressed = "DOWN";
            down.play();
        } else {
            console.log("User pressed invalid key");
            error.play();
        }
    }

    // Check for suicide due to head touching snakes body
    function checkSuicide(head, array) {
        for (let i = 1; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    // Check for death by collision with walls or due to suicide
    function checkCollision(newHead, snake) {
    	let head = snake[0];
        if (head.x < cw || head.x > 17 * cw || head.y < 3 * cw || head.y > 17 * cw || checkSuicide(newHead, snake)) {
            clearInterval(game);
            dead.play();
        }


    }


})