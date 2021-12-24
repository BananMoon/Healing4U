// router 임포트
var express = require('express');
var router = express.Router();

// DB 연결
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
  let season_param = monthToSeason();
  console.log('계절 값: ',season_param);

  // DB 조회
  var sql = 'SELECT * FROM healings WHERE season=?';
  conn.query(sql, season_param, function (err, rows, fields){              // DB 쿼리문
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

/*=======날씨api를 통해 받은 날씨값을 **초마다 해당 api를 호출========*/
router.put("/healing", async (req, res) => {
  // 1. weather
  const weather = req.body.weather;        // 실시간 날씨 값을 저장
  console.log('====================서버에서 weather값: ',weather);
  if (weather == "Rain") {  // DB에서 조회할 값으로 변환
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
  let season_param = monthToSeason();
  
  // 3. DB 조회
  dataList = [];
  var sql = 'SELECT * FROM healings WHERE weather=? AND season=?';
  conn.query(sql, [weather_param, season_param], function (err, rows, fields){
    rows.forEach((row, index)=>{
      dataList.push(row);
    })
    healingData = dataList[Math.floor(Math.random()*dataList.length)]; 

    if(err) console.log('query is not excuted. select fail...\n' + err);
    else  res.send({ 
      video_src: healingData.video_src,
      quote: healingData.quote,
      quote_src: healingData.quote_src
    });
  })
});


/*========== 딥러닝 서버로 api 요청=========*/
var request = require('request');

router.get("/dltest", function(req, res) {
  console.log("GET요청 /dltest 호출됨");
  
  //콜백 이 실행되면 그 값이 아래 DLTestResult의 {result} 에 저장
  const DLTestResult = (callback) => { //여기 수정해야 함.-> 왜지?
    const options = {
        method: 'GET',
        uri: "http://ec2-3-129-8-135.us-east-2.compute.amazonaws.com:8888/test",  //http://{aws ip주소}/test, http://localhost:5000/test
        qs: { //쿼리 스트링(query string)
            test: "test"
        }
    }
    // 위에 정의해논 uri에 request 라이브러리로 요청! request의 응답이 body로 오면 아래 콜백함수 호출
    request(options, function (err, res, body) {
        console.log("콜백 전 : "+ body);
        callback(undefined, {
            result: body
        });
    });
  }

  //콜백 실행. result는 딥러닝서버로부터 받은 값
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
      const user_id = json.user_id;
      const ad_id = json.ad_id;

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
  console.log("index.js에서 userId : "+ userId);
  console.log("index.js에서 adId : "+ adId);

  let sql = "SELECT * FROM advertisement WHERE ad_id=?";
  adsList = [];
  conn.query(sql, adId, function (err, row, fields){
    ad_src = row[0].src
    console.log("src출력: "+ ad_src);

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

// month->season 변환 함수
function monthToSeason() {
  let today = new Date();
  let month = today.getMonth()+1;
  if (3<=month && month<=5) {
    season_param = 0;    //봄
  } else if (6<=month && month<=8) {
    season_param = 1;    //여름
  } else if (9<=month && month<=11) {
    season_param = 2;    //가을
  } else {
    season_param = 3;    //겨울
  }
  return season_param;
}