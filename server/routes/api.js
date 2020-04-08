const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("From api router");
});


module.exports = router;