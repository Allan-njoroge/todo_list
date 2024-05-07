document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.add-btn');
    const taskInput = document.querySelector('.task-input');
    const tasksContainer = document.querySelector('.tasks-container');

    // Initialize tasks array
    let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

    // constructor function of the task item
    function Task(desc) {
        this.desc = desc;
    }


    function render() {
        tasksContainer.innerHTML = '';

        for (let i = 0; i < tasksArray.length; i++) {
            let task = tasksArray[i];
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');

            taskItem.innerHTML = `
            <p>${task.desc}</p>
            <div>
                <button class="pry-btn del-btn">Delete</button>
            </div>
        `
        // Attach the  delete event listener to each delete button
        const deleteBtn = taskItem.querySelector('.del-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTask(i);
        })

        tasksContainer.appendChild(taskItem)
        }
    }

    // function to add new list
    function addTask(taskDesc) {
        let status = false;
        let newTask = new Task(taskDesc, status);
        tasksArray.push(newTask)

        // save tasks to local storage
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray))

        render();
    }

    addBtn.addEventListener('click', () => {
        const taskValue = taskInput.value.trim();

        if (taskInput.value === '') {
            alert(`Empty task`)
        } else {
            addTask(taskValue);
            taskInput.value = ""; // clear task input
        }
    });

    // This function enables to delete tasks
    function deleteTask(index) {
        tasksArray.splice(index, 1);
        // save update to local storage
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
        render()
    }
    render()
})