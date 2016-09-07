var canvas;
var canvasContext;
var ballXCoordinate;
var rules;
var ballXSpeed = 5;
var ballYCoordinate;
var ballYSpeed = 5;
var ballRadius = 10;
var leftPlayerY = 250;
var rightPlayerY = 250;
var leftPlayerScore = 0;
var rightPlayerScore = 0;
var winScreen = false;
const WINNING_SCORE = 3;
const PADDLE_HEIGHT = 85;
const PADDLE_WIDTH = 10;

function mouseClick(event){
	if(winScreen){
		leftPlayerScore = 0;
		rightPlayerScore = 0;
		winScreen = false;
	} else if (rules){
		rules = false;
	}
};

function computerMovement(){
	var rightPlayerYCenter = rightPlayerY + (PADDLE_HEIGHT / 2)
	if (ballYCoordinate - 35 <= rightPlayerYCenter){
		rightPlayerY -= 6;
	} else if (ballYCoordinate - 35 >= rightPlayerYCenter){
		rightPlayerY += 6;
	};
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
	rules = true;
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	ballXCoordinate = canvas.width / 2;
	ballYCoordinate = canvas.height / 2;

	var framesPerSecond = 30;

	setInterval(function(){
		moveBall();
		drawOnCanvas();
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', mouseClick);

	canvas.addEventListener('mousemove', 
		function(event){
			var mousePos = mousePosition(event);
			leftPlayerY = mousePos.y - (PADDLE_HEIGHT / 2);
	});
};

function moveBall(){
	if (winScreen){
		return 
	}

	if (rules){
		return 
	}

	computerMovement();

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

function drawNet(){
	for(var i=10; i < canvas.height; i+=20){
		makeRect((canvas.width / 2)- 1, i, 2, 5, 'white')
	};
};

function noticeStyle(color, font, align){
	canvasContext.fillStyle = color;
	canvasContext.font = font;
	canvasContext.textAlign = align;
};

function drawOnCanvas(){
	// play area
	makeRect(0, 0, canvas.width, canvas.height, '#0E0024');
	
	if (winScreen){
		canvasContext.fillStyle = 'white';
		canvasContext.font = '17px Arial';
		canvasContext.textAlign = 'center';
		if (leftPlayerScore >= WINNING_SCORE){
			canvasContext.fillText("You won!", (canvas.width / 2), 200);
		} else if (rightPlayerScore >= WINNING_SCORE){
			canvasContext.fillText("Computer wins!", (canvas.width / 2), 200);
		} 
			canvasContext.fillText("Click to play again.", (canvas.width / 2), 225);
			return
		} 

	if (rules){
		canvasContext.fillStyle = 'white';
		canvasContext.font = '18px Arial';
		canvasContext.textAlign = 'center';
		canvasContext.fillText("RULES", (canvas.width / 2), 85);
		canvasContext.textAlign = 'right';
		canvasContext.fillText("1. Move the paddle with your mouse.", (canvas.width / 2), 125);
		canvasContext.fillText("2. First to score 3 wins.", (canvas.width / 2), 145);
		canvasContext.fillText("3. You're on the left.", (canvas.width / 2), 165);
		canvasContext.textAlign = 'center';
		canvasContext.fillText("Click to play!", (canvas.width / 2), 205);
		return
	}

	drawNet();

	// left player paddle
	makeRect(5, leftPlayerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// right player paddle
	makeRect((canvas.width - PADDLE_WIDTH - 5), rightPlayerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

	// ball
	makeBall(ballXCoordinate, ballYCoordinate, ballRadius, 'red');
	canvasContext.font="15px Arial"
	canvasContext.fillText("Score: " + rightPlayerScore, canvas.width - 100, 20)
	canvasContext.fillText("Score: " + leftPlayerScore, 100, 20)
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
	if (leftPlayerScore >= WINNING_SCORE || rightPlayerScore >= WINNING_SCORE){
		winScreen = true; 
	}
	ballYCoordinate = canvas.height / 2;
	ballXCoordinate = canvas.width / 2;
	ballXSpeed *= -1;
	ballYSpeed = 5
}