const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const MAL_API_URL = 'https://api.myanimelist.net/v2';

app.get('/anime/ranking', async (req, res) => {
  try {
    const { ranking_type, limit } = req.query;
    const response = await axios.get(`${MAL_API_URL}/anime/ranking`, {
      headers: {
        'X-MAL-CLIENT-ID': '09ca53e8e4f9cd4d40d8fafafb7285fb',
      },
      params: {
        ranking_type,
        limit,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
