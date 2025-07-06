const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Backend работает'));
app.listen(5000, () => console.log('Сервер запущен на порту 5000'));