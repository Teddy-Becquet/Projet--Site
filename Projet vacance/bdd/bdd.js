const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '192.168.64.175',
  user: 'votre_utilisateur',
  password: 'votre_mot_de_passe',
  database: 'votre_base_de_données',
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM utilisateurs WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
        return;
      }

      if (results.length > 0) {
        res.send({ success: true });
      } else {
        res.status(401).send({ success: false, message: 'Identifiants incorrects' });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});