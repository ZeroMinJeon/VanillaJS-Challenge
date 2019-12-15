const todoInputForm = document.querySelector(".js-todoForm"),
    todoInput = todoInputForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOLIST_LS ='todo_list';
todos = [];


function saveTodos(){
    localStorage.setItem(TODOLIST_LS, JSON.stringify(todos));
}

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const renewTodos = todos.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    todos = renewTodos;
    saveTodos();
}

function showTodo(todo){
    const li = document.createElement("li");
    const dltbtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length + 1;
    dltbtn.innerText = "DEL";
    dltbtn.addEventListener("click",deleteTodo);
    span.innerText = todo;
    li.appendChild(dltbtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        todo : todo,
        id : newId
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    showTodo(currentValue);
    todoInput.value = "";
}

function getTodoList(){
    const  localTodoListData = localStorage.getItem(TODOLIST_LS);
    if(localTodoListData !== null) {
        //데이터가 있다면 showing
        const parsedTodoListData = JSON.parse(localTodoListData);
        console.log(parsedTodoListData);
        parsedTodoListData.forEach(function(todo){
            showTodo(todo.todo);
        });
    }
}

function init(){
    getTodoList();
    todoInputForm.addEventListener("submit",handleSubmit);
}

init();
