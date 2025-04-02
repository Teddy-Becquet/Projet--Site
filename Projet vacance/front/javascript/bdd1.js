const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '192.168.64.175', // ou l'adresse de votre serveur de base de données
    user: 'votre_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'votre_base_de_données'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Exemple de route pour récupérer des données de la base de données
app.get('/utilisateurs', (req, res) => {
    connection.query('SELECT * FROM utilisateurs', (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête :', err);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});