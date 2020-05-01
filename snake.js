var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.querySelector("button");
ctx.fillRect(0, 0, canvas.width, canvas.height);


// Handles canvas color changing
var isBlack = true;
function changeColor() {
	if (isBlack){
		ctx.fillStyle = "purple";
	}
	else {
		ctx.fillStyle = "black";
	}
	isBlack = !isBlack;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// When user clicks play, change 'play' button text to 'restart'
function changeText(){
	if (button.textContent == "Play"){
		button.textContent = "Restart"
	}
}

// Handles button click
function buttonFunc(){
	changeColor();
	changeText();
}

button.addEventListener("click", buttonFunc);
