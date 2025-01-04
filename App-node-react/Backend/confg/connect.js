const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nvapp"
});

// Ajouter cette ligne pour exporter db
module.exports = db;