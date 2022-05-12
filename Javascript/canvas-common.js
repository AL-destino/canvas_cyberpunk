/**********************************************
 * The Canvas
 * ==================================
 ***********************************************/

 let canvasReal = document.getElementById("canvas-real");
 let contextReal = canvasReal.getContext("2d");
 let canvasDraft = document.getElementById("canvas-draft");
 let contextDraft = canvasDraft.getContext("2d");
 let currentFunction;
 let dragging = false;
 
 $("#canvas-draft").mousedown(function (e) {
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   currentFunction.onMouseDown([mouseX, mouseY], e);
   dragging = true;
 });
 
 $("#canvas-draft").mousemove(function (e) {
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   if (dragging) {
     currentFunction.onDragging([mouseX, mouseY], e);
   }
   currentFunction.onMouseMove([mouseX, mouseY], e);
 });
 
 $("#canvas-draft").mouseup(function (e) {
   dragging = false;
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   currentFunction.onMouseUp([mouseX, mouseY], e);
 });
 
 $("#canvas-draft").mouseleave(function (e) {
   dragging = false;
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   currentFunction.onMouseLeave([mouseX, mouseY], e);
 });
 
 $("#canvas-draft").mouseenter(function (e) {
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   currentFunction.onMouseEnter([mouseX, mouseY], e);
 });
 
 /** # Class (all classes will have these methods) #
 /*  ====================== */
 class PaintFunction {
   constructor() {}
   onMouseDown() {}
   onDragging() {}
   onMouseMove() {}
   onMouseUp() {}
   onMouseLeave() {}
   onMouseEnter() {}
 }
 
var reset = document.getElementById("reset");
 function resetClick() {
	window.location.reload();
}
reset.addEventListener("click", resetClick);


var mouse = false;
contextDraft.lineJoin = "round";
contextDraft.lineCap = "round";
var positionX, positionY;

var brush = document.getElementById("brush");
var color = document.getElementById("myColor"); //Color

//Set initial color conditions 
var myColor = color.value;
contextDraft.strokeStyle = myColor;

var color = document.getElementById("myColor");
function colorChange() {
	myColor = color.value;
	contextDraft.strokeStyle = myColor;
}

function getCoordinates(canvasDraft, e) {
	var rect = canvasDraft.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function brushDraw(canvasDraft, positionX, positionY) {
	if(mouse) {
		contextDraft.lineTo(positionX, positionY);
		contextDraft.stroke();
		canvasDraft.style.cursor = "pointer";
	}
}

function brushDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvasDraft, e);
	canvasDraft.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	contextDraft.beginPath();
	contextDraft.moveTo(positionX, positionY);
	contextDraft.lineTo(positionX, positionY);
	contextDraft.stroke();
}

function brushMove(e) {
	var coordinates = getCoordinates(canvasDraft, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvasDraft, positionX, positionY);
}

function brushUp() {
	mouse = false;
	canvasDraft.style.cursor = "default";
}

function brushClick() {
	var brushColor = document.getElementById("myColor");
	contextDraft.strokeStyle = brushColor.value; 
	brush.style.border = "2px solid yellow";
	eraser.style.border = "none";
	
	canvasDraft.addEventListener("mousedown", brushDown, false); //bubble phase
	canvasDraft.addEventListener("mousemove", brushMove, false);
	canvasDraft.addEventListener("mouseup", brushUp, false);
}

brush.addEventListener("click", brushClick); //Brush click event 
color.addEventListener("change", colorChange); //Color change event 