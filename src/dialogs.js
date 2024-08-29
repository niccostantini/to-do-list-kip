import { generateId } from "./generateIds.js";

function createProjectDialog() {
    const dialog = document.createElement('dialog');
    dialog.id = 'addProjectDialog';

    const form = document.createElement('form');
    form.id = 'addProjectForm';
    form.name = 'addProjectForm';
    form.method = 'dialog';

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = 'Create New Project';
    form.appendChild(titleHeading);

    // Project Title
    const projectId = generateId();
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'projectTitle');
    titleLabel.textContent = 'Project Title';
    form.appendChild(titleLabel);

    const projectIdBox = document.createElement('input');
    projectIdBox.type = 'text';
    projectIdBox.id = 'projectId';
    projectIdBox.name = 'projectId';
    projectIdBox.required = true;
    projectIdBox.hidden = true;
    projectIdBox.value = projectId;

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'projectTitle';
    titleInput.name = 'projectTitle';
    titleInput.required = true;
    form.appendChild(titleInput);

    // Project Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'projectDescription');
    descriptionLabel.textContent = 'Project Description';
    form.appendChild(descriptionLabel);

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'projectDescription';
    descriptionTextarea.name = 'projectDescription';
    descriptionTextarea.rows = 3;
    descriptionTextarea.required = true;
    form.appendChild(descriptionTextarea);

    form.appendChild(document.createElement('hr'));

    // Tasks Section
    const tasksSection = document.createElement('div');
    tasksSection.id = 'tasksSection';

    const tasksHeading = document.createElement('h3');
    tasksHeading.textContent = 'Tasks';
    tasksSection.appendChild(tasksHeading);

    // Task Template
    // const taskTemplate = document.createElement('div');
    // taskTemplate.className = 'task-template';
    // taskTemplate.id = 'task-template'

    /**THIS MUST BE MADE A FUNCTIN OF TO GENERATE AS MANY TASK FIELD AS NEEDED WHEN CLICKING ON THE NEWTASK BUTTON*/
    /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, A UNIQUE ID MUST BE GIVE TO EACH TASKS     */
    function addNewTaskSection(generateTasksDiv) {
        const taskId = generateId();
        const fieldset = document.createElement('fieldset');
        
        const legend = document.createElement('legend');
        legend.innerHTML = `Task <span class="task-number">1</span>`;
        fieldset.appendChild(legend);

        // Task Title
        const taskTitleLabel = document.createElement('label');
        taskTitleLabel.setAttribute('for', 'taskTitle-1');
        taskTitleLabel.textContent = 'Task Title';
        fieldset.appendChild(taskTitleLabel);

        const taskIdBox = document.createElement('input');
        taskIdBox.type = 'text';
        taskIdBox.id = 'taskId';
        taskIdBox.name = 'taskId';
        taskIdBox.required = true;
        taskIdBox.hidden = true;
        taskIdBox.value = taskId;

        const taskTitleInput = document.createElement('input');
        taskTitleInput.type = 'text';
        taskTitleInput.id = 'taskTitle-1';
        taskTitleInput.name = 'taskTitle-1';
        taskTitleInput.required = true;
        fieldset.appendChild(taskTitleInput);

        // Task Priority
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.setAttribute('for', 'taskPriority-1');
        taskPriorityLabel.textContent = 'Priority';
        fieldset.appendChild(taskPriorityLabel);

        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.id = 'taskPriority-1';
        taskPrioritySelect.name = 'taskPriority-1';
        taskPrioritySelect.required = true;
        ['high', 'medium', 'low'].forEach(priority => {
            const option = document.createElement('option');
            option.value = priority.toLowerCase();
            option.textContent = priority;
            taskPrioritySelect.appendChild(option);
        });
        fieldset.appendChild(taskPrioritySelect);

        // Task Description
        const taskDescriptionLabel = document.createElement('label');
        taskDescriptionLabel.setAttribute('for', 'taskDescription-1');
        taskDescriptionLabel.textContent = 'Task Description';
        fieldset.appendChild(taskDescriptionLabel);

        const taskDescriptionTextarea = document.createElement('textarea');
        taskDescriptionTextarea.id = 'taskDescription-1';
        taskDescriptionTextarea.name = 'taskDescription-1';
        taskDescriptionTextarea.rows = 3;
        taskDescriptionTextarea.required = true;
        fieldset.appendChild(taskDescriptionTextarea);

        // Task Due Date
        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.setAttribute('for', 'taskDueDate-1');
        taskDueDateLabel.textContent = 'Task Due Date';
        fieldset.appendChild(taskDueDateLabel);

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.type = 'date';
        taskDueDateInput.id = 'taskDueDate-1';
        taskDueDateInput.name = 'taskDueDate-1';
        taskDueDateInput.required = true;
        fieldset.appendChild(taskDueDateInput);

        // Task ToDo's
        /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, AN ID MUST BE GIVE TO ALL TODOS     */
        const taskChecklistLabel = document.createElement('label');
        taskChecklistLabel.setAttribute('for', 'taskChecklist-1');
        taskChecklistLabel.textContent = "ToDo's";
        fieldset.appendChild(taskChecklistLabel);

        const taskChecklistInput = document.createElement('input');
        taskChecklistInput.type = 'text';
        taskChecklistInput.id = 'taskChecklist-1';
        taskChecklistInput.name = 'taskChecklist-1';
        taskChecklistInput.placeholder = 'Separate items by semicolons';
        taskChecklistInput.required = true;
        fieldset.appendChild(taskChecklistInput);

        // Delete Task Button
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.type = 'button';
        deleteTaskButton.className = 'deleteTaskButton';
        deleteTaskButton.textContent = 'Delete Task';
        fieldset.appendChild(deleteTaskButton);

        deleteTaskButton.addEventListener("click", (e) => {
            e.target.closest("fieldset").remove()
        })

        // taskTemplate.appendChild(fieldset);
        generateTasksDiv.appendChild(fieldset);
    }

/** UP TO HERE */

    //Add div for generting tasks
    const generateTasksDiv = document.createElement('div');
    generateTasksDiv.className = 'generateTasksDiv';
    tasksSection.appendChild(generateTasksDiv);

    // Add Task Button
    const addTaskButton = document.createElement('button');
    addTaskButton.type = 'button';
    addTaskButton.id = 'addTaskButton';
    addTaskButton.textContent = 'Add Task';
    tasksSection.appendChild(addTaskButton);

    addTaskButton.addEventListener("click", () => {
        addNewTaskSection(generateTasksDiv)
    })

    form.appendChild(tasksSection);

    form.appendChild(document.createElement('hr'));

    // Form Submit Buttons
    const formButtonsDiv = document.createElement('div');
    formButtonsDiv.className = 'form-buttons';

    const createProjectButton = document.createElement('button');
    createProjectButton.type = 'submit';
    createProjectButton.id = 'addProjectSubmit';
    createProjectButton.textContent = 'Create Project';
    formButtonsDiv.appendChild(createProjectButton);

    const cancelProjectButton = document.createElement('button');
    cancelProjectButton.type = 'button';
    cancelProjectButton.id = 'cancelProjectSubmit';
    cancelProjectButton.textContent = 'Cancel';
    formButtonsDiv.appendChild(cancelProjectButton);

    form.appendChild(formButtonsDiv);
    dialog.appendChild(form);

    return dialog;
}

export {createProjectDialog};