const express = require('express');
const router = express.Router();
const User = require('../models/user')

const mongoose = require('mongoose')

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
const db = 'mongodb+srv://merzouk:merzouk@cluster0-nu7un.mongodb.net/eventsdb?retryWrites=true&w=majority'


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
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredUser);
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
                res.status(401).send ('Invalid Email');
            } else if(user.password !== userData.password){
                res.status(401).send ('Invalid Password');
            } else {
                res.status(200).send (user);
            }
        }
    })
});

router.get('/events', (req, res) => {
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

router.get('/special', (req, res) => {
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