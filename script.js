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

// setzt die url zum backend und lädt die infos in die Variablen
async function downloadBackend() {
    setURL('https://kai-wiehe.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    activeUser = JSON.parse(backend.getItem('activeUser')) || [];
    taskIdCounter = JSON.parse(backend.getItem('taskIdCounter')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    console.log('users', users)
    console.log('tasks', tasks)
    console.log('activeUser', activeUser)
    console.log('contacts', contacts)
    console.log('categorys', categorys)
}


/** Fügt die Daten aus dem JSON in das Summary, in das Board*/
function loadTasks() {
    definesAllSummaryIds();
    definesAllBoardIds();
    clearAllDivs();
    loadSummary();
    tasks.forEach((task, index) => {
        loadBoard(task, index);
    });
    backend.setItem('tasks', JSON.stringify(tasks));
}

/** Ändert die beiden Bilder je nach angemeldetem Profile */
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

function editUser() {
    let user = returnActiveUser();
    openAddContactOrEdit();
    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    addContactTitel.innerHTML = 'Edit User';
    addContactSlogan.classList.add('hide');
    addContactImg.style = "display: flex;";
    addContactMail.style = "display: flex;";
    addContactTel.style = "display: flex;";
    if (user.img === 'noImg') {
        addContactImg.innerHTML = firstLetter(user.name);
    } else {
        addContactImg.innerHTML = `<img src="${user.img}">`;
    }
    addContactButtons.innerHTML = /* html */ `
        <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
        <button type="button" class="button" onclick="saveChangesUser()">Save</button>`;

    addContactName.value = `${user.name}`;
    addContactMail.value = `${user.mail}`;
    addContactTel.value = `${user.password}`;
    addContactTel.placeholder = "Password";
}

async function saveChangesUser() {
    let user = returnActiveUser();

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    user.name = addContactName.value;
    user.mail = addContactMail.value;
    user.password = addContactTel.value;

    closeAddContact();
    banner('User succesfully edited', "background: var(--leftGrey);", 'categoryAlreadyExistsContainer', 1250);
    await backend.setItem('users', JSON.stringify(users));
}

function returnActiveUser() {
    let userNew = [];
    users.forEach(user => {
        if (user.name.includes(activeUser.name)) {
            userNew.push(user);
        }
    });
    userNew = userNew[0];
    return userNew;
}

function banner(string, style, containerID, timeout) {
    let container = document.getElementById(containerID);
    container.innerHTML = string;
    container.style = style;
    container.classList.remove('hide');
    setTimeout(() => {
        container.classList.add('hide');
    }, timeout);
}

/**
 * @param {Array} arr 
 * @returns Array without dublicates
 */
function arrClean(arr, errorText, containerID) {
    const data = arr;
    const set = new Set(data.map(item => JSON.stringify(item)));
    const dedup = [...set].map(item => JSON.parse(item));
    console.log(`Removed ${data.length - dedup.length} elements`);
    if (data.length - dedup.length > 0) {
        //if contact already exists
        banner(errorText, "background: rgba(255, 0, 0, 0.538);", containerID, 1250);
        alreadyExists = true;
    }
    console.log(dedup);
    return dedup;
}


/**
 * @param string 
 * @returns string Großgeschrieben
 * @example
 * // Die Funktion gibt uns "Name" zurück
 * console.log(capitalizeFirstLetter(name))
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param string 
 * @returns string only first letter Big
 * @example
 * // Die Funktion gibt uns "N" zurück
 * console.log(capitalizeFirstLetter(name))
 */
function firstLetter(string) {
    return string.charAt(0).toUpperCase();
}

/** Definiert alle ID's in der Summary Karte */
function definesAllSummaryIds() {
    let tasksInBoard = document.getElementById('tasksInBoard');
    let tasksInProgress = document.getElementById('tasksInProgress');
    let awaitingFeedbackSummary = document.getElementById('awaitingFeedbackSummary');
    let todoSummary = document.getElementById('todoSummary');
    let doneSummary = document.getElementById('doneSummary');
    let goodMorningName = document.getElementById('goodMorningName');
    let summaryDate = document.getElementById('summaryDate');
    let summaryDay = document.getElementById('summaryDay');
}

/** Definiert alle ID's in der Board Karte */
function definesAllBoardIds() {
    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
}

/** Löscht alle Divs */
function clearAllDivs() {
    tasksInBoard.innerHTML = ``;
    tasksInProgress.innerHTML = ``;
    awaitingFeedbackSummary.innerHTML = ``;
    todoSummary.innerHTML = ``;
    doneSummary.innerHTML = ``;

    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;
}

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

function returnSelectedTask(i) {
    let id = [i];
    let task = tasks.filter((itm) => {
        return id.indexOf(Number(itm.id)) > -1;
    })
    task = task[0];
    return task;
}

function sayHello() {
    banner(`Good Morning ${activeUser.name}. It's ${monthL} ${today.getDate()}, ${today.getFullYear()}. Have a nice Day.`, "background: var(--leftGrey);", 'categoryAlreadyExistsContainer', 3000)
}