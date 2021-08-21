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
  let dataList = [];
  let today = new Date();
  let month_params = today.getMonth()+1;
  //날씨API
  //console.log('날씨데이터: ',healing.WeatherApp);
  var sql = 'SELECT * FROM healings WHERE season=?';
  conn.query(sql, month_params, function (err, rows, fields){
      //season
    rows.forEach((row, index)=>{
      dataList.push(row);
    });
    healingData = dataList[Math.floor(Math.random()*dataList.length)]; 
    // console.log(JSON.stringify(healingData));
    // console.log(JSON.parse(JSON.stringify(healingData)));

    if(err) console.log('query is not excuted. select fail...\n' + err); // 만일 오류가 있으면 로그 띄우기
    else  res.render('healing', {
      healingData: healingData
    }); //오류가 안뜬다면 healing.ejs 로 rows값들을 list에 넣어 보낸다.
  });
});

// router.post("/:weather", async (req, res) => {
//   const { weather } = req.params;
//   console.log('서버에서 weather값: ',weather);
//   if (weather == "Rain") {
//     weather_param = 1;  // 비
//   }
//   else if (weather == "Snow") {
//     weather_param = 2;  // 눈
//   } else {
//     weather_param = 0;  // 맑음, 안개 등..
//   }
//   //season
//   let today = new Date();
//   let month_param = today.getMonth()+1;
//   var sql = 'SELECT * FROM healings WHERE weather=? AND season=?';
//   conn.query(sql, weather_param, month_param, function (err, rows, fields){
//     rows.forEach((row, index)=>{
//       dataList.push(row);
//     });
//     healingData = dataList[Math.floor(Math.random()*weatherList.length)]; 
//     var healingString = JSON.stringify(healingData);
//     var responseData = JSON.parse(healingString)
//     console.log(responseData);
//   })
//   console.log('sql done');
//   // res.json(responseData);
//   res.render('/', {
//     healingData: responseData
//   });
// });


var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/test", function(req,res){
  var get_body = req.body;
  console.log('dl서버:',get_body);
  let emotion_param = get_body.now_emotion;
  let user_id = get_body.user_id;
  console.log('실시간 사용자 감정값 : ', emotion_param);
  console.log('user ID : ', user_id);

  //now_emotion, season을 이용해서 광고테이블에서 광고 조회해서 advertisement로 랜더링
  //조회된 광고들에서 해당하는 weather의 데이터중 랜덤으로 해서 보여줌.
  // let today = new Date();
  // let month = today.getMonth()+1;
  // if (3<=month<=5) {
  //   month_param = 0;    //봄
  // } else if (6<=month<=8) {
  //   month_param = 1;    //여름
  // } else if (9<=month<=11) {
  //   month_param = 2;    //가을
  // } else {
  //   month_param = 3;    //겨울
  // }
  // adsSrc_List = [];
  // let sql = 'SELECT * FROM advertisement WHERE emotion=? AND season=?';
  // conn.query(sql, [emotion_param, month_param], function (err, rows, fields){
  //   console.log(rows);
  //   rows.forEach((row, index)=>{
  //     //광고서비스는 기분과 계절로 구분 (날씨는 프론트 단에서) 
  //     adsSrc_List.push(row.src);
  //   });
  //   console.log(adsSrc_List);
  //   //아래코드는 advertisement.ejs에서!
  //   //let adData = adsList[Math.floor(Math.random()*adsList.length)];
  //   //여기서 
  // });
  // res.render('advertisement', {
  //   adsList: adsSrc_List
  // })
});

function apiCall() {
  router.get("/test", function(req,res){
    var get_body = req.body;
    console.log(get_body);
    return get_body.now_emotion;
  })
}

// router.get('/advertisement', function(req, res) {
//   let adsList=[];
//   let sql = 'SELECT * FROM advertisement WHERE emotions=? AND season=? AND weather=?';
//   conn.query(sql, function (err, rows, fields){
//     rows.forEach((row, index)=>{
//       //광고서비스는 기분과 날씨와 계절로 구분 (3-5 6-8 9-11 12-2)      
//       if (3<=row.season<=5) {
//         adsList.push(row);
//       } else if (6<=row.season<=8) {
//         adsList.push(row);
//       } else if (9<=row.season<=11) {
//         adsList.push(row);
//       } else {
//         adsList.push(row);
//       }
//     });
//     //2. 랜덤 광고데이터 1개 저장.
//     let adData = adsList[Math.floor(Math.random()*adsList.length)];
//     // 안드쪽에서 update를 못해서 provised 칼럼을 update하는 방식은 못함.
//     //android (emotion, src, service_name, address, detail_long, tel, navermap_url) 
//     let insert_sql = 'INSERT INTO android (emotion, src, service_name, address, detail_long, tel, navermap_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     let params1 = adData.emotion;
//     let params2 = adData.src;
//     let params3 = adData.service_name;
//     let params4 = adData.address;
//     let params5 = adData.detail_long;
//     let params6 = adData.tel;
//     let params7 = adData.navermap_url;

//     //3. android 테이블에 새 행 추가
//     conn.query(insert_sql, [params1,params2,params3, params4, params5, params6, params7], function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
//       if(err) console.log('query is not excuted. insert fail...\n' + err);
//       else console.log('a column of android table is inserted');
//     });

//     res.render('advertisement', {
//       adData: adData.src
//     })
//   });
// });



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