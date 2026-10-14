const fs = require('fs');
const http = require('http');
const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');

const root = path.resolve(__dirname, '../dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.map': 'application/json' };
const compiler = webpack(Object.assign({}, config, { mode: 'development' }));
let server;
const watcher = compiler.watch({}, (error, stats) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(stats.toString({ colors: true, modules: false }));
  if (stats.hasErrors() || server) return;
  server = http.createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch (err) {
      res.writeHead(400).end();
      return;
    }
    const file = path.resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
    if (!file.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (err, content) => {
      if (err) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(content);
    });
  }).listen(8080, '127.0.0.1', () => console.log('Open http://localhost:8080'));
});

['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, () => {
  watcher.close(() => {
    if (server) server.close(() => process.exit(0));
    else process.exit(0);
  });
}));
