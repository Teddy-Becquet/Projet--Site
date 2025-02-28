const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  //... vos paramètres de connexion
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifier si le nom d'utilisateur existe déjà
    const [existingUsers] = await db
      .promise()
      .query('SELECT * FROM utilisateurs WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .send({ success: false, message: 'Nom d\'utilisateur déjà utilisé' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel utilisateur
    await db
      .promise()
      .query('INSERT INTO utilisateurs (username, password) VALUES (?, ?)', [
        username,
        hashedPassword,
      ]);

    res.send({ success: true, message: 'Inscription réussie' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Erreur serveur' });
  }
});

//... le reste de votre code