const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenVerify = require('../middlewarefunction/verifytoken')
/*const paginate = require('jw-paginate')
const mongoosePaginate = require('mongoose-paginate')*/

let saltRounds = parseInt(process.env.SaltRounds) 

const router = express.Router();

const User = require('../models/user')

router.get('/', (req, res) => {
    res.send("From api router");
});

router.post('/register', (req, res) => {
    let userData = req.body;
    // hashage du password
    User.findOne({email:userData.email}, (err, result) => {
        if(err) {
            res.status(401).send("Erreur Serveur");
        } else {
            if(result)
            {
                res.status(401).send('Email déja pris !!');
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(userData.password, salt, function(err, hash) {
                        if(err) {
                            res.status(401).send('Register Cancel, retry!!!');
                        }else {
                            userData.password = hash
                            let user = new User(userData)
                            user.save((err, registeredUser) => {
                                if (err) {
                                    res.status(401).send('Erreur du serveur!!');
                                } else {
                                    let payload = {subject: registeredUser._id}
                                    let token = jwt.sign(payload, process.env.SECRETKEY)
                                    res.status(200).send({token,registeredUser:{email: registeredUser.email,_id: registeredUser._id, nom:registeredUser.nom}});
                                }
                            })
                        }
                    });
                });
            }
        }
    })
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email:userData.email}, (err, user) => {
        if(err) {
            console.log(err);
        } else {
            if(!user) {
                res.status(401).send ('Invalid Email')
            } else {
                bcrypt.compare(userData.password, user.password, (err, result) => {
                    if(result) {
                        let payload = {subject: user._id}
                        let token = jwt.sign(payload, process.env.SECRETKEY)
                        res.status(200).send ({token,user:{email: user.email,_id: user._id, nom:user.nom}});
                    } else {
                        res.status(401).send ('Invalid Password');
                    } 
                });
            }
        }
    })
});

module.exports = router