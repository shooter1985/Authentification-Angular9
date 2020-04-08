const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
const db = 'mongodb+srv://merzouk:merzouk@cluster0-nu7un.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(db, options, (err) => {
    if(err)
        console.log(`Error ! ${err}`)
    else
        console.log('connnected to mongodb')
})

router.get('/', (req, res) => {
    res.send("From api router");
});


module.exports = router;