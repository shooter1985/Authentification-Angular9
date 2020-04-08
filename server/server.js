const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api')

const PORT = 3000;

const app = express()

app.use(bodyParser.json());
app.use('/api',api);

app.get('/', (req, res) => {
    res.send("hello from the server");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
