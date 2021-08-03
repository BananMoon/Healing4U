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
  
  // 2개 렌더링해도되나?
  //clock.renderclockFunc()
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
    //랜덤으로 하나씩 고르기
    foodVideo = foodVideoList[Math.floor(Math.random()*foodVideoList.length)];
    foodImg = foodImgList[Math.floor(Math.random()*foodImgList.length)];
    foodData = [foodVideo, foodImg];
    console.log(foodData);

    res.render('advertisement', {
      adsList: foodData
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
    //랜덤으로 하나씩 고르기
    actVideo = activityVideoList[Math.floor(Math.random()*activityVideoList.length)];
    actImg = activityImgList[Math.floor(Math.random()*activityImgList.length)];
    activityData = [actVideo, actImg];
    console.log(activityData);

    //ejs 템플릿에서 .mp4 vs. .jpg 랜덤 띄우기?
    res.render('advertisement', {   //ejs 페이지에 렌더링할 때 데이터 전달
      adsList: activityData
    });
  });  
});
module.exports = router;
