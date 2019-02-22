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
// Send all other requests to the Angular app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port,()=>{
    console.log('Listening on port to.. '+ port);
});
app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname + '/404.html'));
  });
mongoose.connect('mongodb://admin:dbadmin123@ds143953.mlab.com:43953/meanstackdb',{ useNewUrlParser: true } );

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected successfully');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log(err);
    }
});



