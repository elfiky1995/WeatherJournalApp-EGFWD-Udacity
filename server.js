// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
app.listen(port, () => {
    console.log(`running on: http://localhost:${port}`);
});

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
})

// Post Route
app.post('/add', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
    // Producing feedback to the Command Line through a working callback function.
    console.log(projectData);
})
