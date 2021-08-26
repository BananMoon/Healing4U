// router 이용
var express = require('express');
var router = express.Router();
const db_config = require('../config/db_info');
const conn = db_config.init(); // db의 커넥터를 활성화 시킨다.
db_config.connect(conn); //db에 커넥터를 연결해준다.

/*-------------패널 메인 화면------------*/
/*GET home page */
router.get('/', function(req, res) {
  let dataList = [];
  let today = new Date();
  let month = today.getMonth()+1;
  console.log('달: ',month);
  if (3<=month && month<=5) {
    month_param = 0;    //봄
  } else if (6<=month && month<=8) {
    month_param = 1;    //여름
  } else if (9<=month && month<=11) {
    month_param = 2;    //가을
  } else {
    month_param = 3;    //겨울
  }
  // weather 반영 전) season
  console.log('계절 값: ',month_param);
  // DB 조회
  var sql = 'SELECT * FROM healings WHERE season=?';
  dataList=[];
  conn.query(sql, month_param, function (err, rows, fields){              // DB 쿼리문
    rows.forEach((row, index)=>{
      dataList.push(row);
    });
    healingData = dataList[Math.floor(Math.random()*dataList.length)];    // 랜덤으로 데이터 1개 추출 

    console.log('get 데이터:', healingData);
    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.render('healing', {
      healingData: healingData
    }); //오류가 안뜬다면 healing.ejs 로 healingData를 보낸다.
  });
});

/*=======날씨api를 통해 받은 날씨값을 **초마다 해당 api를 호출하여 db를 조회. 해당 데이터와 함께 페이지 랜더링 ========*/
router.get("/:weather", async (req, res) => {
  const { weather } = req.params;           // 실시간 날씨 값을 저장
  console.log('====================서버에서 weather값: ',weather);  // DB에서 조회할 값으로 변환
  if (weather == "Rain") {
    weather_param = 1;  // 비
  }
  else if (weather == "Snow") {
    weather_param = 2;  // 눈
  } else {
    weather_param = 0;  // 맑음, 안개(Mist, Hazy) 등..
  }
  // 이외 코드는 위와 동일하여 생략
  //season
  let today = new Date();
  let month = today.getMonth()+1;
  if (3<=month && month<=5) {
    month_param = 0;    //봄
  } else if (6<=month && month<=8) {
    month_param = 1;    //여름
  } else if (9<=month && month<=11) {
    month_param = 2;    //가을
  } else {
    month_param = 3;    //겨울
  }
  dataList = []
  var sql = 'SELECT * FROM healings WHERE weather=? AND season=?';
  conn.query(sql, [weather_param, month_param], function (err, rows, fields){
    rows.forEach((row, index)=>{
      dataList.push(row);
    })
    healingData = dataList[Math.floor(Math.random()*dataList.length)]; 
    // console.log('1',healingData);
    // console.log('2',healingData.video_src);

    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  console.log('query is excuted.');
  });
  console.log('===============api 호출에 응답할 data: ',healingData);

  // res.send({ 
  //   video_src: healingData.video_src,
  //   quote: healingData.quote,
  //   quote_src: healingData.quote_src
  // });
  res.json({ healingData: healingData });
  // res.json(healingData);
  // res.render('healing', {
  //   healingData: healingData
  // }); //오류가 안뜬다면 healing.ejs 로 rows값들을 list에 넣어 보낸다.

  console.log('rendering finish======================');
});


var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/*========== 딥러닝 서버로부터 감정값을 받아서 db조회후 데이터값과 함께 광고서비스를 랜더링.=========*/
// 우선 db조회 부터는 주석처리해놓음.
router.get("/test", function(req,res){
  var get_body = req.body;
  console.log('dl서버:',get_body);
  let emotion_param = get_body.now_emotion;
  let user_id = get_body.user_id;
  console.log('실시간 사용자 감정값 : ', emotion_param);
  console.log('user ID : ', user_id);

  //now_emotion, season을 이용해서 광고테이블에서 광고 조회해서 advertisement로 랜더링
  //조회된 광고들에서 해당하는 weather의 데이터중 랜덤으로 해서 보여줌.
  let today = new Date();
  let month = today.getMonth()+1;
  if (3<=month && month<=5) {
    month_param = 0;    //봄
  } else if (6<=month && month<=8) {
    month_param = 1;    //여름
  } else if (9<=month && month<=11) {
    month_param = 2;    //가을
  } else {
    month_param = 3;    //겨울
  }
  adsList = [];
  let sql = 'SELECT * FROM advertisement WHERE emotion=? AND season=?';
  conn.query(sql, [emotion_param, month_param], function (err, rows, fields){
    console.log(rows);
    rows.forEach((row, index)=>{
      //광고서비스는 기분과 계절로 구분 (날씨는 프론트 단에서) 
      adsList.push(row);
    });
    let adData = adsList[Math.floor(Math.random()*adsList.length)];

    //아래코드는 advertisement.ejs에서!
    //let adData = adsSrc_list[Math.floor(Math.random()*adsSrc_list.length)];
    //여기서 
  
    console.log(adData)
    res.render('advertisement', {
      adData: adData,
      userID: user_id
    })
  });
});

// function apiCall() {
//   router.get("/test", function(req,res){
//     var get_body = req.body;
//     console.log(get_body);
//     return get_body.now_emotion;
//   })
// }

//'/advertisement'에서 호출. users 테이블에 데이터 update & rating 페이지를 user_id와 함께 랜더링.
router.post('/adDB', function(req, res) {
  console.log('POST 방식으로 /adDB 호출됨');
  let ad_id= req.body.ad_id;
  let user_id = req.body.user_id;
  console.log('광고id는 ',ad_id, 'userid는', user_id);
  // let update_sql = 'UPDATE users SET ad_id = ? WHERE user_id = ?';
  // conn.query(update_sql, [ad_id, user_id], function (err, rows, fields){
  //   if(err) console.log('query is not excuted. insert fail...\n' + err);
  //   else console.log('a column of users table is inserted');
  // });
  // res.render('rating', {
  //   userID: user_id
  // })
})

/* ========'/' 페이지에서 감정값을 받으면 advertisement.ejs를 랜더링할것임. ==========*/
// 성공하면 해당 api는 지울거임
router.get('/advertisement', function(req, res) {
  let adsList=[];
  let sql = 'SELECT * FROM advertisement WHERE season=1';
  conn.query(sql, function (err, rows, fields){
    rows.forEach((row, index)=>{
      //광고서비스는 기분과 날씨와 계절로 구분 (3-5 6-8 9-11 12-2)      
      adsList.push(row);
    });
    //2. 랜덤 광고데이터 1개 저장.
    let adData = adsList[Math.floor(Math.random()*adsList.length)];
    // 안드쪽에서 update를 못해서 provised 칼럼을 update하는 방식은 못함.
    //android (emotion, src, service_name, address, detail_long, tel, navermap_url) 
    // let insert_sql = 'INSERT INTO android (emotion, src, service_name, address, detail_long, tel, navermap_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    // let params1 = adData.emotion;
    // let params2 = adData.src;
    // let params3 = adData.service_name;
    // let params4 = adData.address;
    // let params5 = adData.detail_long;
    // let params6 = adData.tel;
    // let params7 = adData.navermap_url;

    // //3. android 테이블에 새 행 추가
    // conn.query(insert_sql, [params1,params2,params3, params4, params5, params6, params7], function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
    //   if(err) console.log('query is not excuted. insert fail...\n' + err);
    //   else console.log('a column of android table is inserted');
    // });
    const user_id = 1;
    res.render('advertisement', {
      adData: adData,
      userID: user_id
    })
  });
});


router.get('/rating', function(req, res) {
  res.render('rating', {
  })
})


// rating 결과값을 전달
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