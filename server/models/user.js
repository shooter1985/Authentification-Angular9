const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    prenom: String,
    nom: String,
    email : String,
    password: String,
    adresse: String,
    ville: String,
    postal: String
})

module.exports = mongoose.model('user', userSchema, 'users')