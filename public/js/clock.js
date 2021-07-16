const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date();  //호출 당시 시각
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
} //이 함수를 매 2초마다 실행

getClock();
setInterval(getClock, 1000);  // 동작은 전혀 다름.