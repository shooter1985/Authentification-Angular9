const express = require('express');
const jwt = require('jsonwebtoken')

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

module.exports.verifiedToken = verify;
