/** if you click the button, the subtask will added */
function addSubtask() {
    subtaskInputField = document.getElementById('subtaskInputField');
    subtasks.push(subtaskInputField.value);
    loadSubTasks();
    subtaskInputField.value = '';
}

/** Shows all subtasks in the container */
function loadSubTasks() {
    subtasksContainer = document.getElementById('subtasksContainer');
    subtasksContainer.innerHTML = '';
    subtasks.forEach((subtask, index) => (subtasksContainer.innerHTML += subtasksContainerHTML(subtask, index)));
}

function subtasksContainerHTML(subtask, index) {
    return /* html */ `<div class="subtask">${subtask} <img onclick="delSubtask(${index})" src="assets/img/trash.svg"> <div>`;
}

function delSubtask(index) {
    subtasks.splice(index, 1);
    loadSubTasks();
}