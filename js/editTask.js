function changeAddTaskToEditTask(task, number, id) {
    definesAllInputs();
    subtasks = task.subtasks;
    changeContent(task, number, id);
}

function definesAllInputs() {
    let addTaskh1 = document.getElementById('addTaskh1');
    let addTaskButtonContainer = document.getElementById('addTaskButtonContainer');
    let hideAddTaskButton = document.getElementById('hideAddTaskButton');
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
}

/** change the content to edit task and change the button onClick function */
function changeContent(task, number, id) {
    addTaskh1.innerHTML = 'Edit Task';
    addTaskButtonContainer.innerHTML = editTaskButtonsHTML(id, number);
    hideAddTaskButton.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    boardAddTaskcontainer.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    loadCategorys();
    loadInputValue(task, number, id);
    highlightUrgencyButton(task);
}

function editTaskButtonsHTML(id, number) {
    return /* html */ `
    <button type="button" class="whiteButton" onclick="hideEditTask(${id}, ${number})">Cancel</button>
    <button type="button" onclick="saveChangesTask(${id}, ${number})" class="button">Save</button>`;
}

/** gives the appropriate value for the selected task  */
function loadInputValue(task, number, id) {
    titelInputField.value = `${task.titel}`;
    dateInputField.value = `${task.date}`;
    categorySelect.value = `${task.category}`;
    descriptionInputField.value = `${task.description}`;
    assignedToSelect.value = `${task.AssignedTo}`;
    loadSubTasks();
}

function highlightUrgencyButton(task) {
    if (task.urgency === 'High') clickUrgencyButton(0);
    else if (task.urgency === 'Middle') clickUrgencyButton(1);
    else if (task.urgency === 'Low') clickUrgencyButton(2);
}

/** save the edited task */
function setEditedTask(task) {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    updateTask(task, titelInputField, dateInputField, categorySelect, descriptionInputField, assignedToSelect);
}

function updateTask(task, titelInputField, dateInputField, categorySelect, descriptionInputField, assignedToSelect) {
    task.titel = titelInputField.value;
    task.date = dateInputField.value;
    task.category = categorySelect.value;
    task.urgency = urgency;
    task.description = descriptionInputField.value;
    task.AssignedTo = assignedToSelect.value;
    task.urgencyImg = setUrgencyImg();
    task.categoryColor = setCategoryColor();
    task.img = setImgFromAssignedToSelect(true, assignedToSelect.value);
}