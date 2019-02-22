const express = require('express');
var route= express.Router();
const User = require('../models/users');
const Questions = require('../models/ques');
var path = require('path');
var passwordHash = require('password-hash');
 var app =express();
 var nodemailer = require('nodemailer');
 var session = require('express-session');

 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'meanstackapp.blog@gmail.com',
      pass: 'meanstack@123'
    }
  });
  
route.post('/verify',(req,res)=>{
    User.findOne({email:req.body.email},function(err,result){
        if(err)
        res.json(err);
        else{
        if(result==null){
        res.status(404).json({msg:"Email not found"});
        }
        else if(passwordHash.verify(req.body.password,result.password)){
            if(result.verifiedUser!=1){
                console.log('Account not verified');
                res.status(403);
            }
            else if (typeof localStorage === "undefined" || localStorage === null) {
                var LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
                localStorage.setItem(result.email+"session",result.first_name);
                res.json({"firstname":result.first_name,"email":result.email});
            }
        }
        else
        res.status(403).json({msg:"Invalid Password"});
        }
    })
});
route.post('/add',(req,res,next)=>{
    var data = "dn2edn02knsdn221wmd9";
    var crypto = require('crypto');
    var hashedPassword = passwordHash.generate(req.body.password);
    var verifylink = crypto.createHash('md5').update(data).digest("hex");
    let newUser = new User ({
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        password : hashedPassword,
        mobilenumber : req.body.mobile,
        gender : req.body.gender,
        email : req.body.email,
        hashlink : verifylink,
        verifiedUser : 0
    });
    newUser.save((err,user)=>{
        if(err){
            res.status(500).json({msg:'Failed'+ err});
        }
        else{
            var mailOptions = {
                from: 'meanstackapp-noreply@gmail.com',
                to: req.body.email,
                subject: 'Account Verification',
                html : '<h1>Verify your Account</h1>'+
                        '<p>Click on the following link</p>'+
                        'https://meanstackwithoauth.herokuapp.com/api/accounts/verifyuser/'+verifylink
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            res.status(201).json({msg:user.first_name+' Added sucessfully'});
        }

    });
});

route.get('/privacypolicy',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/PrivacyPolicy.html'));
})
route.get('/TermsnServices',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/TermnServices.html'));
});
route.get('/accounts/verifyuser/:hashlink',(req,res,next)=>{
    User.findOne({hashlink:req.params.hashlink},function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else{
            if(result==null)
            res.send('Something Went Wrong!!');
            else
            {
                var myquery = { hashlink: req.params.hashlink };
                var newvalues = { $set: {verifiedUser: 1, hashlink: req.params.hashlink } };
                User.updateOne(myquery, newvalues, function(err, res) {
                res.redirect('/');
                 });
            }   
         }
    })

});
route.get('/retrieve',(req,res,next)=>{
    User.find({},{password:0},function(err,Users){
        if(err)
        res.status(500).json(err);
        else{
        res.status(200).json(Users);
        }
    })
});
route.get('/qList',(req,res,next)=>{
    Questions.find({},function(err,questions){
        if(err)
        res.status(500).json(err);
        else{
        res.status(200).json(questions);
        }
    })
});
route.get('/profile/:email',(req,res,next)=>{
    User.findOne({email:req.params.email},{password:0},function(err,result){
        if(err)
        res.status(500).json(err);
        else
        res.status(201).json(result);
    })
});
route.get('/logout/:email',(req,res,next)=>{
    User.findOne({email:req.params.email},function(err,result){
    if(localStorage.getItem(result.email+"session")!=undefined||localStorage.getItem(result.email+"session")!=null){
    localStorage.removeItem(result.email+"session");
    res.status(200).json({"msg":"Logged out successfully","status":200});
    }
    else
    res.status(500),json({"msg":"Internal server error","status":500});
})
});
route.delete('/delete/:id',(req,res,next)=>{
    User.deleteOne({_id:req.params.id},function(err,result){
        if(err){
            res.status(500).json(err);
        }
        else
        {
            res.status(200).json(result);   
        }
    });
})
route.post('/savequestion',(req,res,next)=>{
    let newQuestion = new Questions({
        first_name : req.body.first_name,
        email : req.body.email,
        questionTitle :req.body.questionTitle,
        questionDescription : req.body.questionDescription,
        createdDateTime : req.body.createdDateTime,
    })
    newQuestion.save((err,result)=>{
        if(err)
        res.status(500).json(err);
        else
        res.status(201).json({"Msg":"Question Posted Successfully"});

    });

})


module.exports = route;