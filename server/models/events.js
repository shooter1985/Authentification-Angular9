const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const User = require('./user')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: String,
    description: String,
    startDate: Date, 
    endDate: Date,
    createdAt: Date,
    updatedAt: Date,
    localisation: String,
    tarif: String,
    infoPratique: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('event', eventSchema, 'events')