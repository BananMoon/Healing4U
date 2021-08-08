// router 이용
var express = require('express');
var router = express.Router();
const db_config = require('../config/db_info');
const conn = db_config.init(); // db의 커넥터를 활성화 시킨다.
db_config.connect(conn); //db에 커넥터를 연결해준다.

const moment = require('moment');
// const moment= require("moment");

// router.use((req, res, next)=>{
//     res.locals.moment= moment;
//     next();
// });
/*-------------패널 메인 화면------------*/
/*GET home page */
router.get('/', function(req, res) {
  let sunnyList = [];
  var sql = 'SELECT * FROM healings';
  conn.query(sql, function (err, rows, fields){
    
    rows.forEach((row, index)=>{
      //날씨 API 가져와야함.
      //봄
      if (row.season===3) {
        sunnyList.push(row);
        console.log(row);
      }
      //가을
      //겨울
      //여름
      console.log(sunnyList);
    });
    // for (let row=0; row<rows.length;row++) {
    //   if (row.season==='3') {
    //     sunnyList.push(row);
    //   }
    //   console.log(row.season)
    //}
    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.render('healing', {
      weatherList: sunnyList,
      moment: moment
    }); //오류가 안뜬다면 healing.ejs 로 rows값들을 list에 넣어 보낸다.
  });
});

router.get('/advertisement', function(req, res) {
  let adsList=[];
  let sql = 'SELECT * FROM advertisement';
  conn.query(sql, function (err, rows, fields){
    // 1. 계절 구분
    rows.forEach((row, index)=>{
      //광고서비스는 only 계절로 구분 (3-5 6-8 9-11 12-2)      
      if (3<=row.season<=5) {
        adsList.push(row);
      } else if (6<=row.season<=8) {
        adsList.push(row);
      } else if (9<=row.season<=11) {
        adsList.push(row);
      } else {
        adsList.push(row);
      }
    });
    //2. 랜덤 광고데이터 1개 저장
    let adData = adsList[Math.floor(Math.random()*adsList.length)];
    let update_sql = 'UPDATE advertisement SET provised = 1 WHERE src = ?'
    let params = adData.src;

    // console.log(update_sql);
    // console.log("params: "+ params);
    //3. db provised 칼럼 변환
    conn.query(update_sql, params, function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else console.log('sql_provised column updated');
    });

    res.render('advertisement', {
      adData: params
    })
  });
});

module.exports = router;