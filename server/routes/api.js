const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenVerify = require('../middlewarefunction/verifytoken')
const paginate = require('jw-paginate')

let saltRounds = parseInt(process.env.SaltRounds) 

const router = express.Router();

const User = require('../models/user')

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

router.get('/events', (req, res) => {
    let items = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "10",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "11",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "12",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        }
    ];
   
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pager = paginate(items.length, page);

    pager.totalItems = 5
    pager.pageSize = 5
    // get page of items from items array
    const events = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    console.log(pager)
    return res.json({ pager, events });
});

router.get('/special', tokenVerify.verifiedToken ,(req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        },
        {
            "_id": "10",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2014-02-20T14:23:32.511Z"
        }
    ];

     res.json(events);
});


module.exports = router;