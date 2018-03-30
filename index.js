const express = require('express');
const path = require('path');
const log = require('./logger');
const pino = require('pino-http')({ logger: log });

const app = express();
app.use(pino);

app.get('*/script.js', (req, res) => res.sendFile(path.join(__dirname, 'dist/bundle.js')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

app.listen(4000, () => log.info('listening on 4000'));
