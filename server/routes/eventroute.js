const express = require('express');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const tokenVerify = require('../middlewarefunction/verifytoken')
const paginate = require('jw-paginate')
//const path = require("path");
const router = express.Router();
var cpUpload = tokenVerify.upload.single('file')

const Event = require('../models/events')

router.get('/events', (req, res) => {
    
    const pageq = parseInt(req.query.page) || 1;
        Event.paginate({special: false}, { page: pageq, limit: 10 }, function(error, pageCount) {
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

router.post('/events_by_user',tokenVerify.verifyTokenAdmin, (req, res) => {
    const pageq = parseInt(req.query.page) || 1;
    Event.paginate({user: req.userId}, { page: pageq, limit: 10 }, function(error, pageCount) {
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

router.post('/search_event',tokenVerify.verifyTokenAdmin, (req, res) => {
    const pageq = parseInt(req.query.page) || 1;
    const query  = req.query.query
    const userRegex = new RegExp(query, 'i')
    Event.paginate({user: req.userId, name: userRegex}, { page: pageq, limit: 10 }, function(error, pageCount) {
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

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    Event.deleteOne({_id: id}, (err, result) => {
        if(err)
            res.status(401).send(err);
        else{
            res.status(200).send(result);
        }
    })
});

router.get('/getimage/uploads/:id', (req, res) => {
    const image = req.params.id
    console.log(image)

    fs.readFile(`./uploads/${image}`, function (err, content) {
        if (err) {
            res.status(401).send('no image found')   
        } else {
            //specify the content type in the response will be an image
            //res.writeHead(200,{'Content-type':'image/jpg'});
            res.status(200).send(content);
        }
    });
});

router.get('/special', tokenVerify.verifiedToken ,(req, res) => {
    const pageq = parseInt(req.query.page) || 1;

    Event.paginate({special: true}, { page: pageq, limit: 10 }, function(error, pageCount) {
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

router.post('/save', (req, res) => {
    cpUpload(req,res,(err) => {
        if(err) {
           res.status(401).send('erreur uploading the image');
        } else {
            const reqBody = JSON.parse(req.body.eventData)
            //reqBody.image = req.file.path
            tokenVerify.verifyAdmin(req,res, () => {
                reqBody.user = req.userId
                reqBody.image = req.file.filename
                let eventData = new Event(reqBody)

                eventData.save((err, event) => {
                    if(err){
                        console.log(err)
                        res.status(401).send('Erreur du serveur')
                    } else {
                        res.status(200).send(event);
                    }
                })
            })
        }
    })
});


module.exports = router;