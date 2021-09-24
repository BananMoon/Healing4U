const express = require('express');
const app = express();           //express 라이브러리 사용
const path = require('path');   //ejs사용

const db_config = require(__dirname + '/config/db_info.js'); //config/database.js 에 저장해놓은 mysql 정보를 불러온다.

/*--------------서버 setting-------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //app 객체의 set 메소드는 속성을 설정하는 역할. views 속성 값으로 views 폴더를 지정함
app.set('view engine', 'ejs');  
console.log('뷰 엔진이 ejs로 설정되었습니다.');

// middleware 
app.use(express.static(__dirname+"/public"));     // 모든 서버로 오는 요청은 해당 middleware를 지나가야한다.
app.use('/node_modules', express.static(path.join(__dirname+'/node_modules')))

// router - service page
const indexRouter = require('./routes');
// const ratingRouter = require('./routes/rating');
app.use('/', indexRouter);
// app.use('/rating', ratingRouter);


// port open
app.listen(2004, function() {
  console.log('listening on 2004♥');
});


/*--------안드로이드 송신용 페이지---------*/
// app.get('/adsDB', function (req, res) {  
//   dbconnection.query("SELECT * FROM advertisement", function (err, rows, fields) {
//       if(err) console.log('query is not excuted. select fail...\n' + err);
//       else res.send(rows);
//   });
// });
// app.get('/usersDB', function (req, res) {  
//   dbconnection.query("SELECT * FROM users", function (err, rows, fields) {
//     if(err) console.log('query is not excuted. select fail...\n' + err);
//     else res.send(rows);
//   });
// });
// app.get('/healingsDB', function (req, res) {  
//   dbconnection.query("SELECT * FROM healings", function (err, rows, fields) {
//     if(err) console.log('query is not excuted. select fail...\n' + err);
//     else res.send(rows);
//   });
// });

// app.get('/androidDB', function (req, res) {  
//   dbconnection.query("SELECT * FROM android", function (err, rows, fields) {
//     if(err) console.log('query is not excuted. select fail...\n' + err);
//     else res.send(rows);
//   });
// });
// // /*-------------DL 서버 연동------------*/
// // json (api 통해서)
// app.get('/abc',function(req,res,next){
//   console.log('posting');
//   return res.json({success:true, msg:"good"});
// });

// string (console 통해서)
// /*-------------DL 서버 연동------------*/
// var net = require('net');
// var server = net.createServer(function(client) {
//   console.log('Client connection: ');
//   console.log('   local = %s:%s', client.localAddress, client.localPort);
//   console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
//   client.setTimeout(500);
//   client.setEncoding('utf8');

//   //연결 시
//   client.on('data', function(data) {
//     console.log('Received data from client on port %d: %s',
//                 client.remotePort, data.toString());
//     console.log('  Bytes received: ' + client.bytesRead);
//     writeData(client, 'Sending: ' + data.toString());
    
//     console.log('  Bytes sent: ' + client.bytesWritten);
//   });
//   console.log(data);  //여기서 아래에 찍히는지 확인부탁드려요 ->이렇게만 적혀있는데 보기 편하시게 하려면 console.log('===================',data,'==================');이런식으로 바꾸면 보기 편할거에요!!
//   //끊길 시
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
