let grid;
let lengteCel = 50;
let kleuren;
let blue;
let yellow;
let green;
let red;
let orange;
let leeg;
let aantalKleuren;
let random;
let aantalRijen = 8;
let aantalKolommen = 8;
let gridGap = 10;
let vak1 = null;
let vak2 = null;


function setup() {
  // put setup code here

	blue = color(0,0,255);
	yellow = color(255,255,0);
	green = color(0,255,0);
	red = color(255,0,0);
	orange = color (255,128,0);
	purple = color(128,0,128);
	leeg = color(255,255,255);
	kleuren = [blue,yellow,green,red,orange,purple];
	aantalKleuren = kleuren.length;
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
				strokeWeight(10);
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


// eerst zijn vak1 en vak2 === null
// bij mousePressed wordt eerst vak1 gevuld, dan vak2
// als de twee vakken gevuld zijn, wordt er geswapt
// swap moet vak1 en vak 2 weer resetten naar null
function mousePressed(){
	for(let rij=0; rij<aantalRijen; rij++){
		for(let kolom=0; kolom<aantalKolommen; kolom++){
            if ((mouseX > positionInPixels(kolom) && mouseX < positionInPixels(kolom)+lengteCel) && (mouseY > positionInPixels(rij) && mouseY < positionInPixels(rij)+lengteCel)){

				if (vak1 === null){
					vak1 = {kolom:kolom, rij:rij};
				}
				else if (vak2 === null) {
                    vak2 = {kolom:kolom, rij:rij};
                }
                grid[rij][kolom].actief = true;
                if (vak2 !== null){
                    swap(grid);
                }

			}
		}
	}


}
// vak1 is bijvoorbeeld grid[0][1]
function isBuur(){
	let a = grid[vak1.rij][vak1.kolom];
	let b = grid[vak2.rij][vak2.kolom];
    let horizontaleBuur = (a.position.x+1 === b.position.x || a.position.x -1 === b.position.x) && (a.position.y === b.position.y);
    let verticaleBuur = (a.position.y+1 === b.position.y || a.position.y -1 === b.position.y) && (a.position.x === b.position.x);
    return (horizontaleBuur || verticaleBuur);
}

function swap(){
	if (isBuur()){
		let temp = grid[vak1.rij][vak1.kolom].kleur;
		grid[vak1.rij][vak1.kolom].kleur = grid[vak2.rij][vak2.kolom].kleur;
		grid[vak2.rij][vak2.kolom].kleur = temp;
		maakChainsLeeg();
	}
	console.log("horizontal op vak1 = ",horizontalChainAt(vak1))
    console.log("horizontal op vak2 = ",horizontalChainAt(vak2))
    console.log("verticaal op vak1 = ",verticalChainAt(vak1))
    console.log("verticaal op vak2 = ",verticalChainAt(vak2))

	grid[vak1.rij][vak1.kolom].actief = false;
	grid[vak2.rij][vak2.kolom].actief = false;
	vak1 = null;
	vak2 = null;
	background(200);

}


function breedte(){
	return grid[0].length;
}

function hoogte(){
	return grid.length;
}

function horizontalChainAt(vak){
    let kleurVak = grid[vak.rij][vak.kolom].kleur;
    let ketting = 1;
    let i = 1;

    while(vak.kolom+i < breedte() && grid[vak.rij][vak.kolom+i].kleur === kleurVak){
    	ketting++;
    	i++;
	}

	i=1;

	while(vak.kolom-i >= 0 && grid[vak.rij][vak.kolom-i].kleur === kleurVak){
    	ketting++;
    	i++;
	}

    return ketting;
}

function verticalChainAt(vak){
    let kleurVak = grid[vak.rij][vak.kolom].kleur;
    let ketting = 1;
    let i = 1;
    while(vak.rij+i < breedte() && grid[vak.rij+i][vak.kolom].kleur === kleurVak){
        ketting++;
        i++;
    }
    i=1;
    while(vak.rij-i >= 0 && grid[vak.rij-i][vak.kolom].kleur === kleurVak){
        ketting++;
        i++;
    }
    return ketting;
}

function maakChainsLeegAt(vak){

    let res = {};
    let tobedeleted = [];
    for (let rij = 0; rij<hoogte(); rij++){
        for (let kolom = 0; kolom<breedte(); kolom++){
            let lengtehorizontaal = horizontalChainAt({kolom:kolom,rij:rij});
            if (lengtehorizontaal>=3){
                let teller = 0;
                teller += lengtehorizontaal;
                let kleur = grid[rij][kolom].kleur;
                for (let i=0; i<lengtehorizontaal; i++){
                    tobedeleted.push({kolom:kolom+i,rij:rij});
                }
                if (kleur in res){
                    res[kleur] += teller;
                }
                else{
                    res[kleur] = teller;
                }
                kolom += lengtehorizontaal;
            }
        }
    }

    for (let kolom=0; kolom<hoogte(); kolom++){
        for (let rij=0; rij<breedte(); rij++){
            let lengteverticaal = verticalChainAt({kolom:kolom,rij:rij});
            if (lengteverticaal>=3){
                let teller = 0;
                teller += lengteverticaal;
                let kleur = grid[rij][kolom].kleur;
                for (let i=0; i<lengteverticaal; i++){
                    tobedeleted.push({kolom:kolom,rij:rij+i});
                }
                if (kleur in res){
                    res[kleur] += teller;
                }
                else{
                    res[kleur] = teller;
                }
                rij += lengteverticaal;
            }
        }
    }


    for (let el of tobedeleted){
    	console.log("rij",el.rij,"kolom",el.kolom);
        //grid[el.rij][el.kolom].kleur = leeg;
        grid[0][0].kleur = leeg;
    }

    return res;
}

function collapse(grid){

    let sorted = false;
    while(!sorted) {
        sorted = true;

        for (let k = 0; k<breedte(grid);k++) {
            for (let i = 0; i < hoogte(grid) - 1; i++) {
                if (grid[i][k].kleur !== leeg && grid[i + 1][k].kleur === leeg) {
                    let temp = grid[i][k].kleur;
                    grid[i][k].kleur = grid[i+1][k].kleur;
                    grid[i+1][k].kleur = temp;
                    sorted = false;
                }
            }
        }
    }

}
