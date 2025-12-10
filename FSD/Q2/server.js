// Load Express
const express = require('express');
const app = express();

// Allow Express to read form data (HTML forms)
app.use(express.urlencoded({ extended: true }));

// Allow Express to read JSON (if needed)
app.use(express.json());

// Serve public folder (HTML files)
app.use(express.static("public"));

// Sample Data
let users = [
    { id: 1, name: "Vijay" },
    { id: 2, name: "Babu" }
];


// ==========================
// READ (GET) USERS
// ==========================
app.get('/api/users', (req, res) => {
    res.json(users);
});


// ==========================
// CREATE (POST) USER
// ==========================
app.post('/api/users', (req, res) => {
    const name = req.body.name;   // from form
    const newUser = {
        id: users.length + 1,
        name: name
    };

    users.push(newUser);
    res.redirect("/index.html");  // show updated list
});


// ==========================
// UPDATE USER (POST for beginners)
// ==========================
app.post('/api/update', (req, res) => {
    const id = parseInt(req.body.id);
    const name = req.body.name;

    users = users.map(user =>
        user.id === id ? { ...user, name } : user
    );

    res.redirect("/index.html");
});


// ==========================
// DELETE USER (POST for beginners)
// ==========================
app.post('/api/delete', (req, res) => {
    const id = parseInt(req.body.id);

    users = users.filter(user => user.id !== id);

    res.redirect("/index.html");
});


// ==========================
// Start Server
// ==========================
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
