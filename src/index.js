import "./styles/normalize.css";
import "./styles/styles.css";


const addButton = document.querySelector('#addButton');
const addProjectButton = document.querySelector('.addProjectButton');
const addTaskButton = document.querySelector('.addTaskButton');
const addButtons = document.querySelectorAll("#addButton, .addProjectButton, .addTaskButton")

addButtons.forEach(button => button.addEventListener("mouseover", () => {

    addProjectButton.classList.add("showAddProject");
    addTaskButton.classList.add("showAddTask");

}))

addButtons.forEach(button => button.addEventListener("mouseout", () => {
    addProjectButton.classList.remove("showAddProject");
    addTaskButton.classList.remove("showAddTask");
}))

