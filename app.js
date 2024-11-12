const express = require('express');
const cors = require('cors');
const predictionRoutes = require('./routes/predictionRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/predict', predictionRoutes);

app.use(errorHandler);

module.exports = app;
