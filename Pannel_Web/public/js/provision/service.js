// //service.html 에 적용되는 js
// // 사용자 기분에 따라 다른 영상제공
// let eat = [
//     {
//         emotion: 0,
//         type: "hot",
//         videoSrc: 'bOejScVoH6c'   //엽떡
//     },
//     {
//         emotion: 1,
//         type: "sweet",
//         videoSrc: 'gLXdjbHU_Dk'
//     } 
// ];
// let activity = [    //스키장
//     {
//         weather: "snowy",
//         season: "winter",
//         videoSrc: 'SqfmDG34xB0'
//     }
// ];
// const category = "Eat";
// const emotion = 0;      //sad. db에서 가져와야지

// //랜덤
// //todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];
// //db로부터 받아온 날씨 + 사용자 감정 에 따라 조건문
// /*
// if (category == "Eat") {
//     if (emotion == 0) {   //sad. 매콤
//         iframeEle.src = 'https://www.youtube.com/embed/' + videoSrc[__index] + '?autoplay=1&mute=1';
//     } elseif (emotion ==1)  {//happy. 달콤.. 아무거나 
//         iframeEle.src = 'https://www.youtube.com/embed/' + videoSrc[__index] + '?autoplay=1&mute=1';
//     }
// } else if (category == "Activity") {
//     iframeEle.src = 'https://www.youtube.com/embed/' + videoSrc[__index] + '?autoplay=1&mute=1';
// }
// */

// //test
// const videoSrc = [
//     'HrAHZ3_0KOw',
//     'bOejScVoH6c',   //엽떡
//     'HrAHZ3_0KOw'   //
//   ];

// randomSrc = videoSrc[Math.floor(Math.random()*videoSrc.length)];

// const iframeEle = document.querySelector('#vedio');   //service.html의 iframe요소
// console.log(randomSrc);

// iframeEle.src = `https://www.youtube.com/embed/${randomSrc}?autoplay=1&mute=1`;

// //iframeEle.src = 'https://www.youtube.com/embed/' + videoSrc[__index] + '?autoplay=1&mute=1';
// //'https://www.youtube.com/embed/' + videoSrc[srcIdx] + '?autoplay=1&mute=1';

// /*
//             <iframe width="1400" height="800" src="https://www.youtube.com/embed/J08a3_dGtmo?rel=0&amp;autoplay=1&mute=1&amp;loop=1;playlist=J08a3_dGtmo" frameborder="0"></iframe>
//             */