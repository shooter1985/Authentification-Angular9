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
app.use(express.static('uploads'));

app.use(bodyParser.json());
app.use('/api',api);
app.use('/event',event);
 
app.get('/', (req, res) => {
    res.send("hello from the server");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
