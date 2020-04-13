const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: String,
    description: String,
    date : Date
});

eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('event', eventSchema, 'events')