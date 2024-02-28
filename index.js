const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.json());

app.get('/sum', (req, res) => {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);

    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        var temp = (`The sum of ${num1} and ${num2} is ${sum}. \n`);
        fs.appendFile('data.txt', temp, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
                res.status(500).send('Error appending to file');
            } else {
                console.log('Data appended to file successfully');
                res.status(200).send(`${temp}`);
            }
        });
    } else {
        res.status(400).send('Please provide valid numbers in query parameters.');
    }
});


app.get('/all', (req,res)=>{
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            console.log("Data fetched");
            res.status(200).send(`Data read from file:\n ${data}`);
        }

    });
})


// http://localhost:3000/sum?num1=10&num2=12




app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
