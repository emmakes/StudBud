const form = document.getElementById("taskform");
const button = document.getElementById("add-task-button")
var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var quadrantInput = document.getElementById("quadrantInput");

button.addEventListener("click", function(event) {
  event.preventDefault();
  let taskDescription = taskInput.value;
  let dueDate = dueDateInput.value;
  let completionTime = completionTimeInput.value;
  let coveyQuadrant = quadrantInput.options[quadrantInput.selectedIndex].value;

  addTask(taskDescription, dueDate, completionTime, coveyQuadrant);
  console.log(taskListArray);
})

var taskListArray = [];
function addTask(taskDescription, dueDate, completionTime, coveyQuadrant) {
  let task = {
    id: Date.now(),
    taskDescription,
    dueDate,
    completionTime,
    coveyQuadrant
  };
  taskListArray.push(task);
  console.log(taskListArray);
  renderTask(task);
}

function renderTask(task){

  updateEmpty();

  // Create HTML elements
  let item = document.createElement("li");
  item.setAttribute('data-id', task.id);
  item.innerHTML = "<p>" + task.taskDescription + "</p>";

  tasklist.appendChild(item);

  // Extra Task DOM elements

  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  // Event Listeners for DOM elements
  delButton.addEventListener("click", function(event) {
    event.preventDefault();
    let id = event.target.parentElement.getAttribute('data-id');
    let index = taskListArray.findIndex(task => task.id === Number(id));
    removeItemFromArray(taskListArray, index)
    updateEmpty();
    item.remove();
  })

  // Clear the input form
  form.reset();
}

function removeItemFromArray(arr, index) {
  if(index > -1) {
    arr.splice(index, 1)
  }
  return arr;
}

function updateEmpty() {
  if(taskListArray.length > 0) {
    document.getElementById("emptyList").style.display = 'none';
  } else {
    document.getElementById("emptyList").style.display = 'block';
  }
}