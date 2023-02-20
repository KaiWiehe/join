tasks = [];
users = [];
activeUser = [];
contacts = [];
categorys = [];

let today = new Date();
let monthL = new Date().toLocaleString('de-de', { month: 'long' });

async function init() {
    await downloadBackend();
    await includeHTML();
    changeImg();
    loadTasks();
    loadContacts();
    sayHello();
}

async function initLogin() {
    await downloadBackend();
    await includeHTML();
    loadMSG();
}

/** Inserts the data from the JSON into the summary, into the board*/
function loadTasks() {
    clearAllDivs();
    loadSummary();
    tasks.forEach((task, index) => loadBoard(task, index));
    backend.setItem('tasks', JSON.stringify(tasks));
}

/** Changes the two images depending on the logged in profile */
function changeImg() {
    let userImgHeader = document.getElementById('userImgHeader');
    let userImg = document.getElementById('userImg');

    if (activeUser.img != 'noImg') {
        userImgHeader.innerHTML = `<img class="userImgHeader" src="${activeUser.img}" alt="Profile Img">`;
        userImg.innerHTML = `<img src="${activeUser.img}" alt="user img">`;
    } else {
        userImgHeader.innerHTML = `<div class="noImg" id="noImg">${firstLetter(activeUser.name)}</div>`;
        userImg.innerHTML = `<div class="noImg" id="noImg" style="width: 5rem; height: 5rem;">${firstLetter(activeUser.name)}</div>`;
    }
}

function doNotClose(event) {
    event.stopPropagation();
}

function banner(string, style, containerID, timeout) {
    let container = document.getElementById(containerID);
    container.innerHTML = string;
    container.style = style;
    container.classList.remove('hide');
    setTimeout(() => container.classList.add('hide'), timeout);
}

/**
 * @param {Array} arr
 * @returns Array without dublicates
 */
function arrClean(arr, errorText, containerID) {
    const data = arr;
    const set = new Set(data.map((item) => JSON.stringify(item)));
    const dedup = [...set].map((item) => JSON.parse(item));
    if (data.length - dedup.length > 0) {
        //if contact already exists
        banner(errorText, 'background: rgba(255, 0, 0, 0.538);', containerID, 1250);
        alreadyExists = true;
    }
    return dedup;
}

/**
 * @param {string} string - any string
 * @returns string capitalized
 * @example
 * // The function returns "Name".
 * console.log(capitalizeFirstLetter(name))
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param {string} string - any string
 * @returns string only first letter capitalized
 * @example
 * // The function returns "N".
 * console.log(capitalizeFirstLetter(name))
 */
function firstLetter(string) {
    return string.charAt(0).toUpperCase();
}

// function definesAllSummaryIds() {
//     let tasksInBoard = document.getElementById('tasksInBoard');
//     let tasksInProgress = document.getElementById('tasksInProgress');
//     let awaitingFeedbackSummary = document.getElementById('awaitingFeedbackSummary');
//     let todoSummary = document.getElementById('todoSummary');
//     let doneSummary = document.getElementById('doneSummary');
//     let goodMorningName = document.getElementById('goodMorningName');
//     let summaryDate = document.getElementById('summaryDate');
//     let summaryDay = document.getElementById('summaryDay');
// }

// function definesAllBoardIds() {
//     let todo = document.getElementById('todo');
//     let inProgress = document.getElementById('inProgress');
//     let awaitingFeedback = document.getElementById('awaitingFeedback');
//     let done = document.getElementById('done');
// }

function clearAllDivs() {
    let tasksInBoard = document.getElementById('tasksInBoard');
    let tasksInProgress = document.getElementById('tasksInProgress');
    let awaitingFeedbackSummary = document.getElementById('awaitingFeedbackSummary');
    let todoSummary = document.getElementById('todoSummary');
    let doneSummary = document.getElementById('doneSummary');

    tasksInBoard.innerHTML = ``;
    tasksInProgress.innerHTML = ``;
    awaitingFeedbackSummary.innerHTML = ``;
    todoSummary.innerHTML = ``;
    doneSummary.innerHTML = ``;

    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');

    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;
}

/** empties all containers (todo, inProgress, awaitingFeedback, done) */
function clearBoard() {
    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;
}

/**
 * @param {number} i - the id of the task
 * @returns {JSON} - the selected task
 */
function returnSelectedTask(i) {
    let id = [i];
    let task = tasks.filter((itm) => {
        return id.indexOf(Number(itm.id)) > -1;
    });
    task = task[0];
    return task;
}

/** opens the say hello banner */
function sayHello() {
    let container = document.getElementById('categoryAlreadyExistsContainer');
    container.innerHTML += `Good Morning ${activeUser.name}. It's ${monthL} ${today.getDate()}, ${today.getFullYear()}. Have a nice Day.`;
    container.style = 'background: var(--leftGrey); padding: 4rem 1rem 1rem 1rem; width: 80%;';
    container.classList.remove('hide');
    setTimeout(() => container.classList.add('hide'), 10000);
}

/** close the say hello banner */
function closeSayHello() {
    let container = document.getElementById('categoryAlreadyExistsContainer');
    container.classList.add('hide');
}

/**
 * switch the category 
 * @param {number} number - the number of the respective menu item
 */
function switchCategorys(number) {
    new SwitchCategorys(number);
}

/**
 * @returns {HTMLElement} - the add task HTML snippet
 */
function addTaskHTML() {
    return /* html */ `
<h1 id="addTaskh1">Add Task</h1>
<form class="addTaskForm" onsubmit="createTask(); return false;">
    <div class="addTaskLeft">
        <div class=" formCullum">
            <h2>Title</h2>
            <input required id="titelInputField" class="inputField" type="text" placeholder="Enter a Titel">
        </div>
        <div class=" formCullum">
            <h2>Description</h2>
            <textarea minlength="4" required id="descriptionInputField" class="descriptionArea" placeholder="Enter a &#13;Description..."></textarea>
        </div>
        <div class=" formCullum categorySelect">
            <h2>Category</h2>
            <select required id="categorySelect" class="inputField">
                <option value="" disabled selected hidden>Select task category</option>
                <option value="Managment">Managment</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Backoffice">Backoffice</option>
                <option value="Marketing">Marketing</option>
                <option value="Media">Media</option>
            </select>
            <img class=" addCategoryButton" onclick="openAddCategory()" src="assets/img/plusBlack.png">
        </div>
        <div class="collum formCullum assignedTo">
            <h2>ASSIGNED TO</h2>
            <select required id="assignedToSelect" class="inputField">
            </select>
        </div>
    </div>
    <div class="addTaskRight">
        <div class="collum formCullum">
            <h2>Date</h2>
            <input required id="dateInputField" class="inputField" placeholder="Day/Month/Year" class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')">
        </div>
        <div class=" formCullum">
            <h2>Urgency</h2>
            <div class="urgencyContainer flex">
                <div onclick="clickUrgencyButton(0)" id="urgencyButtonHigh" class="whiteButton">High <img id="urgencyImgHigh" src="assets/img/prioHigh.png"></div>
                <div onclick="clickUrgencyButton(1)" id="urgencyButtonMiddle" class="whiteButton">Middle <img id="urgencyImgMiddle" src="assets/img/prioMiddle.png"></div>
                <div onclick="clickUrgencyButton(2)" id="urgencyButtonLow" class="whiteButton">Low <img id="urgencyImgLow" src="assets/img/prioLow.png"></div>
            </div>
        </div>
        <div class=" formCullum subtasks">
            <h2>Subtasks</h2>
            <input id="subtaskInputField" class="inputField" type="text" placeholder="Enter a Subtask">
            <img class="subtaskButton" onclick="addSubtask()" src="assets/img/plusBlack.png">
            <div class="subtasksContainer" id="subtasksContainer"></div>
        </div>
        <div class="addTaskButtonContainer" id="addTaskButtonContainer">
            <button type="button" onclick="hideAddTask()" class="whiteButton">Cancel</button>
            <button type="submit" class="button">Create Task</button>
        </div>
    </div>
</form>`;
}

/**
 * clear this elements
 * @param {HTMLElement} el
 */
function clearValue(el) {
    el.value = '';
}

/**
 * 
 * @param {string} string1 
 * @param {string} string2 
 * @returns {boolean} - true = same | false = different 
 */
function sameString(string1, string2) {
    return string1 === string2;
}