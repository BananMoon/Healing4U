//const clock = document.querySelector("h2#clock");


function getClock() {
    const now = new Date();  //호출 당시 시각
    console.log(now.getFullYear(), now.getMonth()+1, now.getDate());
    const year = String(now.getFullYear());
    const month = String(now.getMonth()+1);
    const date = String(now.getDate());
    const day = `${year}년 ${month}월 ${date}일`;

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clock.innerText = `${day}
    ${hours} : ${minutes} : ${seconds}`;
} //이 함수를 매 2초마다 실행

function renderclockFunc() {
    getClock();
    setInterval(getClock, 1000);  // 동작은 전혀 다름.
};
    
    
// module.exports = {
//     renderclockFunc,
//     test: function(a,b) {
//         return a+b
//     }
// }