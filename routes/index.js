// router 이용
var express = require('express');
var router = express.Router();
const db = require('../db_info');
const clock = require('../public/js/main/clock');

const moment= require("moment");

router.use((req, res, next)=>{
    res.locals.moment= moment;
    next();
});
/*-------------패널 메인 화면------------*/
/*GET home page */
router.get('/', function(req, res) {
  db.getHealingService((data) => {
    //html파일을 브라우저에 보낼 수 있음
    //res.sendFile(__dirname + '/main.html');

    //여기서 조건문추가
    //if (weather_API === '맑음') {}  날씨API 정보가 맑음이면 video_src의 주소에서 폴더명으로 구분하기. {s3 주소}/sunny/{영상명}.mp4
    let sunnyList = [];
    // if 실시간 날씨가 맑음이면 맑음 데이터 전달
    data.forEach((row, index)=>{
      if (row.weather==='맑음') {
        sunnyList.push(row);
      }
    });
    //ejs이용    
    res.render('healing', {
      weatherList: sunnyList
      //clockFunc: clock.renderclockFunc
    });  //sunny에 해당하는 데이터만
    
    //if (weather_API === '비') {rainyList 전달}
  });
  
  // 2개 렌더링해도되나?
  //clock.renderclockFunc()
});

router.get('/advertisement', function(req, res) {
  db.getAdService((data) => {
    let adsList =[];
    data.forEach((row, index) => {
      if (row.img_src) {  //img가 있다면
        adsList.push(row.img_src);
      }
      if (row.video_src) {  //video가 있다면
        adsList.push(row.video_src);
      }
    })
    res.render('advertisement', {
      adsList: adsList
    });
  });
});

module.exports = router;