const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'votre_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'votre_base_de_données'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM utilisateurs WHERE username = '${username}' AND password = '${password}'`;

    db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: 'Erreur de connexion' });
        } else if (results.length > 0) {
            res.json({ message: 'Connexion réussie' });
        } else {
            res.json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});