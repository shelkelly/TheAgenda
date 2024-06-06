var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCompletedList = document.querySelector("#todosCompleted-List");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];
var todosCompleted = [];

getTodos();
getCompleted();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

function renderTodosCompleted() {
  //Clear todoCompletedList element and update new todoCompleted
  todoCompletedList.innerHTML = "";

  // Create todos Completed List
  let list = document.getElementById("todosCompleted-List");
  for (i = 0; i < todosCompleted.length; i++) {
    var li = document.createElement('li');
    li.innerText = todosCompleted[i];
    li.setAttribute("data-index", i);
    list.appendChild(li);

    var button = document.createElement("button");
    button.textContent = "Remove";
    li.appendChild(button);
  }
}

function getTodos() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function getCompleted() {
  var storedTodosCompleted = JSON.parse(localStorage.getItem("todosCompleted-List"));

  //storedTodosCompleted = storedTodosCompleted.flat();

  if (storedTodosCompleted !== null) {
    todosCompleted = storedTodosCompleted;
  }

  renderTodosCompleted();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

function storeTodosCompleted() {
  // Stringify and set "todosCompleted" in localStorage to todosCompleted array
  todosCompleted = todosCompleted.flat();
  localStorage.setItem("todosCompleted-List", JSON.stringify(todosCompleted));
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  storeTodosCompleted();
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");

    //Remove todo and put it in var
    var todoCompleted = todos.splice(index, 1)

    //Add completed todo to todosCompleted array
    todosCompleted.push(todoCompleted);

    
    console.log(todoCompleted);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    storeTodosCompleted();
    renderTodos();
    renderTodosCompleted();

    console.log(todosCompleted);
  }
});

  //When an element inside of the todoCompletedList is clicked
  todoCompletedList.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");

      //remove todo based on data-index
      todosCompleted.splice(index, 1);

      //And update storage
      storeTodosCompleted();
      renderTodosCompleted();
    }
  })

console.log("Original Array: " + todos);
console.log("Completed Array : " + todosCompleted);
