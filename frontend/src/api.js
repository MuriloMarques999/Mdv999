import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api' // Corrigir para incluir '/api'
});

export const getAnimes = () => api.get('/animes'); // Busca animes
export const createAnime = (anime) => api.post('/animes', anime); // Cria anime
export const updateAnime = (id, anime) => api.put(`/animes/${id}`, anime); // Edita anime
export const deleteAnime = (id) => api.delete(`/animes/${id}`); // Deleta anime

export default api;
