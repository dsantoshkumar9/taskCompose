const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


app.use(express.json());

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'password',
    database : 'my_db'
  });

app.get('/sum', (req, res) => {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);

    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        const query = `INSERT INTO sums (num1, num2, result) VALUES (${num1}, ${num2}, ${sum})`;
        db.query(query, (err) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Error storing sum in database');
            } else {
                console.log('Sum stored in database successfully');
                res.status(200).send(`The sum of ${num1} and ${num2} is ${sum}.`);
            }
        });
        
    } else {
        res.status(400).send('Please provide valid numbers in query parameters.');
        
    }
});


app.get('/all', (req, res) => {
    const query = 'SELECT * FROM sums';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching sums from database');
        } else {
            console.log('Sums fetched from database');
            const sums = results.map(({ num1, num2, result }) => `The sum of ${num1} and ${num2} is ${result}`).join('\n');
            res.status(200).send(`All sums:\n${sums}`);
        }
    });
});



// http://localhost:3000/sum?num1=10&num2=12




app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
