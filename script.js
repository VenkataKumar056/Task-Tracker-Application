document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks on the page
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            saveTasks();
            taskInput.value = '';
            renderTasks();
        }
    });

    // Edit or Delete task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const updatedTask = prompt('Edit task:', tasks[index]);
            if (updatedTask !== null && updatedTask.trim() !== '') {
                tasks[index] = updatedTask.trim();
                saveTasks();
                renderTasks();
            }
        }
    });

    renderTasks();
});
