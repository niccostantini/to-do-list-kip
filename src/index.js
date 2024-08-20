import "./styles/normalize.css";
import "./styles/styles.css";
import "./styles/fonts.scss";
import "./assets/images/corkbg_2.png";


const addButton = document.querySelector('#addButton');
const addProjectButton = document.querySelector('.addProjectButton');
const addTaskButton = document.querySelector('.addTaskButton');
const addButtons = document.querySelectorAll("#addButton, .addProjectButton, .addTaskButton")

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

