const express = require('express');
const db = require('../db');

const router = express.Router();

// GET - Buscar todos os animes
router.get('/', (req, res) => {
    db.all("SELECT * FROM animes", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST - Criar um novo anime
router.post('/', (req, res) => {
    const { name, description, image } = req.body;
    db.run("INSERT INTO animes (name, description, image) VALUES (?, ?, ?)", 
        [name, description, image], 
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, name, description, image });
        }
    );
});

// PUT - Editar anime por ID
router.put('/:id', (req, res) => {
    const { name, description, image } = req.body;
    const { id } = req.params;
    db.run("UPDATE animes SET name = ?, description = ?, image = ? WHERE id = ?", 
        [name, description, image, id], 
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id, name, description, image });
        }
    );
});

// DELETE - Remover anime por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM animes WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Anime deletado com sucesso", id });
    });
});

module.exports = router;
