var mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    questionTitle :{
        type : String,
        required : true
    },
    questionDescription : {
        type : String,
        required : false
    },
    createdDateTime : {
        type : Number,
        required : true
    }
});
const Questions =module.exports = mongoose.model('Questions',questionSchema);