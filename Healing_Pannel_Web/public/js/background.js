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

const createImg  = (number) => {
    // <img> 요소를 만듭니다.
    const bgImage = document.querySelector('#bgImage');
//    const bgImage = document.createElement('img');
    // <img> src, alt 값을 지정하고 'bgImg' 클래스를 추가합니다.
    bgImage.src = `img/img_${number}.jpg`;
    bgImage.alt = 'background images';
    bgImage.classList.add('bgImg');  //css
    // <body>에 <img> 삽입
    document.body.appendChild(bgImage);

}
const getRandom = () => {
    // 이미지 개수. 얼마든지 변경 가능.
    const IMG_NUM = 5;
    // 0 부터 4 까지의 랜덤 숫자 만들기
    let num = Math.floor(Math.random() * IMG_NUM );
    console.log(num);
    // 이미지 생성함수 호출
    createImg(num);
}

getRandom();