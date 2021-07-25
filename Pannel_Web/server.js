// mongodb 연동
const mongoose = require('mongoose');
const db = mongoose.connection;
//const userModel = require('./schema/userSchema')
const URL = "mongodb+srv://woo:woo@healing4u.mpydi.mongodb.net/Healing4U?retryWrites=true&w=majority"
mongoose.connect(URL);

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
  console.log('DB connected');
});

//model은 객체를 DB에 연결하는 것. Cat 객체를 이용해서 DB명령을 가능하게 해줍니다. model의 첫번째 인자는 model이름을 갖고, 두번째 인자는 model에서 사용될 Schema를 갖습니다.
const userSchema = mongoose.Schema({
  emotion: Number,          // 사용자 표정(0,1)
  grade: Number             //0~5
});
const User = mongoose.model('User', userSchema);

const serviceSchema = mongoose.Schema({
  image: Array,
  placeName: String,      // 장소명
  descript: Array         //[0(0:아침,1:저녁), "Rain", 6(월)]
});

const Service = mongoose.model('Service', serviceSchema);

//model을 사용해서 데이터를 데이터베이스에 저장하는 방법
//var test = new User({ emotion: 0, image: [2,4,6], placeName: "Dongtan", grade: 3});
//test.save();
//console.log('save Succeed!');

//body-parser: 클라이언트에서 받은 데이터들을 서버로 옮길 때 옮겨주는 과정을 하는 역할

//nodejs에서 서버(express)를 만들기위한 기본셋팅
const express = require('express');
const app = express(); //express 라이브러리 사용
const path = require('path');   //ejs사용
//const connect = require('./schema')
//middle ware
//모든 서버로 오는 요청은 해당 middleware를 지나가야한다.
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));
//connect();
//listen (param1, param2)
// param1:서버띄울 포트번호, param2: 서버 띄운 후 실행할 코드
// 8080 port에 서버 띄워주세요~~
//port란? 로컬 컴퓨터에 서버를 하나 만들었는데, 8080번으로 들어와야 서버가 열리는 것
//외부와 네트워크 통신을 하기위한 구멍(6만개정도) 중 8080을 통해 들어오면!


// get 요청을 처리하는 기계 제작
// /beauty/home으로 GET요청 -> 뷰티 상품들을 보여줌
// 링크에 넣는게 get
// READ
app.get('/userdbtest', function(req, res) {  //req, res
//  res.send('healing 패널 페이지입니다.');
  User.find({}, (err, user) => {
    if(err) return res.json(err);
    //res.render('read', { user: user }); -> html과 같이 띄우기위해
    //res.json(user)
    res.json(user);
    //
  });
});
app.get('/servicedbtest', function(req,res) {
  Service.find({}, (err, service) => {
    if(err) return res.json(err);
    //res.render('read', { user: user }); -> html과 같이 띄우기위해
    //res.json(user)
    res.json(service);
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


app.listen(1004, function() {
  console.log('listening on 1004♥');
});