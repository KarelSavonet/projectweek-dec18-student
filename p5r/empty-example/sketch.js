let grid;
let lengteCel = 50;
let kleuren;
let blue;
let yellow;
let green;
let red;
let aantalKleuren = 4;
let random;

function setup() {
  // put setup code here

	let blue = color(0,0,255);
	let yellow = color(255,255,0);
	let green = color(0,255,0);
	let red = color(255,0,0);
	let kleuren = [blue,yellow,green,red];
    createCanvas(600,600);
    background(200);
    grid = new Array(10);
    for (let rij = 0; rij<10; rij++){
        grid[rij] = new Array(5);
		for (let kolom=0; kolom<5; kolom++){
			random = Math.floor(aantalKleuren*Math.random());
			grid[rij][kolom] = kleuren[random];
		}
    }
}

function draw() {
  // put drawing code here

    for (let rij = 0; rij<10; rij++){
        for (let kolom=0; kolom<5; kolom++){
			let x = kolom*60+50;
			let y = rij*60+50;
			fill(grid[rij][kolom])
			stroke(0);
			rect(x+50,y+50,lengteCel,lengteCel);

		}
    }


	
}