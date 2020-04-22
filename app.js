var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var food_remain = 0;
var num_of_monsters = 0;
var timeToPlay = 0;
var extra_food = 2;
var pacman_right = true;
var pacman_left = false;
var pacman_up = false;
var pacman_down = false;




function myFunctionLogin() {
	$(document.getElementById("welcome")).hide();
	$(document.getElementById("about")).hide();
	$(document.getElementById("register")).hide();
	$(document.getElementById("login")).show();
}

function open_about() {
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function () {
		modal.style.display = "block";
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

/* 	document.keysDown = function (event) {
		event = event || window.event;
		var isEsc = false;

		if("key" in event){
			isEsc = (event.key === "Escape" || event.key === "Esc");
		}
		else{
			isEscape = (event.keyCode === 27);
		}
		if(isEsc){
			modal.style.display = "none";
		}

	} */
}

function showInput() {
	food_remain = $(document.getElementById("balls")).value;
	num_of_monsters = $(document.getElementById("monsters")).value;

}

function myFunction() {
	$('#welcome').css("display", "none");
	$(document.getElementById("about")).hide();
	$(document.getElementById("login")).hide();
	$(document.getElementById("register")).show();
	$("#register").show(300);
}


function startForNow(e){
	e.preventDefault();
	context = canvas.getContext("2d");
	Start();
	return false;
}


$(document).ready(function () {
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var pacman_remain = 1;
	if(food_remain == 0 && num_of_monsters == 0 && timeToPlay == 0){
	food_remain = parseInt($(document.getElementById("food")).val());
	num_of_monsters = parseInt($(document.getElementById("monsters")).val());
	timeToPlay = parseInt($(document.getElementById("lbltime")).val());
	}
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while(extra_food > 0){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 8;
		extra_food--;
	}

	while(num_of_monsters > 0){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 9;
		num_of_monsters--;
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up]) {
		return 1;
	}
	if (keysDown[down]) {
		return 2;
	}
	if (keysDown[left]) {
		return 3;
	}
	if (keysDown[right]) {
		return 4;
	}
}

function changeValueToKey(event) {
	//set key from event's id
	if(event.target.id == "#upId"){
		up = event.keyCode;
	}
	if(event.target.id == "#downId"){
		down = event.keyCode;
	}
	if(event.target.id == "#leftId"){
		left = event.keyCode;
	}
	if(event.target.id == "#rightId"){
		right = event.keyCode;
	}
  }

  function randomSetting(){
	while(food_remain < 50 || food_remain >90){
		  food_remain = parseInt(100 *Math.random());
	  }
	while(num_of_monsters < 1 || num_of_monsters > 4){
		num_of_monsters = parseInt(10 *Math.random());
	}
	while(timeToPlay < 60){
		timeToPlay = parseInt(100 * Math.random());
	}
	food.value = food_remain;
	monsters.value = num_of_monsters;
	lbltime.value = timeToPlay;
  }

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	var sprite = new Image();
	sprite.src = "image/monster.png";
	var burger = new Image();
	burger.src ="image/burger.png"
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 8) {
				context.drawImage(burger, center.x-25, center.y-25);
			} else if (board[i][j] == 9) {
				context.drawImage(sprite, center.x-20, center.y-20);
			} else if (board[i][j] == 2 && pacman_left == true) {
				context.beginPath();
				context.arc(center.x, center.y, 30, -0.85 * Math.PI, 0.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if(board[i][j] == 2 && pacman_up == true){
				context.beginPath();
				context.arc(center.x, center.y, 30, 1.7 * Math.PI, 1.35 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x+15, center.y+5, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if(board[i][j] == 2 && pacman_right == true){
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if(board[i][j] == 2 && pacman_down == true){
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.75 * Math.PI, 0.35 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x+15, center.y - 10, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		pacman_up= true;
		pacman_right = false;
		pacman_left= false;
		pacman_down = false;
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		pacman_down = true;
		pacman_left = false;
		pacman_up = false;
		pacman_right = false;
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		pacman_left = true;
		pacman_right = false;
		pacman_up = false;
		pacman_down = false;
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		pacman_right = true;
		pacman_left = false;
		pacman_up = false;
		pacman_down = false;
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	if(board[shape.i][shape.j] == 8){
		score = score + 10;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}else if(time_elapsed >= timeToPlay){
		time_elapsed = timeToPlay;
		lblTime.value = time_elapsed;
		window.clearInterval(interval);
		timePassed();
	}else{
		Draw();
	}
}

function timePassed() {
	setTimeout(function(){ alert("Time Passed"); }, timeToPlay);
  }

function open_login_window() {
	/* 	var btn = document.getElementById("myButton");
		if (btn.value == "Login") {
			btn.value = "Click To Close";
			btn.innerHTML = "Click To Close";
		}
		else {
			btn.value = "Login";
			btn.innerHTML = "Login";
		} */
	document.getElementById("Welcom_buttons").hidden = true;
	var x = document.getElementById("Login_button");
	if (x.style.display == "none") {
		x.style.display = "block";
	}
	else {
		x.style.display = "none";
	}
}

/* function press_on_about(){
	document.getElementById("register").hidden = true;
	document.getElementById("register").hide();
	("#welcome").css(display = "none");
	("#about").show(300);
}

function press_on_welcome(){
	document.getElementById("about").hidden = true;
	document.getElementById("register").hidden = true;
	document.getElementById("login").hidden = true;
	('#welcome').css(display =  "block");
} */

