let grid;
let lengteCel = 50;
let kleuren;
let blue;
let yellow;
let green;
let red;
let orange;
let purple;
let leeg;
let aantalKleuren;
let random;
let aantalRijen = 8;
let aantalKolommen = 8;
let gridGap = 10;
let vak1 = null;
let vak2 = null;
let canvas;


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
    canvas = createCanvas(aantalKolommen*(lengteCel+gridGap)-gridGap+2*lengteCel,aantalKolommen*(lengteCel+gridGap)-gridGap+2*lengteCel);
    canvas.position((windowWidth - width) /2, (windowHeight - height)/2);
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
    vervangChainsDoorRandoms(grid);


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
                    setTimeout(function(){een()},2000)
                    swap(grid);
                }

			}
		}
	}
}

function een(){
    return 1;
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
        //Als er geen chain is >3 mag er niet geswapt worden, we swappen dus de vakken terug naar hun oorspronkelijke positie
        //Als we de eerste swap niet doen kunnen we niet zien of er een chain gemaakt gaat worden
        if((horizontalChainAt(vak1)<3 && horizontalChainAt(vak2)<3) && verticalChainAt(vak1)<3 && verticalChainAt(vak2)<3) {
            let temp2 = grid[vak1.rij][vak1.kolom].kleur;
            grid[vak1.rij][vak1.kolom].kleur = grid[vak2.rij][vak2.kolom].kleur;
            grid[vak2.rij][vak2.kolom].kleur = temp2;
        }
		let o = maakChainsLeegAt(vak1);
		let p = maakChainsLeegAt(vak2);
		console.log("aantal witte vakjes die verschijnen door chains op vak 1 = ", o);
		console.log("aantal witte vakjes die verschijnen door chains op vak 2 = ", p);
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

function maakChainsLeegAt(vak) {
    let tobedeleted = [];
    let res = 0
    if (horizontalChainAt(vak) >= 3) {
        tobedeleted.push(vak);
        let kleurVak = grid[vak.rij][vak.kolom].kleur;
        let i = 1;
        while (vak.kolom + i < breedte() && grid[vak.rij][vak.kolom + i].kleur === kleurVak) {
            tobedeleted.push({rij: vak.rij, kolom: vak.kolom + i});
            i++;
        }
        i = 1;
        while (vak.kolom - i >= 0 && grid[vak.rij][vak.kolom - i].kleur === kleurVak) {
            tobedeleted.push({rij: vak.rij, kolom: vak.kolom - i});
            i++;
        }
        res += horizontalChainAt(vak);
    }
    if (verticalChainAt(vak) >= 3) {
        tobedeleted.push(vak);
        let kleurVak = grid[vak.rij][vak.kolom].kleur;
        let i = 1;
        while (vak.rij + i < hoogte() && grid[vak.rij + i][vak.kolom].kleur === kleurVak) {
            tobedeleted.push({rij: vak.rij + i, kolom: vak.kolom});
            i++;
        }
        i = 1;
        while (vak.rij - i >= 0 && grid[vak.rij - i][vak.kolom].kleur === kleurVak) {
            tobedeleted.push({rij: vak.rij - i, kolom: vak.kolom});
            i++;
        }
        res += verticalChainAt(vak);
    }

    for (let el of tobedeleted) {
        grid[el.rij][el.kolom].kleur = leeg;
    }
	collapse(grid);
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
	vulLegeVakken();
}

function vulLegeVakken(){
	for (let kolom=0; kolom<breedte(); kolom++){
		for (let rij=0; rij<hoogte() && grid[rij][kolom].kleur === leeg; rij++){
			grid[rij][kolom].kleur = kleuren[Math.floor(Math.random()*aantalKleuren)];
		}
	}
}

function vervangChainsDoorRandoms(grid){

    let sorted= false;
    while (!sorted) {
        sorted = true;
        for (let kolom = 0; kolom < hoogte(grid); kolom++) {
            for (let rij = 0; rij < breedte(grid); rij++) {
                if (horizontalChainAt({kolom: kolom, rij: rij}) >= 3) {
                    console.log("er was nen horizontale ze!");
                    grid[rij][kolom].kleur = kleuren[Math.floor(Math.random()*4)];
                    sorted = false;

                }
                if (verticalChainAt({kolom: kolom, rij: rij}) >= 3) {
                    console.log("Rip verticale chain!");
                    grid[rij][kolom].kleur = kleuren[Math.floor(Math.random()*4)];
                    sorted = false;
                }
            }
        }
    }
    console.log("While is gedaan");
}