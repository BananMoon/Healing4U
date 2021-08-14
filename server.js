const express = require('express');
const app = express();           //express 라이브러리 사용
const path = require('path');   //ejs사용

const db_config = require(__dirname + '/config/db_info.js'); //config/database.js 에 저장해놓은 mysql 정보를 불러온다.
const dbconnection = db_config.init(); // db의 커넥터를 활성화 시킨다.
db_config.connect(dbconnection); //db에 커넥터를 연결해준다.

/*--------------서버 setting-------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //app 객체의 set 메소드는 속성을 설정하는 역할. views 속성 값으로 views 폴더를 지정함
app.set('view engine', 'ejs');  
console.log('뷰 엔진이 ejs로 설정되었습니다.');

// middleware 
app.use(express.static(__dirname+"/public"));     // 모든 서버로 오는 요청은 해당 middleware를 지나가야한다.

// router - service page
const indexRouter = require('./routes');
app.use('/', indexRouter);

// (현재) db용 페이지는 라우터 거치지 않고 페이지 호출.
app.get('/rating', function(req, res) {
  res.sendFile(__dirname + '/rating.html');
});

// port open
app.listen(2004, function() {
  console.log('listening on 2004♥');
});

/*--------------mysql 연동-------------*/

/*- 웹 브라우저에서 보내온 요청은 웹 서버인 익스프레스에서 컨트롤러로 보낸다.
- 익스프레스에서는 특정 패스로 들어온 요청을 라우팅 함수에서 처리하므로 라우팅 함수를 컨트롤러라고 한다.
- 컨트롤러 안에서는 사용자 요청을 처리하기 위해 mongoose 스키마와 모델 객체를 이용해 데이터베이스를 조회하거나 데이터베이스에 저장한다. 
-> 다음의 이유로 db 조회요청을 위한 router를 따로 만들어줘야할듯함 */

//connection 정의
// const dbconnection = mysql.createConnection({
//   host: 'healing.cdkn59lq9zjm.ap-northeast-2.rds.amazonaws.com',
//   user: 'healing4u',
//   password: 'healing4u',
//   database: "healingDB"
// });

// dbconnection.connect();         // RDS에 접속

//testQuery = "SELECT img_src, address, detail_short, service_name FROM services WHERE (emotion=0 AND img_src is not null";

/*--------안드로이드 송신용 페이지---------*/
app.get('/adsDB', function (req, res) {  
  dbconnection.query("SELECT * FROM advertisement", function (err, rows, fields) {
      if(err) console.log('query is not excuted. select fail...\n' + err);
      else res.send(rows);
  });
});
app.get('/usersDB', function (req, res) {  
  dbconnection.query("SELECT * FROM users", function (err, rows, fields) {
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

app.get('/androidDB', function (req, res) {  
  dbconnection.query("SELECT * FROM android", function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.send(rows);
  });
});
// /*-------------DL 서버 연동------------*/
// json (api 통해서)
app.get('/abc',function(req,res,next){
  console.log('posting');
  return res.json({success:true, msg:"good"});
});

// string (console 통해서)
// /*-------------DL 서버 연동------------*/
var net = require('net');
var server = net.createServer(function(client) {
  console.log('Client connection: ');
  console.log('   local = %s:%s', client.localAddress, client.localPort);
  console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
  client.setTimeout(500);
  client.setEncoding('utf8');
  client.on('data', function(data) {
    console.log('Received data from client on port %d: %s',
                client.remotePort, data.toString());
    console.log('  Bytes received: ' + client.bytesRead);
    writeData(client, 'Sending: ' + data.toString());
    console.log('  Bytes sent: ' + client.bytesWritten);
  });
  client.on('end', function() {
    console.log('Client disconnected');
    server.getConnections(function(err, count){
      console.log('Remaining Connections: ' + count);
    });
  });
  client.on('error', function(err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });
  client.on('timeout', function() {
    console.log('Socket Timed out');
  });
});
server.listen(8080, function() {
  console.log('Server listening: ' + JSON.stringify(server.address()));
  server.on('close', function(){
    console.log('Server Terminated');
  });
  server.on('error', function(err){
    console.log('Server Error: ', JSON.stringify(err));
  });
});
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}
