document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    fetch("../back/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(data => {
        if (data.success) {
            window.location.href = "../back/dashboard.php"; // Redirige après connexion réussie
        } else {
            errorMessage.textContent = data.message; // Affiche le message d'erreur
        }
    })
    .catch(error => {
        console.error("Erreur:", error);
        errorMessage.textContent = "Une erreur est survenue.";
    });
});
