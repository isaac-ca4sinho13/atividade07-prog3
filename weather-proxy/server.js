const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    const response = await axios.get(`https://api.hgbrasil.com/weather?key=775fe3ed&city_name=${city}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
