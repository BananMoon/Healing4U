<p align="center">
  <img src="https://user-images.githubusercontent.com/66311276/133728137-9d42b81f-929f-4e63-82f5-ebf3fc162c3a.png" alt="text" width="580" />
</p>

### 목차
  * [Healing4U 프로젝트?](#Healing4Uproject)
  * [서비스 구성도](#serviceArchitecture)
  * [서비스 흐름도](#serviceFlow)
  * [중요 기능](#importantFunc)
  * [기술 스택](#stack)
  * [ETC](#etc)
  * 시연 모습은 [여기](https://www.notion.so/625d5964a7094ebe8c680c0474ca5042#a4b4fc9e2ca54c25955dc66fb4916e4d)로 와주세요


## Healing4U 프로젝트 <a id="Healing4Uproject"></a>
- 감정 인식을 활용한 AI 힐링 옥외 광고(OOH, Out-of-home advertising) 및 모바일웹(Mobile-Web) 서비스
- 프로젝트 기간 📆 : 2021.03 ~ 2021.11

## 👩‍💻 HealingForYou 팀
> 🌱 정현우(팀장) <br>
데이터 수집, 모델 개발, 딥러닝 서버 구축 및 연동(AWS_deep learning ami), 모바일 웹 프론트엔드 연동 <br>

> **🌱 문윤지** <br>
**웹 개발(Node.js), 모바일 웹 개발(Spring Boot), DB 구축 및 관리, 웹 서버 구축 및 연동(AWS_S3, RDS, EC2, Route53)**

> 🌱 김민식  <br>
데이터 수집, 모델 개발, 딥러닝 서버 구축 및 연동(AWS_deep learning ami) <br>

> 공동 작업 <br>
학습 데이터 및 서비스 데이터 수집, SW보고서 작성, 논문 작성


## 서비스 구성도 <a id="serviceArchitecture"></a>
<p align="center">
  <img src="https://user-images.githubusercontent.com/66311276/143766399-10654253-1648-408e-98fc-66660d88b935.png" alt="text" width="680" height="400" />
</p>

|단계|내용|설명|
|:-:|:-:|:-:|
|①|날씨 기반 힐링 서비스|실시간 기상 데이터를 통한 힐링 서비스를 패널에 제공|
|②|객체 및 감정 인식|사용자의 얼굴을 인식하고 표정을 통해 감정을 분류|
|③|표정 분류 결과 전송|딥러닝 서버에서 분류한 표정 결과를 웹서버로 전송|
|④|광고(힐링) 서비스 제공|분류 결과에 따른 광고(힐링) 서비스를 패널로 제공|
|⑤|추가적인 광고(힐링) 서비스|QR코드를 통해 모바일 웹에 접속하여 추가적인 광고(힐링) 서비스를 제공|



## 서비스 흐름도 <a id="serviceFlow"></a>
<p align="center">
  <img src="https://user-images.githubusercontent.com/66311276/143767365-ec78a957-2a66-42c5-9ce6-5a9f6b6dc379.png" alt="text width="680" height="400" />
</p>

## 중요 기능 <a id="importantFunc"></a>
**1. 객체 인식 및 감정 분류**
  - [AI Hub](https://aihub.or.kr/)에서 "한국인 감정 인식을 위한 복합 영상" 데이터 사용
  - YOLO를 이용한 객체 인식
  - CNN 이미지 분류모델인 VGGNet(19-layer)과 RESNET (50-layer) 모델을 이용한 감정 분류
  - 실시간으로 라즈베리카메라를 통해 전달받은 프레임을 모델에 입력시켜 감정을 분류한 뒤, 웹 서버에 전달 및 DB 저장
  
**2. 힐링 서비스 제공**
  - 날씨 api 연동 ([openweatherAPI](https://openweathermap.org/api))
  - 날씨값을 이용하여 힐링 비디오와 힐링 문구를 조회
  - 날씨와 계절에 적합한 힐링 서비스(비디오와 문구)를 옥외 패널을 통해 제공

**3. 광고 서비스 제공**
  - 딥러닝 서버로부터 수신된 사용자의 감정값과 계절값을 이용하여 DB 조회
  - 사용자 기분에 맞춤화된 광고 서비스 제공

**4. 만족도 평가 요청**
  - 사용자에게 제공된 광고 서비스에 대한 만족도 평가를 요청하여 DB 저장 및 안드로이드에게 전달

**5. 개인화 서비스 추가 제공**
  - 모바일웹 서비스 (옥외 패널에서 QRCode를 통해 연계된다.)
  - 패널을 통해 제공받은 광고 서비스의 세부정보와 **부가적인 서비스 제공**
    - QRCode를 통해 연결된 첫 화면에서 모달창을 띄워 사용자로부터 사용자 ID를 제공받는다. <br><br>
                                                          
    1️⃣ **AI기술을 통해 인식된 사용자 기분 표시**
    - 사용자의 기분이 어떻게 인식되었는지 알려준다.<br>
    - 날씨로 표현 : 맑음☀️, 흐림☁️, 비☔<br>
    
    2️⃣ **해당 서비스 사용자들의 축적된 기분 데이터**
    - 서비스 사용자들의 기분을 보여줌으로써 사용자들 간의 연대감과 위로를 건넨다.<br>
    
    3️⃣ **옥외패널을 통해 제공받은 광고서비스의 세부적인 정보 제공**<br>
    - 사용자의 기분에 맞춤화된 광고 서비스의 세부 정보를 제공한다. (세부 정보 : 여행코스 및 이용 정보, 카카오맵 연결 링크 제공)<br>
    - 예1) 힐링이 필요한 사용자에게 힐링을 위한 여행지와 여행코스를 추천한다.<br>
    - 예2) 기분이 좋은 사용자에게 소비를 이끄는 광고 서비스 혹은 익스트림한 스포츠활동을 추천한다.<br>
    
    4️⃣ **사용자 만족도 기반 광고서비스 추천**
    - 광고 서비스를 제공받은 사용자들로부터 평가받은 만족도 데이터를 집계하여 랭킹서비스를 제공한다.<br>
 
    5️⃣ **광고데이터 히스토리 서비스**
    - 사용자가 최근 제공받은 광고 서비스의 기록을 보여준다.

 
<br>

## 🛠️ 기술 스택(Stack) <a id="stack"></a>
### Language & Framework(Flatform)
- JavaScript, CSS, ejs & Node.js
- Java & Spring Framework (JDK 11, Gradle)
- Python & Flask

                                                          
### Database
- MySQL

### Infra
- AWS EC2
- AWS Deep Learning AMI
- AWS S3
- AWS route 53
- AWS RDS (MySQL)

### Communication
- Slack
- Gitlab

### IDE 
- Visual Studio Code
- IntelliJ
- Jupyter Notebook

<hr>
                                           
## ETC <a id="etc"></a>
> 웹서버 구축 및 배포
- AWS EC2를 이용하여 웹서버 구축
- 가비아를 이용하여 http 배포 및 https로 변환
