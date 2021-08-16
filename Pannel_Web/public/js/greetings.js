const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input"); 
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"; //string 담는 변수는 대문자.
const USERNAME_KEY = "username";
function onLoginSubmit(event){
    event.preventDefault();             //이게 없으면 submit할 때마다 새로고침됨
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;  //user이름 저장
    localStorage.setItem(USERNAME_KEY, username);  //key와 함께 value 저장
    paintGreetings(username);
}
function paintGreetings(username) {
    greeting.innerText= `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);  //없다면 null 반환

if (savedUsername ===null) {
    //show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);

} else {
    //hide the form
    paintGreetings(savedUsername)
}