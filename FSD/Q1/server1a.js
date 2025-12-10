// Importing the 'http' module that allows us to create a web server
const http = require('http');

// Creating the server
// req = request (data coming from browser)
// res = response (data we send back to browser)
const server = http.createServer((req, res) => {

    // Setting the response headers
    // 200 = OK (successful response)
    // 'Content-Type': 'text/plain' means we are sending plain text
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Sending the response message to the browser
    res.end('Hello, this is my first Node.js Server!');
});

// Making the server listen on port 3000
server.listen(3000, () => {

    // Message printed in the terminal to tell server is running
    console.log('Server is running on http://localhost:3000');
});
