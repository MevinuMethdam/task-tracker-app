const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Delete button for task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.backgroundColor = '#e53935';
        deleteBtn.onclick = () => li.remove();

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
    }
});