$( document ).ready(function() {

//========================== init jeu ==================================//

var n = 3;
var tableau = [];
var tableauInitial = [];

var livide = 0;
var covide = 0;

var longueurPlateau = 0;
//==================== ajout cases chiffrées ============================//

function myTable() {
    for (let i = 0; i < n; i++) {
        let myLine = [];
        for (let j = 0; j < n; j++) {
            myLine.push(i * n + j);
        }
        tableauInitial.push(myLine);

    }
}
function init() {


    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < n; j++) {
            longueurPlateau++;
            line.push(i * n + j);
        }
 tableau.push(line);

    }
    let blankCase = caseVide(tableau);
    livide = blankCase[0];
    covide = blankCase[1];
    console.log(longueurPlateau);
}

function render() {
    var tbody = $('tbody').empty();

    for (var i = 0; i < n; i++) {
        var tr = $('<tr></tr>')
        tbody.append(tr)

        for (var j = 0; j < n; j++) {
            if (tableau[i][j] === longueurPlateau-1) {
                var td = $('<td>').text('')
            } else
                var td = $('<td>').text(tableau[i][j])
            tr.append(td)

        }
    }

}


//==================== ajout cases chiffrées ============================//

function swap(li, co, index1, index2) {
    let temp = tableau[li][co];
    tableau[li][co] = tableau[index1][index2];
    tableau[index1][index2] = temp;

    livide = li;
    covide = co;
}

function coups_possibles(liv,cov) {

    let coups = [];

    if (liv !== 0) {
        coups.push([liv - 1, cov])
    }

    if (liv !== 2) {
        coups.push([liv + 1, cov])
    }


    if (cov !== 0) {
        coups.push([liv, cov - 1])
    }

    if (cov !== 2) {
        coups.push([liv, cov + 1])
    }
    return coups;

}

function coupAleatoire() {
    let coups = coups_possibles(livide,covide);
    let coupChoisi = coups[Math.floor(Math.random() * coups.length)];
    swap(coupChoisi[0], coupChoisi[1], livide, covide);
    render(tableau);
}


let mixInterval;

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
    console.log(tableauInitial);
console.log(tableau);
console.log(test);
    if(test === longueurPlateau){
        console.log("cest gagné");
        return true;
    }
    else
        return false;

}
var mytest = 0;
function depthSolution(maxdepth, tableau, depth, index1 = null, index2 = null) {
    let positionCaseVide = caseVide(tableau);
    if (checkWin(tableau, tableauInitial)){
        return true;
    }
    if (depth > maxdepth) {
        let temp = tableau[positionCaseVide[0]][positionCaseVide[1]];
        tableau[positionCaseVide[0]][positionCaseVide[1]] = tableau[index1][index2];
        tableau[index1][index2] = temp;
        return false;
    }



    let coupPossible = coups_possibles(positionCaseVide[0],positionCaseVide[1]);
    // console.log("coupsPossible = ", coupPossible);

    for(let i = 0; i < coupPossible.length; i++){
        mytest++;
         swap(positionCaseVide[0], positionCaseVide[1], coupPossible[i][0], coupPossible[i][1]);
        if(depthSolution(maxdepth, tableau, depth+1, positionCaseVide[0], positionCaseVide[1])){
            return true;
        }
    }
    if (index2 !== null){
        let temp = tableau[positionCaseVide[0]][positionCaseVide[1]];
        tableau[positionCaseVide[0]][positionCaseVide[1]] = tableau[index1][index2];
        tableau[index1][index2] = temp;
    }
    return false;


}

function caseVide(tableau){
    for(let i = 0; i < tableau.length; i++){
        for (let j = 0; j < tableau[i].length; j++){
            if (tableau[i][j] === longueurPlateau-1 ){
                return [i,j];
            }
        }
    }
}

myTable();
init();
document.getElementById("mix").addEventListener("click", mix);
render(tableau);
$( "#clickSol" ).click(function() {
    if(depthSolution(8, tableau,0) === true){
      console.log(tableauInitial);
        console.log('ça marche');
        console.log(mytest);
    } else{
        console.log(tableauInitial);
        console.log(mytest);
        console.log('ça ne marche pas');
    }
});
});