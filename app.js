const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('./banco/db.js');
const app = express();
const dbPath = './banco/banco.db';
const db = new Database(dbPath);

app.use(bodyParser.json());
app.use(cors());


app.post('/api/tabelas', async (req, res) => {
    try {
        const result = await db.criarTabelas();
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para inserir um tópico
app.post('/api/topicos', async (req, res) => {
    const { nome, id_est, posicao, polaridade } = req.body;
    try {
        const result = await db.inserirTopico(nome, id_est, posicao, polaridade);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/subtopicos', async (req, res) => {
    const { nome, id_topico, posicao } = req.body;
    try {
        const result = await db.inserirSubtopico(nome, id_topico, posicao);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para consultar tópicos
app.get('/api/topicos/:id', async (req, res) => {
    const id_est = req.params.id || null;
    try {
        const topicos = await db.consultarTopicos(id_est);
        res.status(200).json(topicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/topicosPolaridade', async (req, res) => {
    const { id_est, polaridade } = req.query; // Corrigido para req.query
    console.log(id_est, polaridade);
    try {
        const topicos = await db.consultarTopicosPolaridade(id_est, polaridade);
        res.status(200).json(topicos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/topico/:id', async (req, res) => {
    const id_topico = req.params.id || null;
    try {
        const topicos = await db.consultarTopico(id_topico);
        res.status(200).json(topicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/topico', async (req, res) => {
    const { nome, id_topico, posicao } = req.body;
    try {
        const topicos = await db.atualizarTopico(nome, id_topico, posicao);
        res.status(200).json(topicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/subtopico', async (req, res) => {
    const { nome, id_subtopico, posicao } = req.body;
    try {
        const topicos = await db.atualizarSubtopico(nome, id_subtopico, posicao);
        res.status(200).json(topicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/subtopicos/:id', async (req, res) => {
    const id_topico = req.params.id || null;
    try {
        const subtopicos = await db.consultarSubtopicos(id_topico);
        res.status(200).json(subtopicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para consultar est
app.get('/api/areas/:est', async (req, res) => {
    let est = req.params.est || null;
    try {
        let resultado = await db.consultarEstAreas(est);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/area/:id', async (req, res) => {

    let id_item = req.params.id || null;
    console.log(id_item)
    try {
        let resultado = await db.consultarEstArea(id_item);
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
});


app.delete('/api/topicos/:id', async (req, res) => {
    const id_topico = req.params.id || null;
    try {
        let teste = await db.deletarTopico(id_topico);
        console.log(teste);
        return teste;
    } catch (error) {
        console.log('deu ruim')
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/subtopico/:id', async (req, res) => {
    const id_subtopico = req.params.id || null;
    try {
        await db.deletarSubtopico(id_subtopico);
    } catch (error) {
        console.log('deu ruim')
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/subtopicos/:id', async (req, res) => {
    const id_subtopico = req.params.id || null;
    try {
        await db.deletarSubtopicos(id_subtopico);
    } catch (error) {
        console.log('deu ruim')
        res.status(500).json({ error: error.message });
    }
});

// Rota para fechar a conexão com o banco de dados
app.get('/api/teste', async (req, res) => {
    try {
        res.send('Hello, this is a test route!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT_APP || 3001;
app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});

console.log('foi');


