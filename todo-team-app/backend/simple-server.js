// SIMPLE GUARANTEED WORKING SERVER
const http = require('http');
const PORT = 6001; // Using a new port

const server = http.createServer((req, res) => {
  // Handle ALL requests the same way
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('🚀 Server is working perfectly!\n');
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`This server will respond to ANY request with success`);
});