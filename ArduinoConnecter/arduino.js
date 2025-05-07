document.getElementById("refresh-btn").addEventListener("click", function() {
    fetchDoorStatus();
});

// Fonction pour récupérer l'état de la porte
function fetchDoorStatus() {
    // Remplacer l'URL par l'adresse IP de votre Arduino ou votre serveur
    fetch('http://192.168.65.127')  
        .then(response => response.json())
        .then(data => {
            // Sélectionne l'élément qui affichera l'état de la porte
            let doorStatusElement = document.getElementById("door-status");

            // Vérifie le statut retourné par l'Arduino
            if (data.status === "open") {
                doorStatusElement.textContent = "La porte est ouverte.";
                doorStatusElement.classList.remove("closed");
                doorStatusElement.classList.add("open");
            } else if (data.status === "closed") {
                doorStatusElement.textContent = "La porte est fermée.";
                doorStatusElement.classList.remove("open");
                doorStatusElement.classList.add("closed");
            } else {
                doorStatusElement.textContent = "Statut inconnu.";
                doorStatusElement.classList.remove("open", "closed");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'état de la porte:', error);
            document.getElementById("door-status").textContent = "Erreur de communication.";
        });
}
