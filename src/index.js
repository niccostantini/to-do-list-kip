import "./styles/normalize.css";
import "./styles/styles.css";
import "./styles/fonts.scss";
import "./assets/images/corkbg_2.png";

import {templateProjects, addTemplates} from "./data.js"
import { populateMainDiv } from "./projects.js";


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

addTemplates(templateProjects)

populateMainDiv