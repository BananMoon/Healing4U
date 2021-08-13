const toDoForm = document.querySelector('#todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.querySelector('#todo-list'); 

let toDos = [];
const TODOS_KEY = "todos";

function saveToDos() {   //db에 저장
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    console.log(localStorage.getItem(TODOS_KEY));
}

function handleTodoDelete(event) { // X버튼을 눌렀을 때
    // 해당 li를 삭제
    const delList = event.target.parentNode;
    delList.remove();
    console.log(typeof(delList.id)); //해당 li의 id를 얻을 때는 string타입.
    //삭제
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(delList.id)); //타입을 맞춰야함
    saveToDos();
}

function paintToDo(newTodo){
    // 리스트 생성
    const li = document.createElement('li');
    li.id = newTodo.id;  //추가
    const span = document.createElement('span');
    span.innerText = newTodo.text;   //object의 text로 입력해줘야함
    li.appendChild(span);
    // 삭제 버튼 생성
    const delButton = document.createElement("button");
    delButton.innerText = "CLEAR 👌";
    li.appendChild(delButton);
    toDoList.appendChild(li);
    delButton.addEventListener("click", handleTodoDelete);
}
// 입력값 받기
function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value=""; //입력 완료 후 입력값 사라지게 하기
    // todo 저장하기
    const TodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(TodoObj);  //배열 추가
    //list와 delButton 생성하기
    paintToDo(TodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

//list가 화면에 보이도록
const savedToDos = localStorage.getItem(TODOS_KEY);  // string

if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);  // array
    toDos = parsedToDos;
    //array는 forEach라는 function을 갖고 있음
    parsedToDos.forEach(paintToDo); // array의 item마다 접근해서 출력,처리.. 가능!
}