// Minimal static server that mimics GitHub Pages for a project site:
// serves <root> under /<base>/ with gzip for text assets.
// Usage: node serve-static.mjs <root> <base> <port>
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const [, , root, base = 'garretthead-portfolio', port = '8080'] = process.argv;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.map': 'application/json',
};
const compressible = new Set(['.html', '.js', '.css', '.json', '.txt', '.map']);

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const prefix = `/${base}/`;
    if (!url.pathname.startsWith(prefix)) {
      res.writeHead(404).end();
      return;
    }
    let rel = decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html';
    let file = path.join(root, rel);
    if (!file.startsWith(path.resolve(root))) {
      res.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root, 'index.html');
    const ext = path.extname(file);
    let body = fs.readFileSync(file);
    const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'max-age=600' };
    if (compressible.has(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) {
      body = zlib.gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, headers).end(body);
  })
  .listen(Number(port), () => console.log(`serving ${root} at http://localhost:${port}/${base}/`));
