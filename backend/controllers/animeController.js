const db = require('../models/animeModel');

// Buscar todos os animes
exports.getAnimes = (req, res) => {
    db.all('SELECT * FROM animes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

// Criar um novo anime
exports.createAnime = (req, res) => {
    const { name, description, image } = req.body;
    db.run('INSERT INTO animes (name, description, image) VALUES (?, ?, ?)', [name, description, image], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, description, image });
    });
};

// Atualizar um anime existente
exports.updateAnime = (req, res) => {
    const { name, description, image } = req.body;
    const { id } = req.params;
    db.run('UPDATE animes SET name = ?, description = ?, image = ? WHERE id = ?', [name, description, image, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Anime atualizado com sucesso!" });
    });
};

// Deletar um anime
exports.deleteAnime = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM animes WHERE id = ?', id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Anime excluído com sucesso!" });
    });
};
