let searchedTasks = [];

/**
 * del the task and reload the board
 * close the card in big
 * @param {number} i - the index of the element when it is generated
 */
function del(i) {
    tasks.splice(i, 1);
    loadTasks();
    closeCard();
}

/**
 * opens the task in big
 * and fill the empty card with the right content
 * @param {number} id - the id of the task
 * @param {number} i - the index of the task
 */
function openCard(id, i) {
    let task = returnSelectedTask(id);
    if (task) {
        let bottomRightPopUp = document.getElementById('bottomRightPopUp');
        bottomRightPopUp.innerHTML = openCardHTML(task, i);
        changeCategoryColor(task, 'categoryBig');
        let subtaskCardContainer = document.getElementById('subtaskCardContainer');
        task.subtasks.forEach((subtask) => (subtaskCardContainer.innerHTML += subtaskCardContainerHTML(subtask)));
    }
}

/**
 * 
 * @param {string} subtask - the single subtask
 * @returns {HTMLElement} - the div element with the given subtask
 */
function subtaskCardContainerHTML(subtask) {
    return /* html */ `<div class="subtaskItem">${subtask}<div>`;
}

/** close the card in big */
function closeCard() {
    let bottomRightPopUp = document.getElementById('bottomRightPopUp');
    bottomRightPopUp.innerHTML = '';
}

/**
 * fill the board and sort by categories
 * changes the category color
 * @param {JSON} task - the single task
 * @param {number} i - the index of the task
 */
function loadBoard(task, i) {
    if (task.process === 'todo') todo.innerHTML += boardHTML(task, i);
    else if (task.process === 'inProgress') inProgress.innerHTML += boardHTML(task, i);
    else if (task.process === 'awaitingFeedback') awaitingFeedback.innerHTML += boardHTML(task, i);
    else if (task['process'] === 'done') done.innerHTML += boardHTML(task, i);
    changeCategoryColor(task, 'category');
}

/**
 * changes the category color
 * @param {JSON} task - the single task
 * @param {string} id - the id of the category element (category / categoryBig)
 */
function changeCategoryColor(task, id) {
    let category = document.getElementById(`${id}${task.id}`);
    category.style = `background: ${task.categoryColor};`;
}

/**
 * 
 * @param {JSON} task - the single task
 * @param {number} i - the index of the task
 * @returns {HTMLElement} - the div with the given content
 */
function boardHTML(task, i) {
    return `<div class="card" draggable="true" ondragstart="startDragging(${task.id})" onclick="openCard(${task.id}, ${i})">
            <span id="category${task.id}" class="cardCategory">${task.category}</span>
            <h3>${task.titel}</h3>
            <p>${task.description}</p>
            <div class="AssignedTo">
                ${task.img}
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <img id="urgencyIcon${i}" class="urgencyIcon" src="${task.urgencyImg}">
            </div>
        </div>`;
}

/**
 * clear the board
 * Show the searched tasks
 */
function filterTasks() {
    clearBoard();
    searchedTasks = [];
    let search = document.getElementById('search');
    search = search.value.toLowerCase(); // that upper and lower case does not matter

    if (search.length > 0) tasks.forEach((task) => task.titel.toLowerCase().includes(search) && searchedTasks.push(task));
    else loadTasks();

    searchedTasks.length > 0 && searchedTasks.forEach((task, index) => loadBoard(task, index));
}

/**
 * 
 * @param {JSON} task - the singe task
 * @param {number} i - the index of the task
 * @returns {HTMLElement} - the div for the big view
 */
function openCardHTML(task, i) {
    return `
    <div class="cardBigContainer" onclick="closeCard()">
    <div class="cardBig" onclick="doNotClose(event)">
    <img onclick="closeCard()" class="closeImgCardBig" id="closeImgCardBig" src="assets/img/X.png" alt="X">
            <div class="card">
                <span class="cardCategory" id="categoryBig${task.id}">${task.category}</span>
                <h3>${task.titel}</h3>
                <p class="cardBigP">${task.description}</p>
                <h4>Subtasks:</h4><div class="subtaskCardContainer" id="subtaskCardContainer"></div>
                <p class="cardBigP"><b>Due date:</b>${task.date}</p>
                <p class="cardBigP"><b>Priority:</b>${task.urgency} <img id="urgencyIcon" class="urgencyIcon" src="${task.urgencyImg}"></p>
                <div class="flex" style="align-items: center;"><p  class="flex assignedToP" style="margin: 0;"><b>Assigned to: </b>${task.AssignedTo}${task.img}</p></div>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <button onclick="editTask(${task.id}, ${i})" class="editImg button"><img src="assets/img/editTaskIcon.png" alt=""></button>
                <button onclick="nextProcess(${task.id})" class="editImg button arrowUp"><img id="arrowDown" src="assets/img/arrowDown.svg" alt=""></button>
                <button onclick="lastProcess(${task.id})" class="editImg button arrowDown"><img id="arrowUp" src="assets/img/arrowUp.svg" alt=""></button>
            </div>
        </div>
    </div>`;
}

/**
 * gives the next higher process
 * @param {number} id - the id of the task
 */
async function nextProcess(id) {
    let error = false;
    let task = returnSelectedTask(id);
    if (task.process == 'todo') task.process = 'inProgress';
    else if (task.process == 'inProgress') task.process = 'awaitingFeedback';
    else if (task.process == 'awaitingFeedback') task.process = 'done';
    else processError(task), (error = true);
    loadTasks();
    !error && banner(`Task moved to ${task.process}`, 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}

/**
 * gives the next lower process
 * @param {number} id - the id of the task
 */
async function lastProcess(id) {
    let error = false;
    let task = returnSelectedTask(id);
    if (task.process == 'inProgress') task.process = 'todo';
    else if (task.process == 'awaitingFeedback') task.process = 'inProgress';
    else if (task.process == 'done') task.process = 'awaitingFeedback';
    else processError(task), (error = true);
    loadTasks();
    !error && banner(`Task moved to ${task.process}`, 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}

/**
 * Shows the error banner
 * @param {JSON} task - the single task
 */
function processError(task) {
    banner(`Task is already in ${task.process}`, 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}