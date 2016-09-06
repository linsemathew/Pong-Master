var canvas;
var canvasContext;
var ballXCoordinate;
var ballXSpeed = 5;
var ballYCoordinate;
var ballYSpeed = 5;
var ballRadius = 10;
var leftPlayerY = 250;
var rightPlayerY = 250;
var leftPlayerScore = 0;
var rightPlayerScore = 0;
const WINNING_SCORE = 3;
const PADDLE_HEIGHT = 85;
const PADDLE_WIDTH = 10;

function computerMovement(){
	var rightPlayerYCenter = rightPlayerY + (PADDLE_HEIGHT / 2)
	if (ballYCoordinate - 35 <= rightPlayerYCenter){
		rightPlayerY -= 5;
	} else if (ballYCoordinate - 35 >= rightPlayerYCenter){
		rightPlayerY += 5;
	}
};

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
		computerMovement();
		drawOnCanvas();
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousemove', 
		function(event){
			var mousePos = mousePosition(event);
			leftPlayerY = mousePos.y - (PADDLE_HEIGHT / 2);
	});
};

function moveBall(){
	ballXCoordinate += ballXSpeed;
	ballYCoordinate += ballYSpeed;
	// Left paddle hits the ball
	if (ballYCoordinate < (leftPlayerY + PADDLE_HEIGHT) && ballYCoordinate > leftPlayerY && ballXCoordinate < 5 +PADDLE_WIDTH + ballRadius){
		ballXSpeed *= -1;
		var angle = ballYCoordinate - (leftPlayerY + (PADDLE_HEIGHT / 2))
		ballYSpeed = angle * .33

	// Right paddle hits the ball
	} else if (ballYCoordinate < (rightPlayerY + PADDLE_HEIGHT) && ballYCoordinate > rightPlayerY && ballXCoordinate > (canvas.width - 5 - PADDLE_WIDTH - ballRadius)){
		ballXSpeed *= -1;
		var angle = ballYCoordinate - (rightPlayerY + (PADDLE_HEIGHT / 2))
		ballYSpeed = angle * .33
	} else if (ballXCoordinate >= canvas.width - ballRadius){
		leftPlayerScore++;
		resetBallPosition();
 	} else if (ballXCoordinate <= ballRadius){
		rightPlayerScore++;
		resetBallPosition();
	};

	if (ballYCoordinate >= (canvas.height - ballRadius) || ballYCoordinate <= ballRadius){
		ballYSpeed *= -1;
	};
}

function drawOnCanvas(){
	// play area
	makeRect(0, 0, canvas.width, canvas.height, '#0E0024');

	// left player paddle
	makeRect(5, leftPlayerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// right player paddle
	makeRect((canvas.width - PADDLE_WIDTH - 5), rightPlayerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// ball
	makeBall(ballXCoordinate, ballYCoordinate, ballRadius, 'red');

	canvasContext.fillText(rightPlayerScore, canvas.width - 100, 10)

	canvasContext.fillText(leftPlayerScore, 100, 10)
}

function makeBall(xPosition, yPosition, radius, color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(xPosition, yPosition, radius, 0, Math.PI * 2, true);
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
	ballYSpeed = 5
}