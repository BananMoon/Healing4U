// router 이용
var express = require('express');
var router = express.Router();
const db_config = require('../config/db_info');
const conn = db_config.init(); // db의 커넥터를 활성화 시킨다.
db_config.connect(conn); //db에 커넥터를 연결해준다.


rating = require('../public/js/main/rating');
//error!!!!!!!!!!!! healing.ejs에서 가져와지지가 않음...healing = require('../views/healing');
console.log('점수: ', rating);
/*-------------패널 메인 화면------------*/
/*GET home page */
router.get('/', function(req, res) {
  let weatherList = [];
  let today = new Date();
  let month = today.getMonth()+1;
  //날씨API
  //console.log('날씨데이터: ',healing.WeatherApp);


  var sql = 'SELECT * FROM healings';
  conn.query(sql, function (err, rows, fields){
    
    rows.forEach((row, index)=>{
      //날씨 API 가져와야함.
      //일단 계절
      //날씨 조건문
      if (row.season==month) {      //봄
        weatherList.push(row);
      }
    });
    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.render('healing', {
      weatherList: weatherList
    }); //오류가 안뜬다면 healing.ejs 로 rows값들을 list에 넣어 보낸다.
  });
});

router.get('/healing/:result', async (req, res) => {
  const {weatherList} = req.params;
  console.log('서버에서 weatherList 값: ', weatherList);
  // res.render('healing', {
  //   weatherList:weatherList
  // })
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
    //2. 랜덤 광고데이터 1개 저장.
    let adData = adsList[Math.floor(Math.random()*adsList.length)];
    // 안드쪽에서 update를 못해서 provised 칼럼을 update하는 방식은 못함.
    //android (emotion, src, service_name, address, detail_long, tel, navermap_url) 
    let insert_sql = 'INSERT INTO android (emotion, src, service_name, address, detail_long, tel, navermap_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let params1 = adData.emotion;
    let params2 = adData.src;
    let params3 = adData.service_name;
    let params4 = adData.address;
    let params5 = adData.detail_long;
    let params6 = adData.tel;
    let params7 = adData.navermap_url;

    //3. android 테이블에 새 행 추가
    conn.query(insert_sql, [params1,params2,params3, params4, params5, params6, params7], function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else console.log('a column of android table is inserted');
    });

    res.render('advertisement', {
      adData: adData.src
    })
  });
});



router.get('/rating', function(req, res) {
  res.render('rating', {
  })
})

// router.get("/rating/:result", async (req, res) => {
//   const { data } = req.params;
//   console.log('서버:',data);
//   // goods = await Goods.findOne({ goodsId: goodsId });
//   // res.json({ detail: goods });
// });

// router.post('/rating/good', function (req, res) {
//   let data = req.body;
//   console.log('서버:',data);
// })




//      <% let data = weatherList[Math.floor(Math.random()*weatherList.length)]; %>


router.get("/rating/:result", async (req, res) => {
  const { result } = req.params;
  console.log('서버에서 rating값: ',result);
  let insert_sql = 'INSERT INTO users (rating) VALUES (?)';
  let rating_param = result;
  // goods = await Goods.findOne({ goodsId: goodsId });
  // res.json({ detail: goods });
  conn.query(insert_sql, rating_param, function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else console.log('a rating data is inserted');
  });
  res.render('healing');
});

module.exports = router;