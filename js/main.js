"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;
const paint = {
	drawNow: false,
	lastPosX: 0,
	lastPosY: 0,
	thickness: 2,
	lineColor: "black",
	newPosX: null,
	newPosY: null,
};

function draw(lastPosX, lastPosY, newPosX, newPosY) {
	// console.log(lastPosX, lastPosY, newPosX, newPosY);

	ctx.beginPath();
	ctx.moveTo(lastPosX, lastPosY);
	ctx.lineTo(newPosX, newPosY);
	ctx.closePath();
	ctx.stroke();
}

function setColor(color) {
	ctx.strokeStyle = color;
}

function bigThickness() {
	ctx.lineWidth++;
}

function littleThickness() {
	ctx.lineWidth--;
}

function clearAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function tools(touche,fonction) {
	const btn = document.querySelector(touche);
	btn.addEventListener("click", fonction);
}
function gomme() {
	ctx.strokeStyle = "white";
}
window.addEventListener("DOMContentLoaded", (e) => {
	canvas.addEventListener("mousedown", (e) => {
		paint.drawNow = true;
		paint.lastPosX = e.clientX - canvas.offsetLeft;
		paint.lastPosY = e.clientY;
	});

	canvas.addEventListener("mousemove", (e) => {
		if (paint.drawNow) {
			paint.newPosX = e.clientX - canvas.offsetLeft;
			paint.newPosY = e.clientY - canvas.offsetTop;

			draw(paint.lastPosX, paint.lastPosY, paint.newPosX, paint.newPosY);

			paint.lastPosX = paint.newPosX;
			paint.lastPosY = paint.newPosY;
		}
	});

	canvas.addEventListener("mouseup", (e) => {
		paint.drawNow = false;
		paint.lastPosX = 0;
		paint.lastPosY = 0;
		paint.newPosX = null;
		paint.newPosY = null;
	});

	const colors = document.querySelectorAll(".color");
	colors.forEach((color) => {
		const bcColor = color.classList[1];
		color.style.backgroundColor = bcColor;
		color.addEventListener("click", function (e) {
			setColor(bcColor)
		});
	});
	tools("#plus",bigThickness)
	tools("#moin",littleThickness)
	tools("#gomme",gomme)
	tools("#remove",clearAll)
});
