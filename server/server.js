const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors')
const dotEnv = require('dotenv').config()
const path = require("path");
const database = require('./database/database')

const api = require('./routes/api')
const event = require('./routes/eventroute')

const PORT = process.env.PORT;

const app = express()
app.use(cors());

// Serve static files
app.use(express.static('uploads'));
app.use(express.static(__dirname + '/dist/ngApp'));

app.use(bodyParser.json());
app.use('/api',api);
app.use('/event',event);
 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/ngApp/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
