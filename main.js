//========================== init jeu ==================================//

var n = 3;
var tableau = [];
var tableauInitial = [[0,1,2],[3,4,5],[6,7,8]];

var livide = 2;
var covide = 2;


//==================== ajout cases chiffrées ============================//

function init() {


    for (var i = 0; i < n; i++) {
        var line = [];
        for (var j = 0; j < n; j++) {
            line.push(i * n + j);
        }
        tableau.push(line);

    }
}

function render() {
    var tbody = $('tbody').empty();

    for (var i = 0; i < n; i++) {
        var tr = $('<tr></tr>')
        tbody.append(tr)

        for (var j = 0; j < n; j++) {
            if (tableau[i][j] === 8) {
                var td = $('<td>').text('')
            } else
                var td = $('<td>').text(tableau[i][j])
            tr.append(td)

        }
    }

}


//==================== ajout cases chiffrées ============================//

function swap(li, co, index1, index2) {
    var temp = tableau[li][co];
    tableau[li][co] = tableau[index1][index2];
    tableau[index1][index2] = temp;

    livide = li;
    covide = co;
}

function coups_possibles() {

    var coups = [];

    if (livide != 0) {
        coups.push([livide - 1, covide])
    }

    if (livide != 2) {
        coups.push([livide + 1, covide])
    }


    if (covide != 0) {
        coups.push([livide, covide - 1])
    }

    if (covide != 2) {
        coups.push([livide, covide + 1])
    }
    return coups;

}

function coupAleatoire() {
    var coups = coups_possibles();
    var coupChoisi = coups[Math.floor(Math.random() * coups.length)];
    swap(coupChoisi[0], coupChoisi[1], livide, covide);
    render(tableau);
}


var mixInterval;

function mix() {
    if (mixInterval) {
        clearInterval((mixInterval));
        mixInterval = null;
    } else {
        mixInterval = setInterval(coupAleatoire, 100);
    }
}

function checkWin(tableau, tableauInitial) {
let test = 0;
    for (let li = 0; li < n; li++) {
        for (let co = 0; co < n; co++) {

            if (tableau[li][co] === tableauInitial[li][co]) {
                test++
            }

            }

        }
    if(test === 9){
        console.log("cest gagner");
        return true;
    }
    else
        return false;

}

function depthSolution(maxdepth, tableau, depth) {
    let postitionCaseVide = caseVide(tableau);
    if (depth > maxdepth) {
        return false;
    }
    if (checkWin(tableau, tableauInitial)){
        return true;
    }
    let coupPossible = coups_possibles();
    for(let i = 0; i < coupPossible.length; i++){
         swap(postitionCaseVide[0], postitionCaseVide[1], coupPossible[i][0], coupPossible[i][1]);
        if(depthSolution(maxdepth, tableau, depth+1)){
            return true;
        }
    }
    return false;




}

function caseVide(tableau){
    for(let i = 0; i < tableau.length; i++){
        for (let j = 0; j < tableau[i].length; j++){
            if (tableau[i][j] === 8 ){
                return [i,j];
            }
        }
    }
}
init();
document.getElementById("mix").addEventListener("click", mix);
render(tableau);
$( "#clickSol" ).click(function() {
    if(depthSolution(1, tableau,0) === true){
        console.log('sa marche');
    } else{
        console.log('sa marche pas');
    }
});
console.log(tableau);
