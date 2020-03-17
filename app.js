//define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load event listeners
loadEventListeners();

//function for load
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task
    form.addEventListener('submit', addTask);
    //remove task
    taskList.addEventListener('click', removeTask);
    //clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter
    filter.addEventListener('keyup', filterTasks);
}
// -------------------------------------------------------- //

//add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('add a task')
    }
    //create list item
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append item link
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';


    e.preventDefault();

}

// -------------------------------------------------------- //

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
    //create list item
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append item link
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
        
    });
}

//function that wil store the info in the local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// -------------------------------------------------------- //

//remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
    }
    e.preventDefault()
}
// -------------------------------------------------------- //

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove all tasks

function clearTasks(e) {
    if (confirm('are you sure ?')) {
        taskList.innerHTML = ''
    }
    
    e.preventDefault();

    clearTasksFromLocalStorage();
}

// -------------------------------------------------------- //

//clear task from ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


//filter text
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}
// -------------------------------------------------------- //