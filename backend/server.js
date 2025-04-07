const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const animeRoutes = require('./routes/animeRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('upload'));
app.use('/api/animes', animeRoutes); // Rota correta para os animes

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
