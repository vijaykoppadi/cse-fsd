// Importing required modules
const http = require("http");   // To create the server
const fs = require("fs");       // To read files (like HTML files)
const path = require("path");   // To manage file paths

// Create the server
const server = http.createServer((req, res) => {

    // By default, send JSON response
    res.setHeader("Content-Type", "application/json");

    // ------------------ ROUTE: HOME PAGE ------------------
    // If user opens http://localhost:3000/
    if (req.url === "/" && req.method === "GET") {
        res.end(JSON.stringify({ message: "Home Page" })); // Send JSON
    }

    // ------------------ ROUTE: ABOUT PAGE ------------------
    // If user opens http://localhost:3000/about
    else if (req.url === "/about" && req.method === "GET") {
        res.end(JSON.stringify({ message: "About Page" })); // Send JSON
    }

    // ------------------ ROUTE: SERVE LOGIN HTML PAGE ------------------
    // If user opens http://localhost:3000/login (GET request)
    else if (req.url === "/login" && req.method === "GET") {

        // Path to login.html file in same folder
        const filePath = path.join(__dirname, "login.html");

        // Read login.html file
        fs.readFile(filePath, "utf8", (err, data) => {

            // If file not found or error occurs
            if (err) {
                res.statusCode = 500; // Server error
                return res.end(JSON.stringify({ message: "File not found" }));
            }

            // If file found, send HTML instead of JSON
            res.setHeader("Content-Type", "text/html");
            res.end(data); // Send the HTML page
        });
    }

    // ------------------ ROUTE: LOGIN FORM SUBMIT (POST REQUEST) ------------------
    // When user submits login form
    else if (req.url === "/login" && req.method === "POST") {

        let body = ""; // To store incoming form data

        // Collect chunks of form data
        req.on("data", chunk => {
            body += chunk;
        });

        // When all data is received
        req.on("end", () => {

            // Convert form data (username=vijay&password=1234)
            const params = new URLSearchParams(body);

            // Extract values from form
            const data = {
                username: params.get("username"),
                password: params.get("password")
            };

            // Send response back to browser
            res.end(JSON.stringify({
                message: "Login Successful",
                receivedData: data
            }));
        });
    }

    // ------------------ DEFAULT ROUTE ------------------
    // If route not found
    else {
        res.statusCode = 404; // Not found error
        res.end(JSON.stringify({ message: "Page Not Found" }));
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
