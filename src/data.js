import {ToDo, Task, Project, createProject, populateMainDiv} from "./projects.js"

const templateProjects =
[
    {
      "id": "xl67mc",
      "title": "Website Redesign",
      "description": "Redesign the company website",
      "tasks": [
        {
          "id": "fr743f",
          "title": "Create wireframes",
          "dueDate": "2024-09-10",
          "priority": "High",
          "description": "Wireframes for the new design",
          "checkList": [
            {
              "id": "jdbi3v",
              "status": false,
              "label": "Sketch homepage"
            },
            {
              "id": "hf2ovn",
              "status": false,
              "label": "Sketch contact page"
            }
          ]
        },
        {
          "id": "n8fvgh",
          "title": "Develop frontend",
          "dueDate": "2024-10-01",
          "priority": "Medium",
          "description": "Develop the frontend using React",
          "checkList": [
            {
              "id": "kpi9km",
              "status": false,
              "label": "HTML/CSS"
            },
            {
              "id": "wd432f",
              "status": false,
              "label": "JavaScript"
            }
          ]
        }
      ]
    },
    {
      "id": "4slxvh",
      "title": "Mobile App",
      "description": "Develop a mobile app for iOS and Android",
      "tasks": [
        {
          "id": "66ytos",
          "title": "Design UI",
          "dueDate": "2024-11-01",
          "priority": "High",
          "description": "Design the user interface",
          "checkList": [
            {
              "id": "hgg65b",
              "status": false,
              "label": "Main Screen"
            },
            {
              "id": "tttr54",
              "status": false,
              "label": "Settings Screen"
            }
          ]
        },
        {
          "id": "so7qcf",
          "title": "Implement API",
          "dueDate": "2024-12-01",
          "priority": "Low",
          "description": "Integrate with the backend API",
          "checkList": [
            {
              "id": "cxdaf4",
              "status": false,
              "label": "Login endpoint"
            },
            {
              "id": "mnlog7",
              "status": false,
              "label": "User endpoint"
            }
          ]
        }
      ]
    }
  ];
  

function addTemplates(templates) {
    if (localStorage.length === 0){
    templates.forEach(template => localStorage.setItem(template.id, JSON.stringify(template)))
    }
}

function deleteProject(e) {
    let projectId = e.target.closest(".project").id;
    localStorage.removeItem(projectId);
    populateMainDiv()
}

function deleteTask(taskId, projectId) {
    let projects = JSON.parse(localStorage.getItem(projectId));

    if (projects) {
        const taskIndex = projects.tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
            projects.tasks.splice(taskIndex, 1); // Remove the task from the array
            localStorage.setItem(projectId, JSON.stringify(projects)); // Save the updated project back to localStorage
            populateMainDiv()
        }
    }
}

function changeBoxStatus(checkboxId, taskId, projectId) {
    // Retrieve the project from localStorage using projectId
    let project = JSON.parse(localStorage.getItem(projectId));

    if (project) {
        // Find the task within the selected project using taskId
        const task = project.tasks.find(task => task.id === taskId);
        if (task) {
            // Find the checkbox within the selected task using checkboxId
            const checkbox = task.checkList.find(checkbox => checkbox.id === checkboxId);
            if (checkbox) {
                // Toggle the checkbox "status" element
                checkbox.status = !checkbox.status;

                // Save the updated project back to localStorage
                localStorage.setItem(projectId, JSON.stringify(project));
            }
        }
    }

    // Re-populate the main div to reflect changes
    populateMainDiv();
}




export {addTemplates, deleteTask, deleteProject, changeBoxStatus, templateProjects}