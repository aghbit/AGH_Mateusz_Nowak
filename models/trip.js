const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lat:{
        type: Number,
        require: true
    },
    lng:{
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    thumbnail: {
        type: String,
    },
    images: {
        type: [String],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


module.exports = mongoose.model('Trip', tripSchema)