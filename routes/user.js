const express = require('express');
const User = require('../schema/userSchema');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
router.get('/',async(req,res,next)=>{
    try{
        const user = await User.find({});
        res.send(user);
        //const result = await Club.populate(club, {path:'member_uid_list'});
    }catch(err){
        console.error(err);
        next(err);
    }
});
