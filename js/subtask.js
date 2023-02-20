/** if you click the button, the subtask will added */
function addSubtask() {
    subtaskInputField = document.getElementById('subtaskInputField');
    (subtaskInputField.value.length > 0) && subtasks.push(subtaskInputField.value);
    loadSubTasks();
    subtaskInputField.value = '';
}

/** Shows all subtasks in the container */
function loadSubTasks() {
    subtasksContainer = document.getElementById('subtasksContainer');
    subtasksContainer.innerHTML = '';
    subtasks.forEach((subtask, index) => (subtasksContainer.innerHTML += subtasksContainerHTML(subtask, index)));
}

/**
 * @param {JSON} subtask - the single subtask
 * @param {number} index - the index of the subtask
 * @returns 
 */
function subtasksContainerHTML(subtask, index) {
    return /* html */ `<div class="subtask">${subtask} <img onclick="delSubtask(${index})" src="assets/img/trash.svg"> <div>`;
}

/**
 * del the subtask on the given position
 * @param {number} index - the index of the subtask
 */
function delSubtask(index) {
    subtasks.splice(index, 1);
    loadSubTasks();
}