document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        let errorMessage = document.getElementById("error-message");

        // Vérifie si tous les champs sont remplis
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            errorMessage.textContent = "Tous les champs doivent être remplis.";
            return;
        }

        // Vérifie si les mots de passe correspondent
        if (password !== confirmPassword) {
            errorMessage.textContent = "Les mots de passe ne correspondent pas.";
            return;
        }

        // Vérifie si l'email est valide
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = "Veuillez entrer une adresse e-mail valide.";
            return;
        }

        // Envoi des données au serveur
        fetch("../back/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            if (data.success) {
                window.location.href = "index.html"; // Redirige vers la page de connexion après inscription réussie
            } else {
                errorMessage.textContent = data.message; // Affiche le message d'erreur
            }
        })
        .catch(error => {
            console.error("Erreur:", error);
            errorMessage.textContent = "Une erreur est survenue lors de l'inscription.";
        });
    });
});
