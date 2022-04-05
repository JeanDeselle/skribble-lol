"use strict";
import champions from "./champions.js";
import { fillTabChamp } from "./api.js";

const ListChampions = JSON.parse(localStorage.getItem("championsLol"));
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = {
	player: [{ nam: "jean", points: "0" }],
	word: null,
	round: 0,
	roundMax: null,
};

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
	console.log(lastPosX, lastPosY, newPosX, newPosY);
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

function tools(touche, fonction) {
	const btn = document.querySelector(touche);
	btn.addEventListener("click", fonction);
}

function showLetter(word) {
	document.querySelector("#letter").innerHTML = ``;
	for (let i = 0; i < word.length; i++) {
		document.querySelector(
			"#letter"
		).innerHTML += `<div class="divider"></div>`;
	}
}

function gomme() {
	ctx.strokeStyle = "white";
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choiceWord() {
	for (let i = 1; i <= 3; i++) {
		const random = ListChampions[getRandomInteger(0, 159)];
		const div = document.createElement("div");
		const btn = document.createElement("button");
		const img = document.createElement("img");
		btn.textContent = random.name;
		img.src = random.url;
		div.append(img);
		div.append(btn);
		document.querySelector("#choice").append(div);
	}

	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.addEventListener("click", function (e) {
			// console.log(this.textContent);
			game.word = this.textContent;
			showLetter(this.textContent);
			document.querySelector("#choice").classList.add("display");
		});
	});
}

function initGame() {
	// invit player
	// random player order
}

function loopGame() {
	for (let i = 0; i < game.player.length; i++) {
		for (let j = 0; j < game.player.length; j++) {}
	}
}

function endGame() {}

function startGame() {
	initGame();
	loopGame();
	endGame();
}

window.addEventListener("DOMContentLoaded", (e) => {
	fillTabChamp();
	canvas.addEventListener("mousedown", (e) => {
		console.log(e.clientX, e.clientY);
		paint.drawNow = true;
		paint.lastPosX = e.clientX - canvas.offsetLeft;
		paint.lastPosY = e.clientY - canvas.offsetTop;
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

	const input = document.querySelector("#message");
	document.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && input.value) {
			let word = input.value;

			document.querySelector("#chat").innerHTML += "<p>" + word + "</p>";
			input.value = "";
			if (word === game.word) {
				console.log("GG");
				// round++;
			}
		}
	});

	const colors = document.querySelectorAll(".color");
	colors.forEach((color) => {
		const bcColor = color.classList[1];
		color.style.backgroundColor = bcColor;
		color.addEventListener("click", function (e) {
			setColor(bcColor);
		});
	});
	tools("#plus", bigThickness);
	tools("#moin", littleThickness);
	tools("#gomme", gomme);
	tools("#remove", clearAll);
	choiceWord();
});
