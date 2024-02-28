const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to handle JSON data
app.post('/dataadd', (req, res) => {
    // Extract JSON data from the request body
    const jsonData = req.body;

    // Write JSON data to a file
    fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
        } else {
            console.log('Data written to file successfully');
            res.status(200).send('Data written to file successfully');
        }
    });
});

// GET endpoint to retrieve JSON data from file
app.get('/datarecv', (req, res) => {
    // Read data from file
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});