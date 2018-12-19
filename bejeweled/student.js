// Schrijf hier je code
// Schrijf hier je code
function width(grid){
    return grid[0].length;
}
function height(grid){
    return grid.length;
}
function isInside(grid, position){
    let x = position.x;
    let y = position.y;
    return x>= 0 && x <width(grid) && y>= 0 && y< height(grid);
}
function swap(grid, p, q){

    let first = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = first;
}
function horizontalChainAt(grid, position){
    let kleur = grid[position.y][position.x];
    let aantal = 1;
    let i = 1;
    while(position.x+i < width(grid) && grid[position.y][position.x + i] === kleur){
        aantal++;
        i++;
    }
    let k = 1;
    while(position.x-k >= 0 && grid[position.y][position.x - k] === kleur){
        aantal++;
        k++;
    }
    return aantal;
}
function verticalChainAt(grid, position){
    let kleur = grid[position.y][position.x];
    let aantal = 1;
    let i = 1;
    while(position.y+i < height(grid) && grid[position.y + i][position.x] === kleur){
        aantal++;
        i++;
    }
    let k = 1;
    while(position.y-k >= 0 && grid[position.y - k][position.x] === kleur){
        aantal++;
        k++;
    }
    return aantal;
}
function removeChains(grid){
    let res = {};
    let verwijder = [];
    for(let k = 0;k<height(grid);k++){
        for(let i = 0; i<width(grid);i++){
            if (horizontalChainAt(grid, {x: i, y: k}) >= 3) {

                let lengte = horizontalChainAt(grid, {x: i, y: k});
                let kleur = grid[k][i];
                if(kleur in res){
                    res[kleur] += lengte;
                }
                else{res[kleur] = lengte;}

                for (let l = 0; l < lengte; l++) {

                    // grid[k][i + l] = "";
                    verwijder.push({x:i+l, y:k});
                }
                i += lengte;
            }

        }
    }
    for(let i = 0; i<width(grid);i++){
        for(let k = 0;k<height(grid);k++){

            if (verticalChainAt(grid, {x: i, y: k}) >= 3) {

                let lengteV = verticalChainAt(grid, {x: i, y: k});
                let kleur = grid[k][i];
                if(kleur in res){
                    res[kleur] += lengteV;
                }
                else{res[kleur] = lengteV;}

                for (let l = 0; l < lengteV; l++) {
                    verwijder.push({x:i, y:k+l});
                }
                k += lengteV;
            }

        }
    }


    for( let i = 0;i<verwijder.length; i++){
        grid[verwijder[i].y][verwijder[i].x]="";
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
                    // let eerste = grid[i][k];
                    // grid[i][k] = grid[i + 1][k];
                    // grid[i+1][k] = eerste;
                    let p={x:k,y:i};
                    let q={x:k,y:i+1};
                    swap(grid,p,q);
                    sorted = false;
                }
            }
        }
    }

}

