const mongoose = require('mongoose')

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
const db = process.env.DB

module.exports =  mongoose.connect(db, options, (err) => {
    if(err)
        console.log(`Error ! ${err}`)
    else
        console.log('connnected to mongodb')
})