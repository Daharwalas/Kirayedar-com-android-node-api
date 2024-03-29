const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    city : {
        type : String,
        required: true
    },
    locality : {
        type : String,
        required: true
    },
    price :{
        type : String,
        required: true
    },  
    imageUrl :{
        type : String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    booked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = Property = mongoose.model('Property', PropertySchema);
