/*1번째 방식
const images  =[
    "일본_북해도_오타루거리_snow.JPG",
    "Silverton,CO,US_rainbow.jpg",
    "창문_rain.JPG",
    "Clew Bay,Ireland_sunny.jpg",
    "Poon Hill,Nepal_evening.jpg"
];

const choosenImage = images[Math.floor(Math.random() * images.length)];
// 길이가 5개이면, 5를 곱하는데, 이때 5는 나오지 않음. but index는 0~4이므로 괜찮아.

//javascript에서 이미지를 만들고 html 를 생성!
// html에서 <img src = "img/"창문_rain.JPG"></img>
const bgImage = document.createElement('img'); // js에서 HTML element를 생성했다!!

bgImage.src = `img/${choosenImage}`;

//body 에 추가. document 내에 존재하도록 하려면, appendChild() 사용한다. 
// prepend()는 body에서 가장 앞에 위치. html에서도 가장 위에 뜸.
//document.body.prepend(bgImage);
document.body.appendChild(bgImage);

//추가. 만약, clock 위에 사진을 넣고 싶다면 insertBefore()
//const h2 = document.querySelector("#clock")
//document.body.insertBefore(bgImage, h2);
*/

//db 이용한 조건문
//weather.js의 날씨 API를 여기서도 받아와야하나?
/*
const API_KEY = "a0383cc2ac06a4b4308bb75c735f62d8"
function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const weather = document.querySelector('#weather span:first-child');
        const city =  document.querySelector('#weather span:last-child');
        weather.innerText = `지역: ${data.name}`;
        city.innerText = `날씨 : ${data.weather[0].main}
        온도 : ${data.main.temp}°C`;
    });
}*/

// const time = Service.descript[0];   //0과 1
// const weather = Service.descript[1];    //
// const season = Service.descript[2];

// if (time == 0) {
//     //아침
//     if (weather == "Clear") {
//         if (season in [3,4,5]) {//봄
//             //사진 불러오기
//         }
//         else if (season in [6,7,8]) {//여름
//         }
//         else if (season in [9,10,11]) { //가을 사진

//         }
//         else {
//             //겨울
//         }
//     }
//     else if (weather == "Rainy") {
//         if (season in [3,4,5]) {//봄
//             //사진 불러오기
//         }
//         else if (season in [6,7,8]) {//여름
//         }
//         else if (season in [9,10,11]) { //가을 사진

//         }
//         else {
//             //겨울
//         }
//     }
//     else if (weather == "Humid") {

//     }
// } else if (time ==1) {
//     //저녁
//     if (weather == "Clear") {
//         if (season in [3,4,5]) {//봄
//             //사진 불러오기
//         }
//         else if (season in [6,7,8]) {//여름
//         }
//         else if (season in [9,10,11]) { //가을 사진

//         }
//         else {
//             //겨울
//         }
//     }
// }
var dbConObj = require('../../server');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var clubList = {
	//클럽목록
	list : function(req, res){
		
		var sql = 'SELECT * FROM CLUB'; // 클럽목록
		
		dbconn.query(sql, function(err, results, field){
			
			res.render('club/clubList', {data : 'testData list ejs', clubList : results});
		});
	}
};

module.exports = clubList;
const createImg  = (number) => {
    // <img> 요소를 만듭니다.
    const bgImage = document.querySelector('#bgImage');

    //날씨 api주소와 계절(1~12), 시간에 따라 query문을 달리해야함
    //맑음
    
    //비

    //눈

    

    // <img> src, alt 값을 지정하고 'bgImg' 클래스를 추가합니다.
    bgImage.src = `img/img_${number}.jpg`;
    bgImage.alt = 'background images';
    bgImage.classList.add('bgImg');  //css
    // <body>에 <img> 삽입
    document.body.appendChild(bgImage);

}
const getRandom = () => {
    // 이미지 개수. 얼마든지 변경 가능.
    const IMG_NUM = 4;
    // 0 부터 4 까지의 랜덤 숫자 만들기
    let num = Math.floor(Math.random() * IMG_NUM );
    console.log(num);
    // 이미지 생성함수 호출
    createImg(num);
}

getRandom();