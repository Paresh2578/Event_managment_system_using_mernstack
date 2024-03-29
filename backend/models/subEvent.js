const mongoose = require('mongoose');

const subEventSchema =new  mongoose.Schema({
    eventId : {
         required: true,
         type :String
    },
    subEventname : {
        required : true,
        type : String,
    },
    category : {
        required : true,
        type : String,
    },
    startTime: {
        required : true,
        type : String,
    },
    endTime: {
        required : true,
        type : String,
    },
    seats : {
        required : true,
        type : Number,
    },
    groupMember : {
        required : true,
        type : Number,
    },
    isGroup : {
        required : true,
        type : Boolean,
    },
    pay : {
        required : true,
        type : Number,
    },
    paid : {
        required : true,
        type : Boolean,
    },
    subEventPosterUrl : {
        required : true,
        type : String,
    },
    winnerId : {
        type: String,
        default : ""
    },
    discription : {
        type : String
    },
    coordinatorId :{
        required : true,
        type : String,
    },
    singleParticipation : [String],
    groupParticipation : [String]
    
})

module.exports = mongoose.model('subEvents' , subEventSchema);