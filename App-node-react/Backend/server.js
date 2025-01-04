const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const app = express();

// Importer la configuration de la base de données
const db = require('./confg/connect');

// Vérifier si le dossier 'uploads' existe, sinon le créer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuration de Multer pour gérer les téléchargements d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Utiliser le dossier 'uploads'
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname); // Nom unique basé sur l'horodatage
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Rendre le dossier des images accessible publiquement

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Routes Fournisseur
app.get("/", (req, res) => {
    const sql = "SELECT * FROM fournisseur";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO fournisseur (`nom`,`prenom`,`CIN`,`age`,`Email`) VALUES (?)";
    const values = [
        req.body.nom,
        req.body.prenom,
        req.body.CIN,
        req.body.age,
        req.body.Email
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json('error');
        return res.json(data);
    });
});

app.put('/update:id', (req, res) => {
    const sql = "UPDATE fournisseur SET nom = ?, prenom = ?, CIN = ?, age = ?, Email = ? WHERE id = ?";
    const values = [
        req.body.nom,
        req.body.prenom,
        req.body.CIN,
        req.body.age,
        req.body.Email
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json('error');
        return res.json(data);
    });
});

app.delete('/fournisseur/:id', (req, res) => {
    const sql = "DELETE FROM fournisseur WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json('error');
        return res.json(data);
    });
});

// Routes Article
app.post('/createarticle', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO article (`titer`, `date`, `prix`, `image`) VALUES (?)";
    const values = [
        req.body.titer,
        req.body.date,
        req.body.prix,
        req.file ? req.file.filename : null // Stocker le nom de fichier ou null si aucune image
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json('error');
        return res.json(data);
    });
});

app.get("/articles", (req, res) => {
    const sql = "SELECT * FROM article";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});


app.put('/updatearticle/:id', upload.single('image'), (req, res) => {
    // Vérifier si une image a été téléchargée, si oui, on ajoute la nouvelle image
    let updateFields = [
        req.body.titer,
        req.body.date,
        req.body.prix
    ];

    // Si une nouvelle image est téléchargée, on ajoute le nom de fichier de l'image
    if (req.file) {
        updateFields.push(req.file.filename); // Ajoute le nom du fichier image
    } else {
        // Si aucune image n'est téléchargée, on ne met pas à jour le champ 'image'
        updateFields.push(null); // Mettre null si aucune image
    }

    const id = req.params.id; // Récupérer l'ID de l'article à partir des paramètres de l'URL

    // Préparer la requête SQL pour la mise à jour de l'article
    const sql = "UPDATE article SET titer = ?, date = ?, prix = ?, image = ? WHERE id = ?";
    
    // Ajouter l'ID à la fin de la liste des valeurs
    updateFields.push(id);

    // Exécuter la requête SQL
    db.query(sql, updateFields, (err, data) => {
        if (err) {
            return res.json('Error: ' + err); // Gérer l'erreur
        }
        return res.json(data); // Retourner les données de la mise à jour
    });
});


// Route pour supprimer un article
app.delete('/deletearticle/:id', (req, res) => {
    const sql = "DELETE FROM article WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json('error');
        return res.json(data);
    });
});



// Lancement du serveur
    app.listen(8082, () => {
        console.log("Server listening on port 8082");
    });
