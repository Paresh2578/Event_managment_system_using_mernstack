const mongoose = require('mongoose');

const coordinatorSchema =new  mongoose.Schema({
    coordinatorName : {
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
    }
    
})

module.exports = mongoose.model('coordinators' , coordinatorSchema);