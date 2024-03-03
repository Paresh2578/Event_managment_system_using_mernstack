const mongoose = require('mongoose');

const winnerSchema =new  mongoose.Schema({
    subEventId : {
        type : String,
        require : true,
        unique: true
    },
    first: {
        type : String,
        // require : true
    },
    secound: {
        type : String,
        // require : true
    },
    third: {
        type : String,
        // require : true
    },
    
})

module.exports = mongoose.model('winner' , winnerSchema);