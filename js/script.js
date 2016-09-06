// var name = prompt("What is your name?")

var canvas;
var canvasContext;
var ballXCoordinate;
var ballXSpeed = 5;
var ballYCoordinate;
var ballYSpeed = 5;
var ballRadius = 10;
var leftPlayerPlayerY = 250;
const PADDLE_HEIGHT = 85;
const PADDLE_WIDTH = 10;

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
	ballXCoordinate = canvas.width / 2;
	ballYCoordinate = canvas.height / 2;

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
	ballXCoordinate -= ballXSpeed;
	ballXSpeed += 0.01;
	ballYCoordinate -= ballYSpeed;
	ballYSpeed += 0.01;

	if (ballYCoordinate < (leftPlayerPlayerY + PADDLE_HEIGHT) && ballYCoordinate > leftPlayerPlayerY && ballXCoordinate <= (5 +PADDLE_WIDTH + ballRadius){
		ballXSpeed *= -1;
	} else if (ballXCoordinate >= (canvas.width - ballRadius){
		resetBallPosition();
	} else if (ballXCoordinate <= ballRadius){
		resetBallPosition();
	};

	if (ballYCoordinate >= (canvas.height - ballRadius) || ballYCoordinate <= ballRadius){
		ballYSpeed *= -1
	};
}

function drawOnCanvas(){
	// play area
	makeRect(0, 0, canvas.width, canvas.height, '#0E0024');

	// left player paddle
	makeRect(5, leftPlayerPlayerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// right player paddle
	makeRect((canvas.width - PADDLE_WIDTH - 5), rightPlayerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// ball
	makeBall(ballXCoordinate, ballYCoordinate, ballRadius, 'red');
}

function makeBall(xPosition, yPosition, radius, color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(xPosition, yPosition, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function makeRect(xPosition, yPosition, width, height, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(xPosition, yPosition, width, height);
}

function resetBallPosition(){
	ballYCoordinate = canvas.height / 2;
	ballXCoordinate = canvas.width / 2;
	ballXSpeed *= -1;
}