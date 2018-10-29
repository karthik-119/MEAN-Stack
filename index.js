var express= require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var path = require('path');

var route = require('./routes/route');


var app = express();

const port =3000;




app.use(cors());

app.use(bodyparser.json());

app.use('/api',route);

app.use(express.static(path.join(__dirname,'public')));

app.listen(port,()=>{
    console.log('Listening on port to.. '+ port);
});

mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true } );

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected successfully');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log(err);
    }
});



