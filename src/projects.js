import { deleteTask } from "./data";

const ToDo = function (id, status, label) {
    this.id = id;
    this.status = status;
    this.label = label;
}

const Task = function (id, title, priority, dueDate, description, toDos = []) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.description = description;
    this.toDos = toDos;
}

// Define a method for adding a toDo to the task
Task.prototype.addToDo = function(toDo) {
    if (toDo instanceof ToDo) {
        this.toDos.push(toDo);
    } else {
        console.warn('The provided item is not a valid toDo.');
    }
}

const Project = function (id, title, description, tasks = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tasks = tasks;
}

// Define a method for adding a task to the project
Project.prototype.addTask = function(task) {
    if (task instanceof Task) {
        this.tasks.push(task);
    } else {
        console.warn('The provided item is not a valid Task.');
    }
}

function createProject(id, title, description, tasks) {
    const newProject = new Project(id, title, description, tasks)
    tasks.forEach(task => newProject.addTask(task));
}

/************** */

// Function to populate the .main div with projects
function populateMainDiv() {
    const mainDiv = document.querySelector('#main');
    mainDiv.innerHTML = ''; // Clear existing content

    // Retrieve all keys from localStorage
    const projectKeys = Object.keys(localStorage);

    // Iterate over each project key
    projectKeys.forEach(key => {
        const project = JSON.parse(localStorage.getItem(key));

        // Create the project container
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.id = project.id;

        // Create the project header
        const projectHeader = document.createElement('header');
        projectHeader.classList.add('projectTitle');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;
        const projectDescription = document.createElement('span');
        projectDescription.textContent = project.description;

        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectDescription);
        projectDiv.appendChild(projectHeader);

        // Create the content section
        const contentSection = document.createElement('section');
        contentSection.classList.add('content');

        // Iterate through the tasks in the project
        project.tasks.forEach((task, taskIndex) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `task-${task.id}`; // Unique ID for the task

            const taskHeader = document.createElement('header');
            const taskTitle = document.createElement('h4');
            taskTitle.textContent = task.title;
            const taskPriority = document.createElement('span');
            taskPriority.classList.add(task.priority.toLowerCase() + 'Priority');
            taskPriority.textContent = task.priority.toUpperCase();

            taskHeader.appendChild(taskTitle);
            taskHeader.appendChild(taskPriority);

            const taskDescriptionDiv = document.createElement('div');
            taskDescriptionDiv.classList.add('description');

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;
            taskDescriptionDiv.appendChild(taskDescription);

            const checkBoxDiv = document.createElement('div');
            checkBoxDiv.classList.add('checkBox');

            // Create checklist items
            const checklistUl = document.createElement('ul');
            task.checkList.forEach(item => {
                const checklistItem = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.id;
                checkbox.checked = item.status;

                const label = document.createElement('label');
                label.setAttribute('for', item.id);
                label.textContent = item.label;

                checklistItem.appendChild(checkbox);
                checklistItem.appendChild(label);
                checklistUl.appendChild(checklistItem);
            });

            checkBoxDiv.appendChild(checklistUl);
            taskDescriptionDiv.appendChild(checkBoxDiv);

            const taskDeadlines = document.createElement('div');
            taskDeadlines.classList.add('deadlines');

            const dueDate = document.createElement('p');
            dueDate.textContent = `Due: ${task.dueDate}`;
            taskDeadlines.appendChild(dueDate);

            // Assuming you have logic to calculate "Expires in"
            const expiresIn = document.createElement('p');
            expiresIn.textContent = `Expires in: X days`; // Replace with actual logic
            taskDeadlines.appendChild(expiresIn);

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('button');

            const editButton = document.createElement('input');
            editButton.type = 'button';
            editButton.value = 'Edit';
            editButton.classList.add('edit');

            const deleteButton = document.createElement('input');
            deleteButton.type = 'button';
            deleteButton.value = 'Delete';
            deleteButton.classList.add('delete');

            deleteButton.addEventListener('click', () => {
                deleteTask(task.id, project.id);
                populateMainDiv(); // Re-populate the main div after deletion
            });

            taskButtons.appendChild(editButton);
            taskButtons.appendChild(deleteButton);

            taskDiv.appendChild(taskHeader);
            taskDiv.appendChild(taskDescriptionDiv);
            taskDiv.appendChild(taskDeadlines);
            taskDiv.appendChild(taskButtons);

            contentSection.appendChild(taskDiv);
        });

        projectDiv.appendChild(contentSection);
        mainDiv.appendChild(projectDiv);
    });
}

// Call the function to populate the .main div
populateMainDiv();

export {populateMainDiv}