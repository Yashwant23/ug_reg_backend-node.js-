// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import users data
const users = require('./users.js');

// Initialize express app
const app = express();

// Use cors and bodyParser
app.use(cors());
app.use(bodyParser.json());

// POST endpoint for login
app.post('/login', (req, res) => {
    const { email, admissionNumber, phoneNumber } = req.body;
    console.log({ email, admissionNumber, phoneNumber })
    // Find user in users array
    const user = users.find(u => {
        const isMatch = (u.email === email && u.admissionNumber === admissionNumber && u.phoneNumber === phoneNumber);
        if (isMatch) {
            console.log(`Match found: ${JSON.stringify(u)}`);
        }
        return isMatch;
    });

    if (!user) {
        console.log('No match found');
    }
    console.log(user)
    if (user) {
        // If user found, send user data as response
        console.log("Founded user")
        res.json(user);
    } else {
        // If user not found, send error message
        res.status(400).json({ message: 'Invalid login details' });
    }
});


app.post('/register', (req, res) => {
    // Display the request body on the console
    console.log('Received registration request:');
    console.log(req.body);

    // Send a response (optional)
    res.json({ message: 'Registration successful' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
