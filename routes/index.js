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
    console.log('1');
    res.render('healing', {
      weatherList: sunnyList
      //clockFunc: clock.renderclockFunc
    });  //sunny에 해당하는 데이터만
    
    //if (weather_API === '비') {rainyList 전달}
  });
});

router.get('/food_AD',function(req, res) {
  db.getFoodAdService((data) => {
    let foodImgList = [];
    let foodVideoList = [];
    data.forEach((row, index) => {
      if (!row.img_src) {  //비어있다면
        foodVideoList.push(row.video_src);
      }
      else if (!row.video_src) {
        foodImgList.push(row.img_src)
      }
    })
    console.log('2');
    res.render('advertisement', {
      foodImgList: foodImgList,
      foodVideoList: foodVideoList
    });
  });  
});

router.get('/activity_AD',function(req, res) {
  db.getActivityAdService((data) => {
    let activityImgList = [];
    let activityVideoList = [];
    data.forEach((row, index) => {
      if (!row.img_src) {  //비어있다면
        activityVideoList.push(row.video_src);
      }
      else if (!row.video_src) {
        activityImgList.push(row.img_src)
      }
    })
    console.log('3');
    res.render('advertisement', {
      activityImgList: activityImgList,
      activityVideoList: activityVideoList
    });
  });  
});
module.exports = router;
