const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = 'C:\\Users\\quadi\\Downloads';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function resolveFile(urlPath){
  let filePath = path.join(ROOT, urlPath);
  if(fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;
  if(!path.extname(filePath)){
    const withHtml = filePath + '.html';
    if(fs.existsSync(withHtml) && fs.statSync(withHtml).isFile()) return withHtml;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const filePath = resolveFile(url === '/' ? 'login.html' : url);

  if(!filePath){
    console.log('[404]', url);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 - Não encontrado</h1><p>' + url + '</p>');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if(err){
      res.writeHead(500);
      res.end('Erro interno');
      return;
    }
    console.log('[OK]', url, '->', path.basename(filePath));
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('SADA rodando em http://0.0.0.0:' + PORT);
});