const mongoose = require('mongoose');

const eventSchema =new  mongoose.Schema({
    name : {
        required : true,
        type : String,
    },
    date : {
        required : true,
        type : String,
    },
    eventPosterUrl : {
        required : true,
        type : String,
    },
    subEvents : [String]
})

module.exports = mongoose.model('events' , eventSchema);