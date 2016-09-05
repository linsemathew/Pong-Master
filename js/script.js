// var name = prompt("What is your name?")

var canvas;
var canvasContext;
var ballXCoordinate = 395;
var ballXSpeed = 5;
var ballYCoordinate = 395;
var ballYSpeed = 5;
var ballRadius = 10;
var leftPlayerPlayerY = 250;
const PADDLE_HEIGHT = 85;

function mousePosition(event){
	var rect = canvas.getBoundingClientRect();
	var page = document.documentElement;
	var mouseX = event.clientX - rect.left - page.scrollLeft;
	var mouseY = event.clientY - rect.top - page.scrollTop;

	return {
		x: mouseX,
		y: mouseY 
	};
};

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 30;

	setInterval(function(){
		moveBall();
		drawOnCanvas();
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousemove', 
		function(event){
			var mousePos = mousePosition(event);
			leftPlayerPlayerY = mousePos.y - (PADDLE_HEIGHT / 2);
	});
};

function moveBall(){
	ballXCoordinate += ballXSpeed;
	ballXSpeed += 0.01;
	ballYCoordinate += ballYSpeed;
	ballYSpeed += 0.01;

	if (ballXCoordinate >= (canvas.width - 5) || ballXCoordinate <= (ballRadius / 2)){
		ballXSpeed *= -1
	}

	if (ballYCoordinate >= (canvas.height - 5) || ballYCoordinate <= (ballRadius / 2)){
		ballYSpeed *= -1
	}
}

function drawOnCanvas(){
	// play area
	makeRect(0, 0, canvas.width, canvas.height, '#0E0024');

	// left player paddle
	makeRect(5, leftPlayerPlayerY, 10, PADDLE_HEIGHT, 'white');

	// right player paddle
	makeRect((canvas.width-15), 250, 10, PADDLE_HEIGHT, 'white');

	// ball
	makeBall(ballXCoordinate, ballYCoordinate, ballRadius, 'red')
}

function makeBall(xPosition, yPosition, radius, color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(xPosition, yPosition, radius, 0, Math.PI*2, true)
	canvasContext.fill();
}

function makeRect(xPosition, yPosition, width, height, color){
	canvasContext.fillStyle = color
	canvasContext.fillRect(xPosition, yPosition, width, height)
}