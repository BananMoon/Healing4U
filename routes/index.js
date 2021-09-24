// router 이용
var express = require('express');
var router = express.Router();
const db = require('../config/db_info');
const conn = db.init(); // db의 커넥터를 활성화 시킨다.
db.connect(conn); //db에 커넥터를 연결해준다.

// req.body를 사용하기위해 body-parser 모듈 사용
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
      console.log(row);
    });
    healingData = dataList[Math.floor(Math.random()*dataList.length)];    // 랜덤으로 데이터 1개 추출 

    console.log('get 데이터:', healingData);
    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.render('healing', {healingData: healingData});
  });
});
//===================================================================================
/*=======날씨api를 통해 받은 날씨값을 **초마다 해당 api를 호출하여 db를 조회. 해당 데이터와 함께 페이지 랜더링 ========*/
router.put("/healing", async (req, res) => {
  const weather = req.body.weather;
  // const { weather } = req.params;           // 실시간 날씨 값을 저장
  console.log('====================서버에서 weather값: ',weather);  // DB에서 조회할 값으로 변환
  if (weather == "Rain") {
    weather_param = 1;  // 비
  }
  else if (weather == "Snow") {
    weather_param = 2;  // 눈
  } else {
    weather_param = 0;  // 맑음, 안개(Mist, Hazy, Clouds) 등..
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
  //DB 조회
  dataList = [];
  var sql = 'SELECT * FROM healings WHERE weather=? AND season=?';
  conn.query(sql, [weather_param, month_param], function (err, rows, fields){
    rows.forEach((row, index)=>{
      dataList.push(row);
    })
    healingData = dataList[Math.floor(Math.random()*dataList.length)]; 
  // console.log('1',healingData);
  // console.log('2',healingData.video_src);

    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.send({ 
      video_src: healingData.video_src,
      quote: healingData.quote,
      quote_src: healingData.quote_src
    });
  })

  //이걸 어떻게 화면전환시키지?
  
  // res.json({ healingData: healingData });
  // res.json(healingData);
  // res.render('healing', {
  //   healingData: healingData
  // }); //오류가 안뜬다면 healing.ejs 로 rows값들을 list에 넣어 보낸다.

  console.log('rendering finish======================');
});


/*========== 딥러닝 서버로부터 감정값을 받아서 db조회후 데이터값과 함께 광고서비스를 랜더링.=========*/
var request = require('request');

router.get("/dltest", function(req, res) {
  console.log("GET요청 /dltest 호출됨");
  
  //콜백 이 실행되면 그 값이 아래 DLTestResult의 {result} 에 저장
  const DLTestResult = (callback) => { //여기 수정해야 함.-> 왜지?
    const options = {
        method: 'POST',
        uri: "http:// ??  /yolo",
        qs: { //쿼리 스트링(query string)
            test: "test"
        }
    }
    // 위에 정의해논 options uri로 async 요청! request의 응답이 body로 오면 아래 callback 호출
    request(options, async function (err, res, body) {
        callback(undefined, {
            result: body
        });
    });
  }

  //콜백 실행
  DLTestResult((err, {result} = {}) => {
    if (err) {
      console.log("error!!!!");
      res.send({
        message: "fail",
        status: "fail"
      });
    }else {  //error 아니면!
      json = JSON.parse(result);    //parsing해야하나?
      console.log(json, ': from flask')
      console.log('성공했으니 클라이언트에 응답!');
      return res.status(204).end(); //클라이언트에 응답
    } 
  })
});
// 우선 db조회 부터는 주석처리해놓음.
router.put("/dl/test", function(req,res){
  var get_body = req.body;
  console.log('dl서버:',get_body);
  let emotion_param = get_body.now_emotion;
  let user_id = get_body.user_id;

  //에러 체크
  if (!emotion_param && !user_id) {
    return res.status(400).end();
  }
  console.log('실시간 사용자 감정값 : ', emotion_param);
  console.log('user ID : ', user_id);

  //(WHERE now_emotion, season) 광고테이블에서 광고 조회해서 advertisement로 랜더링
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

    let ad_id = adData.ad_id;
    //랜덤으로 뽑힌 필드의 ad_id를 users 테이블에 update
    let update_sql = 'UPDATE users SET ad_id = ? WHERE user_id = ?';
    conn.query(update_sql, [ad_id, user_id], function (err, rows, fields){
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.send('/advertisement?userId='+user_id);
    });
  });
  router.get()
  // db.getAD((adData) => {   //db객체에서 getAllServices함수를 호출해 db 전체 조회
  //   console.log('===============api 호출에 응답할 data: ',healingData);
  //   res.send('/advertisement?userId='+user_id);
});

//'/advertisement'에서 호출. users 테이블에 데이터 update & rating 페이지를 user_id와 함께 랜더링.
router.post('/adDB', function(req, res) {
  console.log("POST 방식으로 '/adDB' 호출됨");
  let ad_id= req.body.ad_id;
  console.log(typeof(ad_id));
  let user_id = req.body.user_id;
  console.log('광고id는 ',ad_id, 'userid는', user_id);

  //에러 체크
  if (!ad_id && !user_id) {
    return res.status(400).end();
    // return res.json({userID:user_id});

  }

//   //users 테이블 update
//   let update_sql = 'UPDATE users SET ad_id = ? WHERE user_id = ?';
//   conn.query(update_sql, [ad_id, user_id], function (err, rows, fields){
//     if(err) console.log('query is not excuted. insert fail...\n' + err);
//     else console.log('a column of users table is updated');
//   });
//   console.log('렌더링 전==============');
//   // res.send({ 
//   //   user_id: user_id
//   // });

//   //왜 안먹힐까
//   // res.render('rating', {
//   //   userID: user_id
//   // })
  })

/* ========'/' 페이지에서 감정값을 받으면 advertisement.ejs를 랜더링할것임. ==========*/
// 성공하면 해당 api는 지울거임
router.get('/advertisement', function(req, res) {
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
  let user_id = 2;

  let adsList=[];
  let sql = 'SELECT * FROM advertisement WHERE season=?';
  conn.query(sql, month_param, function (err, rows, fields){
    rows.forEach((row, index)=>{
      //광고서비스는 기분과 날씨와 계절로 구분 (3-5 6-8 9-11 12-2)      
      adsList.push(row);
    });
    //2. 랜덤 광고데이터 1개 저장.
    let adData = adsList[Math.floor(Math.random()*adsList.length)];

    console.log('adData',adData);
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.render('advertisement', {
      adData: adData,
      userID: user_id
    })
  });
  // db.getADFirst((adData) => {
  //   res.render('advertisement', {
  //     adData: adData,
  //     userID: user_id
  //   })
  // });
});

//rating 화면 전환
//ad_id를 여기서 테이블에 저장할지 고민..
// router.get('/rating/home/:adId/:userId', async (req, res) => {
//   let { adId } = req.params;
//   let { userId } = req.params;
//   console.log('서버에서 userId: ', userId);
//   console.log('서버에서 adId: ', adId);

//   // 결과값 체크
//   if (Number.isNaN(adId) && Number.isNaN(userId)) {
//     return res.status(400).end();
//   }
//   return res.json({userID:userId});
// });
router.get('/rating/home/:userId', function(req, res) {
  const { userId } = req.params;
  console.log('서버에서 userId: ', userId);
  
  res.render('rating', {
    userID: userId
  })
})

// 버튼 클릭시 호출 API
router.put('/rating', async (req, res) => {
  let button = req.body.button;
  let userId = req.body.userId;
 // 결과값 체크
  if (Number.isNaN(button)) {
    return res.status(400).end();
  }

  console.log(button, userId);
  //금일 날짜 ->DL 서버에 요청
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  console.log(date);  //2021-9-10
  
  // String->int 형변환
  let num_button = parseInt(button);
  let num_userId = parseInt(userId);

  let update_sql = 'UPDATE users SET rating=? AND today=? WHERE user_id=?';
  let params = [num_button, date, num_userId];
  conn.query(update_sql, params, function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
    if(err) console.log('update query is not excuted. insert fail...\n' + err);
    else {
      console.log('update query is succeed!');
      return res.status(204).end();
    } 
  });
});
  // db.saveRating((button) => {   //db객체에서 getAllServices함수를 호출해 db 전체 조회
  //   console.log('db로부터 온 data: ',button);
  //   // res.render('healing');
  //   return res.status(204).end();

  // });
module.exports = router;