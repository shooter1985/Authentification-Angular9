const express = require('express');
const jwt = require('jsonwebtoken')
const tokenVerify = require('../middlewarefunction/verifytoken')
const paginate = require('jw-paginate')

const router = express.Router();

const Event = require('../models/events')

router.get('/events', (req, res) => {
    
    const pageq = parseInt(req.query.page) || 1;
        Event.paginate({}, { page: pageq, limit: 10 }, function(error, pageCount) {
            if (error) {
                console.error('error: ', error);
            } else {
                // get pager object for specified page
                const pager = paginate(pageCount.total, pageq);
                // get page of items from items array
                return res.json({ pager, events: pageCount.docs });
            }
        })
});

router.get('/events/:id', (req, res) => {
    const id = req.params.id
        Event.findById(id, (err, result) => {
            if (err)
                res.status(401).send(err);
            else {
                res.status(200).send(result);
            }
        })
})

  router.get('/special', tokenVerify.verifiedToken ,(req, res) => {
    const pageq = parseInt(req.query.page) || 1;

    Event.paginate({}, { page: pageq, limit: 6 }, function(error, pageCount) {
        if (error) {
          console.error('error: ', error);
        } else {
            // get pager object for specified page
            const pager = paginate(pageCount.total, pageq);
            // get page of items from items array
            return res.json({ pager, events: pageCount.docs });
        }
    })
});


module.exports = router;