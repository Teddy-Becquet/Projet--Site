// Variables creation

var compteur = 0;
var compteur2 = 0;

var MaDiv1 = document.getElementById("Methode2");
MaDiv1.addEventListener("keydown",UneProcedureQuiEcrit);

var MaDiv2 = document.getElementById("Methode3");
MaDiv2.addEventListener("mouseover",UneProcedureQuiSurvole);

var MaDiv3 = document.getElementById("Methode4");
MaDiv3.addEventListener("keydown",UneProcedureQuiEcrit);

// functions creation

function UneProcedureQuiEcrit(evenement){
    evenement.target.innerHTML="Nombre de carte scannés : "+evenement.key;
}

function UneProcedureQuiChangeLeTexte(evenement){
    compteur++;
    evenement.target.innerHTML = "Carte qui ont étgait scannés  "+compteur+" fois";
    MaDiv1.className="divC"
}

function UneProcedureQuiSurvole(evenement){
    MaDiv1.addEventListener("click",UneProcedureQuiEcrit);
}