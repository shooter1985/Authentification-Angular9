const express = require('express');
const jwt = require('jsonwebtoken')
var multer  = require('multer')

var verify = (req, res, next) => {
    if(!req.headers.authorization)
        return res.status(401).send('Unauthorized request1');
    
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null')
        return res.status(401).send('Unauthorized request2');

    jwt.verify(token, process.env.SECRETKEY, (err, payload) => {
        if(err) {
            return res.status(401).send('Unauthorized request3');
        } else {
            req.userId = payload.subject
            next()
        }
    })
}
var verifyAdmin = (req, res, next) => {
const requser = JSON.parse(req.body.eventData)
    if(!requser.user)
        return res.status(401).send('Unauthorized request1');
    
    let token = requser.user
    if(token === 'null')
        return res.status(401).send('Unauthorized request2');

    jwt.verify(token, process.env.SECRETKEY, (err, payload) => {
        if(err) {
            return res.status(401).send('Unauthorized request3');
        } else {
            req.userId = payload.subject
            next()
        }
    })
}

const storage = multer.diskStorage({
    destination: (req, file , callback) => {
        callback(null, 'uploads')
    },
    filename: (req, file, callback) => {
        var mimetype = file.mimetype.split('/')[1]
        callback(null, file.fieldname + '-' + Date.now() + '.' + mimetype)
    }
})
var upload = multer({ storage: storage })

module.exports = {
        verifiedToken : verify,
        verifyAdmin: verifyAdmin,
        upload: upload
    }
