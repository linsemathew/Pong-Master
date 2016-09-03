var name = prompt("What is your name?")

var canvas;
var canvasContext;

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = 'darkblue';
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
}