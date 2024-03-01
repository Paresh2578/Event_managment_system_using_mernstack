const mongoose = require('mongoose');

const adminSchema =new  mongoose.Schema({
    name : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        type : String,
        unique :true
    },
    password : {
        required : true,
        type : String,
    }
})

module.exports = mongoose.model('admin' , adminSchema);