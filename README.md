<p align="center">
  <img src="https://user-images.githubusercontent.com/66311276/133728137-9d42b81f-929f-4e63-82f5-ebf3fc162c3a.png" alt="text" width="680" />
</p>

# Healing4U 프로젝트
감정 인식을 활용한 AI 힐링 옥외 광고(OOH, Out-of-home advertising) 및 모바일 앱(Application) 서비스

## 📆 프로젝트 기간
2021.03 ~ 2021.11

## 👩‍💻 HealingForYou 팀
> 🌱 정현우(팀장) <br>
인공지능 모델 구축, 모바일 웹(Flask) 백엔드 <br>

> 🌱 김민식  <br>
인공지능 모델 구축, 보고서 작성<br>

> 🌱 문윤지 <br>
웹 개발(Node.js), 모바일 웹(Flask) 프론트엔드, DB 관리

> 공동 개발 <br>
학습 데이터 및 서비스 데이터 수집

<hr>

## 서비스 구성도
<p align="center">
  <img src="https://user-images.githubusercontent.com/66311276/133726059-dc370357-d692-439e-bf89-cd1c5d06c6a1.png" alt="text" width="680" />
</p>


## 중요 기능
1. 힐링서비스 제공
  - 날씨 api 연동 ([openweatherAPI](https://openweathermap.org/api))
  - 날씨값을 이용한 DB 조회 및 서비스 제공

2. 광고 서비스 제공
  - 딥러닝 서버로부터 수신된 사용자의 감정값과 계절값을 이용한 DB 조회 및 서비스 제공

3. 만족도 평가 요청
  - 사용자에게 제공된 광고 서비스에 대한 만족도 평가를 요청하여 DB 저장 및 안드로이드에게 전달

<br>

## 🛠️ 라이브러리 및 기술 스택(Library & Stack)
### Tool

### Database

### Infra


### Communication

<hr>

> 모듈
1. nodemon
- 수정 사항 발생 시 서버 재실행이 귀찮음. 자동화 시키는 script library; 
- 설치 `npm install -g` ~~(모든 폴더에서 이용할 수 있도록)~~ `nodemon`

2. body-parser
- 클라이언트에서 받은 데이터들을 서버로 옮길 때 옮겨주는 과정을 하는 역할
- REST API post 요청 시 필요하다.


3. port
- 외부와 네트워크 통신을 하기위한 구멍(6만개정도) 중 특정 포트 번호(2004)를 지정한다.
- 해당 포트 번호로 들어와야 접근이 가능하다.

<br>

> 웹서버 구축 및 배포
- AWS EC2를 이용하여 웹서버 구축
- 가비아를 이용하여 http 배포 및 https로 변환
