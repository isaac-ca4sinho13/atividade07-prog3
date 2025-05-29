const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get('https://api.hgbrasil.com/weather?key=775fe3ed&woeid=455824');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
