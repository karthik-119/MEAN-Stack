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
    }

});

const User =module.exports = mongoose.model('User',userSchema);