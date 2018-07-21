const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello, Mocha!');
});

exports.listen = port => {
  console.log('Listening on: ' + port); // eslint-disable-line
  server.listen(port);
};

exports.close = () => {
  server.close();
};
