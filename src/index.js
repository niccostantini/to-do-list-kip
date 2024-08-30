import "./styles/normalize.css";
import "./styles/styles.css";
import "./styles/fonts.scss";
import "./assets/images/corkbg_2.png";

import {templateProjects, addTemplates} from "./data.js"
import { populateMainDiv } from "./projects.js";
import { createProjectDialog } from "./dialogs.js";


const addButton = document.querySelector('#addButton');
const addProjectButton = document.querySelector('.addProjectButton');
const addTaskButton = document.querySelector('.addTaskButton');
const addButtons = document.querySelectorAll("#addButton, .addProjectButton, .addTaskButton")
const taskHeaders = document.querySelectorAll(".task > header");


// Add listeners for add button graphics
// Show AddProject and AddTask upon hover an PLUS button and keep them showw
// also when hovering on the task and project button themselves
addButtons.forEach(button => button.addEventListener("mouseover", () => {
    addProjectButton.classList.add("showAddProject");
    addTaskButton.classList.add("showAddTask");
}))

// Hide AddTask and AddProject on mouseout
addButtons.forEach(button => button.addEventListener("mouseout", () => {
    addProjectButton.classList.remove("showAddProject");
    addTaskButton.classList.remove("showAddTask");
}))

taskHeaders.forEach(taskHeader => taskHeader.addEventListener("click", (event) => {
    const clickedTask = event.currentTarget.closest('.task')
    clickedTask.classList.toggle("collapsed")
}))

// if (localStorage.length !== 0) addTemplates(templateProjects);
// else populateMainDiv()

addProjectButton.addEventListener("click", () => {
    const dialog = createProjectDialog();
    document.body.appendChild(dialog);
    dialog.showModal();
})

// Check if "firstTime" is already set in localStorage
if (!localStorage.getItem("firstTime")) {
    // If "firstTime" is not set, initialize it and perform any other initial setup
    localStorage.setItem("firstTime", true);

    // You can also add any additional code here that should run only once
    console.log("First time setup complete.");
} else {
    // Optional: you can add code here for what should happen on subsequent loads
    console.log("First time setup already done.");
}

addTemplates();
populateMainDiv()