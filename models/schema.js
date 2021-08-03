const mongoose = require('mongoose');

const dbSchema = mongoose.Schema({

    itemID :{
        type: String,
        required: true
    },

    item :{
        type: String,
        required: true
    },

    description :{
        type: String,
        required: true
    },

    price :{
        type: Number,
        required: true
    },

    date :{
        type: Date,
        default: Date.now
    }
});

const entry = mongoose.model('dbscheme', dbSchema);
module.exports = entry;
