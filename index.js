require('dotenv').config();

const express = require('express');
const path = require('path');
const log = require('./logger');
const pino = require('pino-http')({ logger: log });
const favicon = require('serve-favicon');

const { PORT } = require('./config/main.config');

const app = express();
app.use(favicon(path.join((__dirname, 'favicon.png'))));
app.use(pino);

app.get('*/script.js', (req, res) => res.sendFile(path.join(__dirname, 'dist/bundle.js')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

app.listen(PORT, () => log.info(`listening on ${PORT}`));
