import React, { useState, useEffect } from 'react';
import api, { getAnimes, createAnime, updateAnime, deleteAnime } from './api';
import './styles.css';


function App() {
    const [animes, setAnimes] = useState([]);
    const [form, setForm] = useState({ id: null, name: '', description: '', image: '' });

    useEffect(() => {
        fetchAnimes();
    }, []);

    const fetchAnimes = async () => {
        const response = await getAnimes();
        setAnimes(response.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {
            await updateAnime(form.id, form);
        } else {
            await createAnime(form);
        }
        setForm({ id: null, name: '', description: '', image: '' });
        fetchAnimes();
    };

    const handleEdit = (anime) => {
        setForm(anime);
    };

    const handleDelete = async (id) => {
        await deleteAnime(id);
        fetchAnimes();
    };

    return (
        <div>
            <h1>Cadastro de Animes</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Descrição" value={form.description} onChange={handleChange} required />
                <input type="text" name="image" placeholder="URL da Imagem" value={form.image} onChange={handleChange} />
                <button type="submit">{form.id ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            <ul>
                {animes.map((anime) => (
                    <li key={anime.id}>
                        <h2>{anime.name}</h2>
                        <p>{anime.description}</p>
                        {anime.image && <img src={anime.image} alt={anime.name} width="100" />}
                        <button onClick={() => handleEdit(anime)}>Editar</button>
                        <button onClick={() => handleDelete(anime.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
