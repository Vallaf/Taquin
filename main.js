//========================== init jeu ==================================//

var n = 4;
var tableau = [];
var livide = 3;
var covide = 3;


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
            if (tableau[i][j] === 15) {
                var td = $('<td>').text('')
            } else
                var td = $('<td>').text(tableau[i][j])
            tr.append(td)

        }
    }

}


//==================== ajout cases chiffrées ============================//

function swap(li, co) {
    var temp = tableau[li][co];
    tableau[li][co] = tableau[livide][covide];
    tableau[livide][covide] = temp;

    livide = li;
    covide = co;
}

function coups_possibles() {

    var coups = [];

    if (livide != 0) {
        coups.push([livide - 1, covide])
    }

    if (livide != 3) {
        coups.push([livide + 1, covide])
    }


    if (covide != 0) {
        coups.push([livide, covide - 1])
    }

    if (covide != 3) {
        coups.push([livide, covide + 1])
    }
    return coups;

}

function coupAleatoire() {
    var coups = coups_possibles();
    var coupChoisi = coups[Math.floor(Math.random() * coups.length)];
    swap(coupChoisi[0], coupChoisi[1]);
    render(tableau);
}


var mixInterval;
function mix() {
    if(mixInterval) {
        clearInterval((mixInterval));
        mixInterval = null;
    } else {
        mixInterval = setInterval(coupAleatoire, 100);
    }
}

init();
document.getElementById("mix").addEventListener("click", mix);
render(tableau);
