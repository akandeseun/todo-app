// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// FUNCTIONS
function addTodo(event) {
  // Prevent Form from submiting
  event.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create <li></li>
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Add Todo to local storage
  saveLocalTodos(todoInput.value);

  // Check Mark Button

  const completedButton  = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Check Trash Button

  const trashButton  = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);


    // Append to List
  todoList.appendChild(todoDiv)

  // Clear Input Value
  todoInput.value = '';

  
};

function deleteCheck(event) {
  const item = event.target;

  // Delete Todo
  if (item.classList[0] === 'trash-btn') {

    const todo = item.parentElement

    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function() {
      todo.remove();
      
    });
    // todo.remove();
  };

  // Check Mark (Completed)

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');

    
  };
  
};

function filterTodo(event) {
  const todos = todoList.childNodes;

  // looping through all todos
  todos.forEach(function(todo){
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = "flex";
        }else {
          todo.style.display = "none"
        }

        break;

      case "pending":
        if (!todo.classList.contains('completed')) {
          todo.style.display = "flex";
          
        }else {
          todo.style.display = "none";
        }

        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check if there is anything there

  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];

    
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {

  // Check if there is anything there

  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];

    
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){

    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create <li></li>
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // // Add Todo to local storage
    // saveLocalTodos(todoInput.value);

    // Check Mark Button

    const completedButton  = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Check Trash Button

    const trashButton  = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


      // Append to List
    todoList.appendChild(todoDiv)
  })
}


function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];

    
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  // console.log();
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}
