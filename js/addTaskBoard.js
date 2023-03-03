/** when you click the add task button in the board, it will open in a window */
function showAddTask() {
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.classList.remove('hide');

    let boardAddTask = document.getElementById('boardAddTask');
    boardAddTask.innerHTML = addTaskHTML();
    updateAssignedTo();
    loadCategorys();
    new AddTaskKeyboardControl();
}

/** hide the add task window in the board  */
function hideAddTask() {
    clearAddTaskInputs();
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.classList.add('hide');
    let boardAddTask = document.getElementById('boardAddTask');
    boardAddTask.innerHTML = '';
}

/** del all values and remove the highlight of the urgency buttons */
function clearAddTaskInputs() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    titelInputField.value = '';
    dateInputField.value = '';
    categorySelect.value = '';
    descriptionInputField.value = '';
    assignedToSelect.value = '';
    removeUrgencyClasses();
}