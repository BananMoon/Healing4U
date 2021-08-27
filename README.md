# Healing4U
감정 인식을 활용한 AI 힐링 옥외 광고(OOH, Out-of-home advertising) 및 모바일 앱(Application) 서비스

### 기능
1. 힐링서비스 제공
  - 날씨 api 연동 ([openweatherAPI](https://openweathermap.org/api))
  - 날씨값을 이용한 DB 조회 및 서비스 제공

2. 광고 서비스 제공
  - 딥러닝 서버로부터 수신된 사용자의 감정값과 계절값을 이용한 DB 조회 및 서비스 제공

3. 만족도 평가 요청
  - 사용자에게 제공된 광고 서비스에 대한 만족도 평가를 요청하여 DB 저장 및 안드로이드에게 전달

### 모듈
1. nodemon
- 수정 사항 발생 시 서버 재실행이 귀찮음. 자동화 시키는 script library; 
- 설치 `npm install -g` ~~(모든 폴더에서 이용할 수 있도록)~~ `nodemon`

2. body-parser
- 클라이언트에서 받은 데이터들을 서버로 옮길 때 옮겨주는 과정을 하는 역할

3. path
- 
- `const path = require('path');`   //ejs사용

4. port
- 외부와 네트워크 통신을 하기위한 구멍(6만개정도) 중 특정 포트 번호(2004)를 지정한다.
- 해당 포트 번호로 들어와야 접근 가능


### 라우터
1. index.js
2. model.js (예정)