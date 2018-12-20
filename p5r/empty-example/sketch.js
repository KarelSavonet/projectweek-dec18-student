let grid;
let lengteCel = 50;
let kleuren;
let blue;
let yellow;
let green;
let red;
let aantalKleuren = 4;
let random;
let aantalRijen = 8;
let aantalKolommen = 8;

function setup() {
  // put setup code here

	let blue = color(0,0,255);
	let yellow = color(255,255,0);
	let green = color(0,255,0);
	let red = color(255,0,0);
	let kleuren = [blue,yellow,green,red];
    createCanvas(600,600);
    background(200);
    grid = new Array(aantalRijen);
    for (let rij = 0; rij<aantalRijen; rij++){
        grid[rij] = new Array(aantalKolommen);
		for (let kolom=0; kolom<aantalKolommen; kolom++){
			random = Math.floor(aantalKleuren*Math.random());
			grid[rij][kolom] = kleuren[random];
		}
    }
}

function draw() {
  // put drawing code here

    for (let rij = 0; rij<aantalKolommen; rij++){
        for (let kolom=0; kolom<aantalKolommen; kolom++){
			let x = kolom*(lengteCel+10)+lengteCel;
			let y = rij*(lengteCel+10)+lengteCel;
			fill(grid[rij][kolom])
			stroke(0);
			rect(x,y,lengteCel,lengteCel);

		}
    }


	
}