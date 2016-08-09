var players = [
  {x : 190, y : 150, direction : 0,
   jump : 0, canJump : true, 
   lives : 100,
   doing : "stand",   
   points : 0,
   it : false,
   stopAJ : false,},
   
  {x : 1166, y : 150, direction : 0,
   jump : 0, canJump : true, 
   lives : 100, 
   doing : "stand", 
   points : 0,
   it : false,
   stopAJ : false,},
   
  {x :840, y : 150, direction : 0,
   jump : 0, canJump : true, 
   lives : 100, 
   doing : "stand", 
   points : 0,
   it : false,
   stopAJ : false,},
   
   2, //PLAYERS
   
]

var fps;

var game = {
	type : "punchL",
	mod : 0,
	anablePunch : true,
	newTextures : {
		ind : false,
        sprite : "", 
	},
	types : [
		{
			name : "Normal Fightig Game",
			description : "Fight against each other, play by losing health or gaining points",
			prepa : function() {
				if (game.mod != 0) {
					map.mod[game.types[game.mod].codeName] = recupCV;
				}
			},
			mod : function() {},
		},
		{
		    name : "TNT Run",
			description : "When you run on the blocks they fall, try not to fall. Fighting disabled",
			types : ["none"],
			codeName : "TNTRun",
			folders : {
               cc : new Array(),
			   newArray : function(a, b) {
				   var c = new Array();
				   c[0] = a;
				   c[1] = b;
				   return c;
			   }
			},
			prepa : function() {
				textures.TNT = new Image();
				textures.TNT.src = "Mods/TNTRun/TNT.png";
				Path[Path.length - 2][0] = textures.TNT;
			},
			mod : function(cond, player) {
				if (cond == "landed") {
					    var doIt = true;
						for (i = 1; i < Path.length - 1; i++) { 
							for (o = 1; o < Path[i].length; o++) {
							if (doIt == true) {	
									//alert(players[player].y + " || " + Path[i + 1][o][1]);
									if ((players[player].x >= Path[i][o][0] * pix && players[player].x <= (Path[i][o][0] + 1) * pix && players[player].y <= Path[i][o][1] * pix && players[player].y + pix >= (Path[i][o][1]) * pix)
										|| (Path[i][o][0] * pix >= players[player].x && (Path[i][o][0] + 1) * pix <= players[player].x + pix * 2 && Path[i][o][1] * pix >= players[player].y + pix && (Path[i][o][1] + 1) * pix <= players[player].y + pix * 2)) {
											  //DrawCode TNT In World
											  Path[Path.length - 2].push(new Array());
											  Path[Path.length - 2][Path[Path.length - 2].length - 1][0] = Path[i][o][0];												  
											  Path[Path.length - 2][Path[Path.length - 2].length - 1][1] = Path[i][o][1];
											  //Take Away Block
											  Path[i].splice(o, 1);	
											  doIt = false;
											  //game.types[1].folders.cc.push(game.types[1].folders.newArray(i, o));
											  window["vv" + Math.random()] = setTimeout(function() {									  
											       Path[Path.length - 2].splice(1, 1);
											  }, 500);						 
									}

							}
						}
	                }
				}
			}
		},
		{
			name : "Laser Game",
			description : "You Have a gun, shoot on other players to gain points, or make them lose health",
			types : ["shootL", "shootP"],
		},
],
	
	hell : [
		1, 1, 1 //PLAYERS: 1 - ALIVE ; 0 - DEAD
	],
	loop : false,
	goal : 3,
    	
}

var Path;
var img = new Image();
img.src = "MapTextures/player.png";

var pl0 = new Image();
pl0.src = "pl1_logo.png";
var pl1 = new Image();
pl1.src = "pl2_logo.png";
var pl2 = new Image();
pl2.src = "pl3_logo.png";

function restart() {
  runModPrepa();
  players = [
  {x : 190, y : 150, direction : 0,
   jump : 0, canJump : true, 
   lives : 100,
   doing : "stand",   
   points : players[0].points,
   it : false},
   
  {x : 1166, y : 150, direction : 0,
   jump : 0, canJump : true, 
   lives : 100, 
   doing : "stand", 
   points : players[1].points,
   it : false},
   
  {x :840, y : 150, direction : 0,
   jump : 0, canJump : true, 
   lives : 100, 
   doing : "stand", 
   points : players[2].points,
   it : false},
   
   2, //PLAYERS
   
   ]
	sounds.game.pause();
    sounds.game.currentTime = 0;
	sounds.go.play();
	game.loop = false;
	var time = 4;
	ctx.beginPath();
	ctx.fillStyle = "orange";
	ctx.font = "400px Georgia";
	var Go = setInterval(function() {
		ctx.clearRect(0, 0, 3600, 700);
	    loadWorld(Path);
		if (time == 1) {
			ctx.fillText("GO", 300, 400);
			sounds.game.play();
		}
		else {
			ctx.fillText(time - 1, 500, 400);
		}
		time--;
		if (time == -1) {
		clearInterval(Go);
		game.loop = true;
	}
	}, 1000);
}

function gameStart() { 
    if (game.loop) {
	ctx.beginPath();	
	ctx.clearRect(0, 0, 3600, 700);
	loadWorld(Path);
	
	for (p= 0; p < players[3]; p++) {
	  var fall = gravityTest(p);
	  if (players[p].doing == "jumping") {
		  fall = false; 
		  jump(p);  
	  }
	  gravity(fall, p);
	  move(p);
	  ctx.beginPath();
	  //ctx.draw(Sprites["player" + i][players[i].doing], players[i].x, players[i].y, pix, pix);
	  ctx.drawImage(img, players[p].x, players[p].y, 50, 50);
	  if (game.loop) {
	  ctx.beginPath();
	  ctx.lineWidth = 5;	  
      if (p == 0) {	
	     ctx.drawImage(pl0, 20, 20, 85, 85); 
	     ctx.strokeRect(20, 20, 85, 85);
         ctx.beginPath();
         ctx.fillStyle = "black";
         ctx.fillRect(110, 70, 200, 20);
         ctx.beginPath();
         ctx.fillStyle = "green";
         ctx.fillRect(110, 70, players[0].lives * 2, 20);
		 ctx.strokeRect(110, 70, 200, 20);		 
         ctx.beginPath();
	     ctx.font = "bold 20px Georgia";
	     ctx.fillStyle = "red";		 
         ctx.fillText("Points: " + players[0].points, 110, 65);	
         ctx.beginPath();
	     ctx.font = "bold 15px Georgia";
	     ctx.fillStyle = "red";		 
         ctx.fillText("Lives: " + players[0].lives, 175, 85);
		 
	  }
      else if (p == 1) {	
	     ctx.drawImage(pl1, 1180, 20, 85, 85); 
		 ctx.strokeRect(1180, 20, 85, 85);
         ctx.beginPath();
         ctx.fillStyle = "black";
         ctx.fillRect(960, 70, 200, 20);		 
         ctx.beginPath();
         ctx.fillStyle = "green";
         ctx.fillRect(960, 70, players[1].lives * 2, 20);
		 ctx.strokeRect(960, 70, 200, 20);
         ctx.beginPath();
	     ctx.font = "bold 20px Georgia";
	     ctx.fillStyle = "red";		 
         ctx.fillText("Points: " + players[1].points, 1070, 65);	
         ctx.beginPath();
	     ctx.font = "bold 15px Georgia";
	     ctx.fillStyle = "red";		 
         ctx.fillText("Lives: " + players[1].lives, 1035, 85);		 
	  }
	  else { 
	     ctx.drawImage(pl2, 600, 5, 85, 85); 
		 ctx.strokeRect(600, 5, 85, 85);  
		 ctx.beginPath();
         ctx.fillStyle = "black";
         ctx.fillRect(543, 115, 200, 20);
         ctx.beginPath();
         ctx.fillStyle = "green";
         ctx.fillRect(543, 115, players[2].lives * 2, 20);
		 ctx.strokeRect(543, 115, 200, 20);
         ctx.beginPath();
	     ctx.font = "bold 20px Georgia";
	     ctx.fillStyle = "red";		 
         ctx.fillText("Points: " + players[0].points, 600, 110);	
         ctx.beginPath();
	     ctx.font = "bold 15px Georgia";
	     ctx.fillStyle = "red";		 
         ctx.fillText("Lives: " + players[2].lives, 610, 130);		 
	  }	  	  
    }
	}
	}
	fps = window.requestAnimationFrame(gameStart);
}

function gravityTest(player) {
	var falls = true;
	for (y = 1; y < Path.length - 1; y++) {
		
		for (u = 1; u < Path[y].length; u++) {
			if (falls == true) {
			if (Path[y][u][0] == "wholeXY") {
		       for (Y = Path[y][u][2] * pix; Y < Path[y][u][4] * pix; Y += pix) {
			     for (X = Path[y][u][1] * pix; X < Path[y][u][3] * pix; X += pix) {
                     if ((players[player].x >= X - pix && players[player].x <= X + pix && players[player].y >= Y - pix && players[player].y <= Y) 
					 || (X <= players[player].x && X + pix >= players[player].x && Y >= players[player].y && Y + pix <= players[player].y + pix)) {
						 falls = false;
						 players[player].canJump = true;
						 if (players[player].stopAJ) {
							 players[player].direction = 0;
							 players[player].stopAJ = false;
						 }
						 game.types[game.mod].mod("landed", player);
					 }
			     }
			   }				
			}
			else {
				//alert(players[player].y + " || " + Path[i + 1][o][1]);
				if ((players[player].x >= Path[y][u][0] * pix && players[player].x <= (Path[y][u][0] + 1) * pix && players[player].y <= Path[y][u][1] * pix && players[player].y + pix >= (Path[y][u][1]) * pix)
					|| (Path[y][u][0] * pix >= players[player].x && (Path[y][u][0] + 1) * pix <= players[player].x + pix * 2 && Path[y][u][1] * pix >= players[player].y + pix && (Path[y][u][1] + 1) * pix <= players[player].y + pix * 2)) {
					     falls = false;
						 players[player].canJump = true;
						 if (players[player].stopAJ) {
							 players[player].direction = 0;
							 players[player].stopAJ = false;
						 }
                         game.types[game.mod].mod("landed", player);						 
				}
			}
		}
		}
		
	}
	return falls;
}

function gravity(fall, player) {
	if (fall == true) {
		players[player].y += 4;
		if (players[player].y > 800) {
			players[player].lives = 0;
			condamn(player);
		}
	}
}

function move(pl) {
	players[pl].x += players[pl].direction;
	if (players[pl].x > 1300) {
		players[pl].x = 0;
	}
	else if (players[pl].x < 0) {
		players[pl].x = 1250; 
	}
	game.types[game.mod].mod("moving", pl);
}
	
function jump(pl) {
	players[pl].canJump = false;
	if (players[pl].jump < 60) {
	    players[pl].jump++;
	    players[pl].y -= 4 * Math.cos(players[pl].jump / 36);
	}
	else {
		players[pl].jump = 0;
		players[pl].doing = "standing";
	}
	game.types[game.mod].mod("jumped", pl);
}

function attack(pl) {
	game.types[game.mod].mod("attacked", pl);
	for (o = 0; o < players[3]; o++) {
		if (o == pl) {o++}
		if (players[o].x > players[pl].x - pix - pix / 2 && players[o].x < players[pl].x + pix / 2 &&
		    players[o].y > players[pl].y - pix - pix / 2 && players[o].y < players[pl].y + pix + pix / 2) {
				sounds.beat.play();
				if (game.type == "punchL") {
				    players[o].lives -= 10;
					players[o].jump = 30;
					players[o].doing = "jumping";
					players[o].direction = -6;
					jump(o);
                    if (players[o].lives < 0) {
						players[o].lives = 0;
						condamn(o);
					}
				}
				else if (game.type == "punchP") {
				    players[pl].points++;
				}
                game.types[game.mod].mod("touched", o);				
			}
		else if (players[o].x > players[pl].x + pix / 2 && players[o].x < players[pl].x + pix + pix / 2 &&
		    players[o].y > players[pl].y - pix - pix / 2 && players[o].y < players[pl].y + pix + pix / 2) {
				sounds.beat.play();
				if (game.type == "punchL") {
				    players[o].lives -= 10;
					players[o].jump = 30;
					players[o].doing = "jumping";
					players[o].direction = 6;
                    jump(o);
				}
				else if (game.type == "punchP") {
				    players[pl].points++;
				} 
				game.types[game.mod].mod("touched", o);
			}			
	}
}

function condamn(pl) {
	players[pl].y = 0;
	players[pl].x = 2000;
	game.hell[pl] = 0;
	if (game.hell[0] + game.hell[1] == 1) {
		players[0].points += game.hell[0];
	    players[1].points += game.hell[1];
		players[2].points += game.hell[2];
		var roundOver = true; 
		for (u = 0; u < players[3]; u++) {
			if (players[u].points == game.goal) {
				gameOver(u);
				roundOver = true;
			}
			else {
				roundOver = false;
			}
		}
		if (roundOver == false) {
			restart();				
		}
	}
	game.types[game.mod].mod("dead", pl);
}


function interactA(evt) {
	var key = evt.which || evt.keyCode;
	if (key == 68) { //D
		players[0].direction = +5
	}
	else if (key == 65) { //Q
		players[0].direction = -5;
	}
	else if (key == 87) { //Z
	    if (players[0].canJump == true) {
		    players[0].doing = "jumping";
		}	
	}	
	else if (key == 83) { //S
		attack(0);
	}
	
	
	else if (key == 76) { //L
		players[1].direction = +5;
	}
	else if (key == 74) { //J
		players[1].direction = -5;
	}	
	else if (key == 73) { //I
	    if (players[1].canJump == true) {
		    players[1].doing = "jumping";
		}
	}
	else if (key == 75) { //K
		attack(1);
	}	
	
	else if (key == 39) { //-->
		players[2].direction = +5;
	}
	else if (key == 37) { //<--
		players[2].direction = -5;
	}	
	else if (key == 38) { //^
		if (players[2].canJump == true) {
		    players[2].doing = "jumping";
		}
	}
	else if (key == 40) { //v
		attack(2);
	}	
} 

function interactB(evt) {
	var key = evt.which || evt.keyCode;
	if (players[0].doing != "jumping") {
		if (key == 68) { //D
			players[0].direction = 0;
		}
		else if (key == 65) { //Q
			players[0].direction = 0;
		}	
	}
	else {
		players[0].stopAJ = true;
	}
	
	
	if (players[1].doing != "jumping") {
		if (key == 76) { //L
			players[1].direction = 0;
		}
		else if (key == 74) { //J
			players[1].direction = 0;
		}	
	}
	else {
		players[1].stopAJ = true;
	}	
	
	
    if (players[2].doing != "jumping") {	
		if (key == 39) { //-->
			players[2].direction = 0;
		}
		else if (key == 37) { //<--
			players[2].direction = 0;
		}	
	}
	else {
		players[2].stopAJ = true;
	}	
	
}

function runModPrepa() {
	game.types[0].prepa();
	game.types[game.mod].prepa();
}