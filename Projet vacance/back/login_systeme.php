<?php
session_start();

// Connexion à la base de données
$host = "localhost";
$dbname = "projet_back_db";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Vérification du formulaire de connexion
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $identifiant = $_POST['identifiant'];
    $password = $_POST['password'];

    // Récupérer l'utilisateur depuis la base de données
    $stmt = $pdo->prepare("SELECT * FROM users WHERE identifiant = ?");
    $stmt->execute([$identifiant]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['identifiant'] = $user['identifiant'];
        header("Location: http://192.168.65.127/sie%201/Porjet%20vacance/acceuil.html"); // Redirection après connexion
        exit;
    } else {
        $error = "Identifiant ou mot de passe incorrect";
    }
}
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
</head>
<body>
    <h2>Connexion</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="post">
        <label for="identifiant">Identifiant :</label>
        <input type="text" name="identifiant" required>
        <br>
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" required>
        <br>
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>