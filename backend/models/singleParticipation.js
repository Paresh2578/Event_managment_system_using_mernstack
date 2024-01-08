const mongoose = require('mongoose');

const singleParticipationSchema = new  mongoose.Schema({
    eventName : {
        required : true,
        type : String,
    },
    subEventName : {
        required : true,
        type : String,
    },
    name : {
        required : true,
        type : String,
    },
    Enrollment : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        type : String,
    },
    mobile : {
        required : true,
        type : String,
    },
    
    
})

module.exports = mongoose.model('singleParticipations' , singleParticipationSchema);