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
app.use('/', indexRouter);


// port open
app.listen(2004, function() {
  console.log('listening on 2004♥');
});