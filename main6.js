var demande = parseInt(prompt("Entrez un nombre")); // Convertir l'entrée en un entier
var resultat = 0; // Initialiser la variable 'resultat'

for (var i = 1; i <= demande; i++) {
    resultat += i; // Ajouter 'i' à 'resultat'
}

alert( resultat);
