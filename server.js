//수정 사항 발생 시 서버 재실행이 귀찮음. 자동화 시키는 script library; npm install -g(모든 폴더에서 이용할 수 있도록) nodemon
//body-parser: 클라이언트에서 받은 데이터들을 서버로 옮길 때 옮겨주는 과정을 하는 역할

/*--------------서버 setting-------------*/
const express = require('express');
const app = express(); //express 라이브러리 사용
const path = require('path');   //ejs사용

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //app 객체의 set 메소드는 속성을 설정하는 역할을 한다.
app.set('view engine', 'ejs');  //views 속성 값으로 views 폴더를 지정한다. (views 폴더를 만들어야한다.)
console.log('뷰 엔진이 ejs로 설정되었습니다.');

//모든 서버로 오는 요청은 해당 middleware를 지나가야한다.
app.use(express.static(__dirname+"/public"));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/public/views'));

// 서비스 페이지는 router로, db용 페이지는 라우터 거치지 않고.
const indexRouter = require('./routes');
app.use('/', indexRouter);

//port란? 로컬 컴퓨터에 서버를 하나 만들었는데, 8080번으로 들어와야 서버가 열리는 것
//외부와 네트워크 통신을 하기위한 구멍(6만개정도) 중 8080을 통해 들어오면!


/*--------------mysql 연동-------------*/
const mysql = require('mysql');

/*- 웹 브라우저에서 보내온 요청은 웹 서버인 익스프레스에서 컨트롤러로 보낸다.
- 익스프레스에서는 특정 패스로 들어온 요청을 라우팅 함수에서 처리하므로 라우팅 함수를 컨트롤러라고 한다.
- 컨트롤러 안에서는 사용자 요청을 처리하기 위해 mongoose 스키마와 모델 객체를 이용해 데이터베이스를 조회하거나 데이터베이스에 저장한다. 
-> 다음의 이유로 db 조회요청을 위한 다른 router를 만들어줘야할듯함 */
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

//testQuery = "SELECT img_src, address, detail_short, service_name FROM services WHERE (emotion=0 AND img_src is not null";


/*--------안드로이드 송신용 페이지---------*/
app.get('/adsDB', function (req, res) {  
  dbconnection.query("SELECT * FROM advertisement", function (err, rows, fields) {
      if(err) console.log('query is not excuted. select fail...\n' + err);
      else res.send(rows);
  });
});

app.get('/usersDB', function (req, res) {  
  dbconnection.query("SELECT * FROM users WHERE now_emotion=0", function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.send(rows);
  });
});

app.get('/healingsDB', function (req, res) {  
  dbconnection.query("SELECT * FROM healings", function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.send(rows);
  });
});

/*-------------패널 메인 화면------------*/
//html 파일 보내보자
// app.get('/', function(req, res) {
//   //html파일을 브라우저에 보낼 수 있음
//   res.sendFile(__dirname + '/main.html');
//   // User.find({}, (err, users) => {
//   //   if(err) return res.json(err);
//   //   res.json(users);
//   // });
// });
//__dirname : 현재 server.js가 실행되는 경로

// SERVICE

app.get('/category', function(req, res) {
  res.sendFile(__dirname + '/category.html');
});

// app.get('/advertisement',function(req, res) {
//   res.render('advertisement');  //advertisement.ejs 랜더링
//   //res.sendFile(__dirname + '/service.html');
// });


app.listen(2004, function() {
  console.log('listening on 2004♥');
});

app.post('/abc',function(req,res,next){
  console.log('posting');
  return res.json({success:true, msg:"good"});
});
// /*-------------DL 서버 연동------------*/
// var net = require('net');
// var server = net.createServer(function(client) {
//   console.log('Client connection: ');
//   console.log('   local = %s:%s', client.localAddress, client.localPort);
//   console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
//   client.setTimeout(500);
//   client.setEncoding('utf8');
//   client.on('data', function(data) {
//     console.log('Received data from client on port %d: %s',
//                 client.remotePort, data.toString());
//     console.log('  Bytes received: ' + client.bytesRead);
//     writeData(client, 'Sending: ' + data.toString());
//     console.log('  Bytes sent: ' + client.bytesWritten);
//   });
//   client.on('end', function() {
//     console.log('Client disconnected');
//     server.getConnections(function(err, count){
//       console.log('Remaining Connections: ' + count);
//     });
//   });
//   client.on('error', function(err) {
//     console.log('Socket Error: ', JSON.stringify(err));
//   });
//   client.on('timeout', function() {
//     console.log('Socket Timed out');
//   });
// });
// server.listen(8080, function() {
//   console.log('Server listening: ' + JSON.stringify(server.address()));
//   server.on('close', function(){
//     console.log('Server Terminated');
//   });
//   server.on('error', function(err){
//     console.log('Server Error: ', JSON.stringify(err));
//   });
// });
// function writeData(socket, data){
//   var success = !socket.write(data);
//   if (!success){
//     (function(socket, data){
//       socket.once('drain', function(){
//         writeData(socket, data);
//       });
//     })(socket, data);
//   }
// }
console.log("1");