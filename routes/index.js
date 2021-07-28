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
  
  /*GET home page */
router.get('/findOne', function(req, res, next) {
  db.getHealingService((data) => {
    //여기서 조건문추가
    //if (weather_API === '맑음') {}  날씨API 정보가 맑음이면 video_src의 주소에서 폴더명으로 구분하기. {s3 주소}/sunny/{영상명}.mp4
    let sunnyList = [];
    // if 실시간 날씨가 맑음이면 맑음 데이터 전달
    data.forEach((row, index)=>{
      if (row.weather==='맑음') {
        sunnyList.push(row);
      }
    });
    res.render('background', {weatherList: sunnyList});  //sunny에 해당하는 데이터만
    
    //if (weather_API === '비') {rainyList 전달}

  });
});

module.exports = router;
