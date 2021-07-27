const mysql = require('mysql');

//connection 정의
const dbconnection = mysql.createConnection({
    host: 'healing.cdkn59lq9zjm.ap-northeast-2.rds.amazonaws.com',
    user: 'healing4u',
    password: 'healing4u',
    database: "healingDB"
});

// RDS에 접속
dbconnection.connect();
// 다른 js 파일에 보내는 방법
module.exports = dbconnection;

testQuery = "SELECT img_src, address, detail_short, service_name FROM services WHERE (emotion=0 AND img_src is not null";

//body-parser: 클라이언트에서 받은 데이터들을 서버로 옮길 때 옮겨주는 과정을 하는 역할

//nodejs에서 서버(express)를 만들기위한 기본셋팅
const express = require('express');
const app = express(); //express 라이브러리 사용
const path = require('path');   //ejs사용

//모든 서버로 오는 요청은 해당 middleware를 지나가야한다.
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

//listen (param1, param2)
// param1:서버띄울 포트번호, param2: 서버 띄운 후 실행할 코드
// 8080 port에 서버 띄워주세요~~
//port란? 로컬 컴퓨터에 서버를 하나 만들었는데, 8080번으로 들어와야 서버가 열리는 것
//외부와 네트워크 통신을 하기위한 구멍(6만개정도) 중 8080을 통해 들어오면!


// get 요청을 처리하는 기계 제작
// /beauty/home으로 GET요청 -> 뷰티 상품들을 보여줌
// 링크에 넣는게 get
// READ
app.get('/servicesDB', function (req, res) {  
  dbconnection.query("SELECT * FROM services WHERE emotion=0 AND video_src IS NOT NULL", function (err, rows, fields) {
      if(err) console.log('query is not excuted. select fail...\n' + err);
      else res.send(rows);
  });
});

app.get('/user', function (req, res) {  
  dbconnection.query("SELECT * FROM users WHERE emotion=0", function (err, rows, fields) {
      if(err) console.log('query is not excuted. select fail...\n' + err);
      else res.send(rows);
  });
});

//수정 사항 발생 시 서버 재실행이 귀찮음
//자동화 시키는 script library -> npm install -g(모든 폴더에서 이용할 수 있도록) nodemon
//html 파일 보내보자
app.get('/', function(req, res) {
  //html파일을 브라우저에 보낼 수 있음
  res.sendFile(__dirname + '/main.html');
  // User.find({}, (err, users) => {
  //   if(err) return res.json(err);
  //   res.json(users);
  // });
});
//__dirname : 현재 server.js가 실행되는 경로

// SERVICE
app.get('/category', function(req, res) {
  res.sendFile(__dirname + '/category.html');
});

app.get('/service.html',function(req, res) {
  res.sendFile(__dirname + '/service.html');
});


app.listen(2004, function() {
  console.log('listening on 2004♥');
});
