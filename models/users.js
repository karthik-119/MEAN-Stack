var mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    first_name : {
        type : String,
        required : true
    },
    last_name :{
        type : String,
        required : false
    },
    password : {
        type : String,
        required : true
    },
    mobilenumber :{
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hashlink : {
        type  : String,
        required : false
    },
    verifiedUser : {
        type : Number,
        required : true
    }

});

const User =module.exports = mongoose.model('User',userSchema);