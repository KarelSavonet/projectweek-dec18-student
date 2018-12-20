let grid;
let lengteCel = 50;
let kleuren;
let blue;
let yellow;
let green;
let red;
let leeg;
let aantalKleuren = 4;
let random;
let aantalRijen = 8;
let aantalKolommen = 8;
let gridGap = 10;

function setup() {
  // put setup code here

	blue = color(0,0,255);
	yellow = color(255,255,0);
	green = color(0,255,0);
	red = color(255,0,0);
	leeg = color(255,255,255);
	kleuren = [blue,yellow,green,red];
    createCanvas(600,600);
    background(200);
    grid = new Array(aantalRijen);
    for (let rij = 0; rij<aantalRijen; rij++){
        grid[rij] = new Array(aantalKolommen);
		for (let kolom=0; kolom<aantalKolommen; kolom++){
			grid[rij][kolom] = {};
			random = Math.floor(aantalKleuren*Math.random());
			grid[rij][kolom].kleur = kleuren[random];
			grid[rij][kolom].position = {x:kolom*(lengteCel+gridGap)+lengteCel,y:rij*(lengteCel+gridGap)+lengteCel};
			grid[rij][kolom].actief = false;
		}
    }
}

function draw() {
  // put drawing code here
    for (let rij = 0; rij<aantalKolommen; rij++){
        for (let kolom=0; kolom<aantalKolommen; kolom++){
			let x = grid[rij][kolom].position.x;
			let y = grid[rij][kolom].position.y;
			fill(grid[rij][kolom].kleur)
			stroke(0);
			rect(x,y,lengteCel,lengteCel);
		}
    }
}

function mousePressed(){
	for(let rij=0; rij<aantalRijen; rij++){
		for(let kolom=0; kolom<aantalKolommen; kolom++){
            grid[rij][kolom].kleur = yellow;
		}
	}
}