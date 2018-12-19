function width(grid){
	return grid[0].length;
}

function height(grid){
	return grid.length;
}

function isInside(grid,position){
	return ((position.x >=0 && position.x < width(grid)) && (position.y >= 0 && position.y < height(grid)));
}

function swap(grid,p,q){
	const a = grid[p.y][p.x];
	grid[p.y][p.x] = grid[q.y][q.x];
	grid[q.y][q.x] = a;
}

function horizontalChainAt(grid,position){
	let kleur = grid[position.y][position.x];
	let ketting = 1;
	let i = 1;
	while(isInside(grid,{x:position.x+i, y:position.y}) && grid[position.y][position.x+i] === kleur){
		ketting++;
		i++;
	}
	i=1;
	while(isInside(grid,{x:position.x-i, y:position.y}) && grid[position.y][position.x-i] === kleur){
		ketting++;
		i++;
	}
	return ketting;
}

function verticalChainAt(grid,position){
	let kleur = grid[position.y][position.x];
	let ketting = 1;
	let i = 1;
	while(isInside(grid,{x:position.x, y:position.y+i}) && grid[position.y+i][position.x] === kleur){
		ketting++;
		i++;
	}
	i=1;
	while(isInside(grid,{x:position.x, y:position.y-i}) && grid[position.y-i][position.x] === kleur){
		ketting++;
		i++;
	}
	return ketting;
}


function removeChains(grid){
	let res = {};
	let tobedeleted = [];
	for (let rij = 0; rij<height(grid); rij++){
		for (let kolom = 0; kolom<width(grid); kolom++){
			let lengtehorizontaal = horizontalChainAt(grid,{x:kolom,y:rij});
			if (lengtehorizontaal>=3){
				let teller = 0;
				teller += lengtehorizontaal;
				let kleur = grid[rij][kolom];
				for (let i=0; i<lengtehorizontaal; i++){
					tobedeleted.push({x:kolom+i,y:rij});
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
	
	
	
	for (let kolom=0; kolom<width(grid); kolom++){
		for (let rij=0; rij<height(grid); rij++){
			let lengteverticaal = verticalChainAt(grid,{x:kolom,y:rij});
			if (lengteverticaal>=3){
				let teller = 0;
				teller += lengteverticaal;
				let kleur = grid[rij][kolom];
				
				for (let i=0; i<lengteverticaal; i++){
					tobedeleted.push({x:kolom,y:rij+i});
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
		grid[el.y][el.x] = "";
	}
	
	return res;
}

function collapse(grid){

    let sorted = false;
    while(!sorted) {
           sorted = true;

        for (let k = 0; k<width(grid);k++) {
            for (let i = 0; i < height(grid) - 1; i++) {
                if (grid[i][k] !== "" && grid[i + 1][k] === "") {
                    let p={x:k,y:i};
                    let q={x:k,y:i+1};
                    swap(grid,p,q);
                    sorted = false;
                }
            }
        }
    }

}






