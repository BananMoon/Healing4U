// router 이용
var express = require('express');
var router = express.Router();
const db = require('./../db_info');

/*-------------패널 메인 화면------------*/
//html 파일 보내보자

router.get('/', function(req, res) {
    //html파일을 브라우저에 보낼 수 있음
    //res.sendFile(__dirname + '/main.html');
    //ejs이용
    console.log('get request');
    db.getOneService((data) => {   //db객체에서 getAllServices함수를 호출해 db 전체 조회
      res.render('background', {rows: data});
    });
  });
  
module.exports = router;
//   db.getAllServices((datas) => {   //db객체에서 getAllServices함수를 호출해 db 전체 조회
//     res.render('background', {rows: datas});
//});
//});


// /*GET home page */
// router.get('/findOne', function(req, res, next) {
//     db.getOneService((data) => {   //db객체에서 getAllServices함수를 호출해 db 전체 조회
//         res.render('background', {rows: data});
//     });
// });

