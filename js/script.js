// var name = prompt("What is your name?")

var canvas;
var canvasContext;
var xCoordinate = 50;
var backgroundColor = '#0E0024'

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(moveBallAndDrawOnCanvas, 1000 / framesPerSecond);
}

function moveBallAndDrawOnCanvas(){
	moveBall();
	drawOnCanvas();
}

function moveBall(){
	xCoordinate += 5
}

function drawOnCanvas(){
	canvasContext.fillStyle = backgroundColor;
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(5,100, 10, 75);
	canvasContext.fillStyle = 'while';
	canvasContext.fillRect(785, 100, 10, 75);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(xCoordinate,100,10,10);
}