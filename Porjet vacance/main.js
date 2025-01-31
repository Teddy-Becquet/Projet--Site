// Tableau pour stocker les scores
let scores = [];

// Fonction pour charger les scores
async function loadScores() {
    try {
        // Exemple de récupération de données (peut être remplacé par une API)
        const response = await fetch('http://192.168.65.127:3000/scores');
        const data = await response.json();

        console.log("🔍 Réponse brute du serveur:", data); // Débogage

        if (!Array.isArray(data)) {
            console.error("❌ Erreur: Le serveur n'a pas renvoyé un tableau.");
            return;
        }

        scores = data; // Met à jour le tableau des scores
        displayScores(); // Affiche les scores
    } catch (error) {
        console.error('❌ Erreur lors du chargement des scores:', error);
    }
}

// Fonction pour afficher les scores
function displayScores() {
    const scoresTable = document.getElementById('scoresTable');
    scoresTable.innerHTML = ''; // Réinitialise le tableau

    scores.forEach(score => {
        const row = document.createElement('tr');
        
        const teamCell = document.createElement('td');
        teamCell.textContent = score.team;
        row.appendChild(teamCell);
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = score.score;
        row.appendChild(scoreCell);

        scoresTable.appendChild(row); // Ajoute la ligne au tableau
    });
}

// Fonction pour ajouter un nouveau score
async function addScore() {
    const team = document.getElementById("team").value;
    const score = parseInt(document.getElementById("score").value, 10);

    if (!team || isNaN(score)) {
        alert("Veuillez entrer un nom d'équipe valide et un score.");
        return;
    }

    const newScore = { team, score };
    
    try {
        const response = await fetch("http://192.168.65.127:3000/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newScore)
        });

        if (response.ok) {
            alert("Score ajouté avec succès !");
            await loadScores(); // Recharge les scores
        } else {
            const result = await response.json();
            alert("Erreur : " + result.error); // Affiche l'erreur du serveur
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de l'ajout du score.");
    }
}

// Événement pour le formulaire de soumission
document.getElementById("scoreForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche la soumission classique du formulaire
    addScore(); // Appelle la fonction pour ajouter un score
});

// Chargement initial des scores
loadScores();
