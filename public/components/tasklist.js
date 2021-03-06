const { event } = require("jquery");

const form = document.getElementById("taskform");
const button = document.getElementById("add-task-button")
var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var firstQuadrantList = document.getElementById ("firstQuadrantList")
var secondQuadrantList = document.getElementById ("secondQuadrantList")
var thirdQuadrantList = document.getElementById ("thirdQuadrantList")
var fourthQuadrantList = document.getElementById ("fourthQuadrantList")
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
  // Reference: https://codepen.io/franklynroth/pen/ZYeaBd
  // I used this reference to successfully create a task attached with a checkbox, label and list element.

  let item = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  checkBox.type = "checkbox";
  checkBox.classList.add('custom-checkbox');

  item.appendChild(checkBox);
  item.appendChild(label);
  item.setAttribute('data-id', task.id);
  label.innerText = task.taskDescription;

  tasklist.appendChild(item);

  // Extra Task DOM elements

  let delButton = document.createElement("button");
  delButton.classList.add('delete');
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  // Event Listeners for Delete button
  delButton.addEventListener("click", function(event) {
    event.preventDefault();
    let id = event.target.parentElement.getAttribute('data-id');
    let index = taskListArray.findIndex(task => task.id === Number(id));
    removeItemFromArray(taskListArray, index)
    updateEmpty();
    item.remove();
    item.classList.add('todo-list-item-fall');
  })

  console.log(task.coveyQuadrant);

  // Making a switch case: When the user clicks either 1, 2, 3 or 4th option of covey quadrant, 
  // the task is automatically added to that quadrant, so the user can get that task done.
  // When the user checks it to be done, then deletes the task, the task from the quadrant will
  // automatically dissapear.
  // There would be a simpler way of doing this, which is an iteration I need to make in this design in the future.

  switch(task.coveyQuadrant) {
    case '1':
      console.log("important and urgent")
      let firstQitem = document.createElement("li");
      var label = document.createElement("label");
      firstQitem.appendChild(label);
      firstQitem.setAttribute('data-id', task.id);
      label.innerText = task.taskDescription;
      firstQuadrantList.appendChild(firstQitem);

      delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        updateEmpty();
        item.remove();
        firstQitem.remove();
      })
      break;
    case '2':
      console.log("important, not urgent")
      let secondQitem = document.createElement("li");
      var label = document.createElement("label");
      secondQitem.appendChild(label);
      secondQitem.setAttribute('data-id', task.id);
      label.innerText = task.taskDescription;
      secondQuadrantList.appendChild(secondQitem);

      delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        updateEmpty();
        item.remove();
        secondQitem.remove();
      })
      break;
    case '3':
      console.log("not important, urgent")
      let thirdQitem = document.createElement("li");
      var label = document.createElement("label");
      thirdQitem.appendChild(label);
      thirdQitem.setAttribute('data-id', task.id);
      label.innerText = task.taskDescription;
      thirdQuadrantList.appendChild(thirdQitem);

      delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        updateEmpty();
        item.remove();
        thirdQitem.remove();
      })
      break;
    case '4':
      console.log("not important, not urgent")
      let fourthQitem = document.createElement("li");
      var label = document.createElement("label");
      fourthQitem.appendChild(label);
      fourthQitem.setAttribute('data-id', task.id);
      label.innerText = task.taskDescription;
      fourthQuadrantList.appendChild(fourthQitem);

      delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        updateEmpty();
        item.remove();
        fourthQitem.remove();
      })
      break;
    default:
  }

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
