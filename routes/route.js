const express = require('express');
var route= express.Router();

const User = require('../models/users')

route.post('/add',(req,res,next)=>{
    let newUser = new User ({
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        mobilenumber : req.body.mobile,
        gender : req.body.gender,
        email : req.body.email
    });
    newUser.save((err,user)=>{
        if(err){
            res.status(500).json({msg:'Failed'+ err});
        }
        else{
            res.status(201).json({msg:user.first_name+' Added sucessfully'});
        }

    });
});


route.get('/retrieve',(req,res,next)=>{
    User.find(function(err,Users){
        res.json(Users);
    })
})

route.delete('/delete/:id',(req,res,next)=>{
    User.deleteOne({_id:req.params.id},function(err,result){
        if(err){
            res.json(err);
        }
        else
        {
            res.json(result);   
             }
    });
})


module.exports = route;