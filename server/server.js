const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors')
const dotEnv = require('dotenv').config()

const api = require('./routes/api')

const PORT = process.env.PORT;

const app = express()
app.use(cors());

app.use(bodyParser.json());
app.use('/api',api);

app.get('/', (req, res) => {
    res.send("hello from the server");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
