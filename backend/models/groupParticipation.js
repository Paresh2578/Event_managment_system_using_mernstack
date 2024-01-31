const mongoose = require('mongoose');

const groupParticipationSchema = new  mongoose.Schema({
    eventName : {
        required : true,
        type : String,
    },
    subEventName : {
        required : true,
        type : String,
    },
    subEventId : {
        required : true,
        type : String,
    },
    members : [
        {
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
        }
    ]
    
    
})

module.exports = mongoose.model('groupParticipations' , groupParticipationSchema);