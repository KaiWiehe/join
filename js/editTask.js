/**
 * Shows the edit task card
 * @param {number} id - the id of the task  
 * @param {number} number - the index of the task
 */
function editTask(id, number) {
    subtasks = [];
    let task = returnSelectedTask(id);
    closeCard();
    showAddTask();
    changeAddTaskToEditTask(task, number, id);
}

/**
 * If you click on the button the new task will save.
 * Close the card, update the board etc., shows the task in big and shows the banner.
 * @param {number} id - the id of the task
 * @param {number} number - the index of the task
 */
async function saveChangesTask(id, number) {
    let task = returnSelectedTask(id);
    setEditedTask(task);
    hideAddTask();
    loadTasks();
    openCard(id, number);
    banner('Task succesfully edited', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}

/** 
 * Function for the cancel button, to close "Edit Task" and open the task in big 
 * @param {number} id - the id of the task
 * @param {number} number - the index of the task
 */
function hideEditTask(id, number) {
    hideAddTask();
    openCard(id, number);
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.setAttribute('onclick', `hideAddTask()`);
}

/**
 * fill subtasks and change content to edit task
 * @param {JSON} task - the single task     
 * @param {number} number - the index of the task
 * @param {number} id - the id of the task
 */
function changeAddTaskToEditTask(task, number, id) {
    subtasks = task.subtasks;
    changeContent(task, number, id);
}

/**
 * change the content to edit task and change the button onClick function
 * reload categories
 * load input values
 * highlight urgency button
 * @param {JSON} task - the single task     
 * @param {number} number - the index of the task
 * @param {number} id - the id of the task
 */
function changeContent(task, number, id) {
    let addTaskh1 = document.getElementById('addTaskh1');
    let addTaskButtonContainer = document.getElementById('addTaskButtonContainer');
    let hideAddTaskButton = document.getElementById('hideAddTaskButton');
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    addTaskh1.innerHTML = 'Edit Task';
    addTaskButtonContainer.innerHTML = editTaskButtonsHTML(id, number);
    hideAddTaskButton.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    boardAddTaskcontainer.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    loadCategorys();
    loadInputValue(task, number, id);
    highlightUrgencyButton(task);
}

/**
 * 
 * @param {number} id - the id of the task
 * @param {number} number - the index of the task
 * @returns {HTMLElement} - buttons cancel and save
 */
function editTaskButtonsHTML(id, number) {
    return /* html */ `
    <button type="button" class="whiteButton" onclick="hideEditTask(${id}, ${number})">Cancel</button>
    <button type="button" onclick="saveChangesTask(${id}, ${number})" class="button">Save</button>`;
}

/**
 * gives the appropriate value for the selected task
 * load subtask
 * @param {JSON} task - the single task
 */
function loadInputValue(task) {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    titelInputField.value = `${task.titel}`;
    dateInputField.value = `${task.date}`;
    categorySelect.value = `${task.category}`;
    descriptionInputField.value = `${task.description}`;
    assignedToSelect.value = `${task.AssignedTo}`;
    loadSubTasks();
}

/**
 * highlight the right urgency button
 * @param {JSON} task - the single task
 */
function highlightUrgencyButton(task) {
    if (task.urgency === 'High') clickUrgencyButton(0);
    else if (task.urgency === 'Middle') clickUrgencyButton(1);
    else if (task.urgency === 'Low') clickUrgencyButton(2);
}

/**
 * save the edited task
 * @param {JSON} task - the single task
 */
function setEditedTask(task) {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    updateTask(task, titelInputField, dateInputField, categorySelect, descriptionInputField, assignedToSelect);
}

/**
 * saves the changes
 * @param {JSON} task - the sinle task
 * @param {HTMLElement} titelInputField 
 * @param {HTMLElement} dateInputField 
 * @param {HTMLElement} categorySelect 
 * @param {HTMLElement} descriptionInputField 
 * @param {HTMLElement} assignedToSelect 
 */
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