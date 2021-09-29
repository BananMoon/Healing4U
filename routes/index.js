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

/*=======날씨api를 통해 받은 날씨값을 **초마다 해당 api를 호출하여 db를 조회. 해당 데이터와 함께 페이지 랜더링 ========*/
router.put("/healing", async (req, res) => {
  const weather = req.body.weather;        // 실시간 날씨 값을 저장

  // 1. weather
  console.log('====================서버에서 weather값: ',weather);  // DB에서 조회할 값으로 변환
  if (weather == "Rain") {
    weather_param = 1;  // 비
  }
  else if (weather == "Snow") {
    weather_param = 2;  // 눈
  } else if (weather == "Mist" || weather == "Hazy") {
    weather_param = 3;  // 안개(Mist, Hazy) 등..
  } else {    // 맑음(Clouds, Fog) 등..
    weather_param = 0;
  }

  // 2. season
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

  // 3. DB 조회
  dataList = [];
  var sql = 'SELECT * FROM healings WHERE weather=? AND season=?';
  conn.query(sql, [weather_param, month_param], function (err, rows, fields){
    rows.forEach((row, index)=>{
      dataList.push(row);
    })
    healingData = dataList[Math.floor(Math.random()*dataList.length)]; 

    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.send({ 
      video_src: healingData.video_src,
      quote: healingData.quote,
      quote_src: healingData.quote_src
    });
  })

  console.log('rendering finish======================');
});


/*========== 딥러닝 서버로 api 요청=========*/
var request = require('request');

router.get("/dltest", function(req, res) {
  console.log("GET요청 /dltest 호출됨");
  
  //콜백 이 실행되면 그 값이 아래 DLTestResult의 {result} 에 저장
  const DLTestResult = (callback) => { //여기 수정해야 함.-> 왜지?
    const options = {
        method: 'GET',
        uri: "http://localhost:5000/test",  //http://{aws ip주소}/test
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
      json = JSON.parse(result);    //json으로 왔으니 parsing해야할듯
      console.log(json, ': from flask')
      //json으로 user_id와 emotion이 넘어올 것임
      const now_emotion = json.now_emotion;
      const user_id = json.user_id;
      const ad_id = json.ad_id;

      console.log("실시간 사용자 감정값 : "+ now_emotion);
      console.log("userID: " + user_id);
      console.log("adID: " + ad_id);

      const ad_url = '/advertisement/' + user_id + '/' + ad_id; // /advertisement/2/16

      return res.send({ 
          ad_url: ad_url
      });
    } 
  })
});

/* advertisement 페이지 전환 api */
router.get('/advertisement/:userId/:adId', function(req, res) {
  const { userId } = req.params;
  const { adId } = req.params;

  //1. advertisement에서 광고데이터 조회
  console.log("index.js에서 userId"+ userId);
  console.log("index.js에서 adId"+ adId);

  let sql = "SELECT * FROM advertisement WHERE ad_id=?";
  adsList = [];
  conn.query(sql, 18, function (err, row, fields){
    row.forEach((r)=>{
      //광고서비스는 기분과 계절로 구분 (날씨는 프론트 단에서) 
        adsList.push(r);
        // console.log(JSON.parse(r));
    });
    ad_src =  adsList[0].src

    console.log("src출력: "+ ad_src);
    //광고url
    //JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환합니다
    //JSON.parse() 메서드는 JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성

    // console.log("ad_id 출력: "+ stringRow.ad_id);
    // 문제 : adsList가 [object Object] 라 뜨네.....

    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else {
      console.log('광고데이터 조회 완료!');
      res.render('advertisement', {
          adSrc: ad_src,
          userID: userId
      });
    }  
  })
});

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
module.exports = router;