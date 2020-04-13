const express = require('express');
const jwt = require('jsonwebtoken')
const tokenVerify = require('../middlewarefunction/verifytoken')
const paginate = require('jw-paginate')

const router = express.Router();

const Event = require('../models/events')

const mongoose = require('mongoose')

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
const db = process.env.DB

mongoose.connect(db, options, (err) => {
    if(err)
        console.log(`Error ! ${err}`)
    else
        console.log('connnected to mongodb')
})

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

/**
 * querying for `all` {} items in `MyModel`
 * paginating by second page, 10 items per page (10 results, page 2)
 

}**/

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