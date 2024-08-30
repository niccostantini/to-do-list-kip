import { generateId } from "./generateIds.js";
import { createProjectFromForm } from "./data.js";
import { populateMainDiv } from "./projects.js";

let taskNumber = 0;

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
    form.appendChild(projectIdBox);

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
    taskNumber = 0;
    function addNewTaskSection(generateTasksDiv) {

        taskNumber++;

        const taskId = generateId();
        const fieldset = document.createElement('fieldset');
        
        const legend = document.createElement('legend');
        legend.innerHTML = `Task <span class="task-number">${taskNumber}</span>`;
        fieldset.appendChild(legend);

        // Task Title
        const taskTitleLabel = document.createElement('label');
        taskTitleLabel.setAttribute('for', `taskTitle-${taskNumber}`);
        taskTitleLabel.textContent = 'Task Title';
        fieldset.appendChild(taskTitleLabel);

        const taskIdBox = document.createElement('input');
        taskIdBox.type = 'text';
        taskIdBox.id = `taskId-${taskNumber}`;
        taskIdBox.name = `taskId-${taskNumber}`;
        taskIdBox.required = true;
        taskIdBox.hidden = true;
        taskIdBox.value = taskId;
        fieldset.appendChild(taskIdBox);

        const taskTitleInput = document.createElement('input');
        taskTitleInput.type = 'text';
        taskTitleInput.id = `taskTitle-${taskNumber}`;
        taskTitleInput.name = `taskTitle-${taskNumber}`;
        taskTitleInput.required = true;
        fieldset.appendChild(taskTitleInput);

        // Task Priority
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.setAttribute('for', `taskPriority-${taskNumber}`);
        taskPriorityLabel.textContent = 'Priority';
        fieldset.appendChild(taskPriorityLabel);

        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.id = `taskPriority-${taskNumber}`;
        taskPrioritySelect.name = `taskPriority-${taskNumber}`;
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
        taskDescriptionLabel.setAttribute('for', `taskDescription-${taskNumber}`);
        taskDescriptionLabel.textContent = 'Task Description';
        fieldset.appendChild(taskDescriptionLabel);

        const taskDescriptionTextarea = document.createElement('textarea');
        taskDescriptionTextarea.id = `taskDescription-${taskNumber}`;
        taskDescriptionTextarea.name = `taskDescription-${taskNumber}`;
        taskDescriptionTextarea.rows = 3;
        taskDescriptionTextarea.required = true;
        fieldset.appendChild(taskDescriptionTextarea);

        // Task Due Date
        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.setAttribute('for', `taskDueDate-${taskNumber}`);
        taskDueDateLabel.textContent = 'Task Due Date';
        fieldset.appendChild(taskDueDateLabel);

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.type = 'date';
        taskDueDateInput.id = `taskDueDate-${taskNumber}`;
        taskDueDateInput.name = `taskDueDate-${taskNumber}`;
        taskDueDateInput.required = true;
        fieldset.appendChild(taskDueDateInput);

        // Task ToDo's
        /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, AN ID MUST BE GIVE TO ALL TODOS     */
        const taskChecklistLabel = document.createElement('label');
        taskChecklistLabel.setAttribute('for', `taskChecklist-${taskNumber}`);
        taskChecklistLabel.textContent = "ToDo's";
        fieldset.appendChild(taskChecklistLabel);

        const taskChecklistInput = document.createElement('input');
        taskChecklistInput.type = 'text';
        taskChecklistInput.id = `taskChecklist-${taskNumber}`;
        taskChecklistInput.name = `taskChecklist-${taskNumber}`;
        taskChecklistInput.placeholder = 'Separate items by semicolons';
        taskChecklistInput.required = true;
        fieldset.appendChild(taskChecklistInput);

        // Delete Task Button
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.type = 'button';
        deleteTaskButton.className = 'deleteTaskButton';
        deleteTaskButton.textContent = 'Delete Task';
        fieldset.appendChild(deleteTaskButton);

        //Delete the fieldset relative to the task to be deleted
        deleteTaskButton.addEventListener("click", (e) => {
            e.target.closest("fieldset").remove();
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

    createProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        createProjectFromForm();
        populateMainDiv();
    })

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