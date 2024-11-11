const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const tf = require('@tensorflow/tfjs-node');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

module.exports = app
