function addition(a, b) {
    return a + b;
}

var demande = parseInt(prompt("Entrez un nombre")); 

var resultat = 0;


for (var i = 1; i <= demande; i++) {
    
    resultat = addition(resultat, i); 
}

alert(resultat);
