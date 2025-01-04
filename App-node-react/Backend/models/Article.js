// const express = require('express');
// const router = express.Router();
// const db = require('../confg/connect');

// // Obtenir tous les articles
// router.get("/", (req, res) => {
//     const sql = "SELECT * FROM Article";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Créer un article
// router.post("/", (req, res) => {
//     const sql = "INSERT INTO Article (titre, date, prix) VALUES (?)";
//     const values = [
//         req.body.titre,
//         req.body.date,
//         req.body.prix
//     ];
    
//     db.query(sql, [values], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Mettre à jour un article
// router.put("/:id", (req, res) => {
//     const sql = "UPDATE Article SET titre = ?, date = ?, prix = ? WHERE id = ?";
//     const values = [
//         req.body.titre,
//         req.body.date,
//         req.body.prix
//     ];
//     const id = req.params.id;
    
//     db.query(sql, [...values, id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Supprimer un article
// router.delete("/:id", (req, res) => {
//     const sql = "DELETE FROM Article WHERE id = ?";
//     const id = req.params.id;
    
//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Obtenir un article par ID
// router.get("/:id", (req, res) => {
//     const sql = "SELECT * FROM Article WHERE id = ?";
//     const id = req.params.id;
    
//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// module.exports = router;