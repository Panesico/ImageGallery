const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname
    const pathname = url.parse(req.url).pathname;

    // Set the file to serve based on the pathname
    let filePath = '';

    switch (pathname) {
        case '/':
            filePath = 'index.html';
            break;
        case '/auth':
            filePath = 'auth.html';
            break;
        default:
            filePath = '404.html'; // You can create a 404.html for not found pages
    }

    // Resolve the full path to the file
    const fullPath = path.join(__dirname, filePath);

    // Read and serve the HTML file
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
