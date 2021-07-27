// const express = require('express');
// const User = require('../schema/userSchema');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const router = express.Router();
// router.get('/',async(req,res,next)=>{
//     try{
//         const user = await User.find({});
//         res.send(user);
//         //const result = await Club.populate(club, {path:'member_uid_list'});
//     }catch(err){
//         console.error(err);
//         next(err);
//     }
// });

// ejs 이용
var express = require('express');
var router = express.Router();
const db = require('./../db_info');

/*GET home page */
router.get('/', function(req, res, next) {
    db.getAllServices((rows) => {   //db객체에서 getAllServices함수를 호출해 db 전체 조회
       res.render('serviceList', {rows: rows});
    });
});

module.exports = router;