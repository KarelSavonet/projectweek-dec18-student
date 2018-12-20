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
			grid[rij][kolom].position = {x:kolom, y:rij};
			grid[rij][kolom].actief = false;
		}
    }
}

function draw() {
  // put drawing code here
    for (let rij = 0; rij<aantalKolommen; rij++){
        for (let kolom=0; kolom<aantalKolommen; kolom++){
			let x = positionInPixels(kolom);
			let y = positionInPixels(rij);
			fill(grid[rij][kolom].kleur)
			if (grid[rij][kolom].actief){
				strokeWeight(3);
				stroke(51);
			}
			else{
				strokeWeight(1);
			}
			rect(x,y,lengteCel,lengteCel);
		}
    }
}

function positionInPixels(rijOfKolom){
	return rijOfKolom*(lengteCel+gridGap)+lengteCel;
}

function mousePressed(){
	for(let rij=0; rij<aantalRijen; rij++){
		for(let kolom=0; kolom<aantalKolommen; kolom++){
            if ((mouseX > positionInPixels(kolom) && mouseX < positionInPixels(kolom)+lengteCel) && (mouseY > positionInPixels(rij) && mouseY < positionInPixels(rij)+lengteCel)){
            	grid[rij][kolom].actief = true;
			}
		}
	}

}

function isBuur(grid, vak1,vak2){
    let horizontaleBuur = (vak1.position.x+1 === vak2.position.x || vak1.position.x -1 === vak2.position.x) && (vak1.position.y === vak2.position.y);
    let verticaleBuur = (vak1.position.y+1 === vak2.position.y || vak1.position.y -1 === vak2.position.y) && (vak1.position.x === vak2.position.x);

    return (horizontaleBuur || verticaleBuur);
}