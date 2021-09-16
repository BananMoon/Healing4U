//mysql 연결
const mysql = require('mysql');

//db 정보
const conn = mysql.createConnection({
    host: 'healing.ceuy4iegap9i.ap-northeast-2.rds.amazonaws.com',  //aws RDS
    user: 'healing4u',
    password: 'healing4u',
    database: "healingDB"
});

module.exports = {
    connect,
    getSeasonHealing,
    getWeatherHealing,
    getAD,
    getADFirst
}

function connect(conn) {
    conn.connect(function(err) {
        if (err) {
            console.error('mysql connection error : ' + err.stack);
            return;
          }
        
          console.log('mysql is connected successfully connected as id ' + conn.threadId);
    });
}

function getSeasonHealing(callback) {
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
      else  callback(healingData);
    });
}

function getWeatherHealing(callback) {
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
      else  callback(healingData);
    });
}

function getAD(callback) {
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
      else callback(adData);    //무의미
    });
  });
}

function getADFirst(callback) {
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
    else callback(adData);    //무의미
  });
}
