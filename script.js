const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Load tasks from LocalStorage when page opens
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskObj = { text: taskText, completed: false };
        createTaskElement(taskObj);
        saveTaskToLocalStorage(taskObj);
        taskInput.value = "";
        updateTaskCount();
    }
}

function createTaskElement(taskObj) {
    const li = document.createElement('li');
    li.textContent = taskObj.text;

    if (taskObj.completed) {
        li.classList.add('completed');
    }

    // Click to toggle complete status
    li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            li.classList.toggle('completed');
            updateLocalStorage();
            updateTaskCount();
        }
    });

    // Delete button for task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';

    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
        updateTaskCount();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    updateTaskCount();
}

// LocalStorage Functions
function saveTaskToLocalStorage(taskObj) {
    let tasks = JSON.parse(localStorage.getItem('pharmaTasks')) || [];
    tasks.push(taskObj);
    localStorage.setItem('pharmaTasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('pharmaTasks')) || [];
    tasks.forEach(task => createTaskElement(task));
    updateTaskCount();
}

function updateLocalStorage() {
    const liElements = document.querySelectorAll('#taskList li');
    let tasks = [];
    liElements.forEach(li => {
        const text = li.childNodes[0].nodeValue.trim();
        const completed = li.classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('pharmaTasks', JSON.stringify(tasks));
}

function updateTaskCount() {
    const totalTasks = document.querySelectorAll('#taskList li').length;
    taskCount.textContent = `${totalTasks} task${totalTasks === 1 ? '' : 's'}`;
}