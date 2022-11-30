tasks = [];
users = [];
activeUser = [];
contacts = [];
categorys = [];

async function init() {
    await downloadBackend();
    await includeHTML();
    changeImg();
    loadTasks();
    loadContacts();
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

    /* #########################   Summary   ######################### */

    let todoSummaryCounter = 0;
    let tasksInProgressCounter = 0;
    let awaitingFeedbackCounter = 0;
    let doneSummaryCounter = 0;

    tasksInBoard.innerHTML = `${tasks.length}`;

    for (let a = 0; a < tasks.length; a++) {
        const task = tasks[a];

        if (task["process"] === "todo") {
            todoSummaryCounter++
        }
        if (task["process"] === "inProgress") {
            tasksInProgressCounter++
        }
        if (task["process"] === "awaitingFeedback") {
            awaitingFeedbackCounter++
        }
        if (task["process"] === "done") {
            doneSummaryCounter++
        }
    }
    todoSummary.innerHTML = `${todoSummaryCounter}`;
    tasksInProgress.innerHTML = `${tasksInProgressCounter}`;
    awaitingFeedbackSummary.innerHTML = `${awaitingFeedbackCounter}`;
    doneSummary.innerHTML = `${doneSummaryCounter}`;
    goodMorningName.innerHTML = activeUser["name"];

    //Clock
    let heute = new Date();
    let monthL = new Date().toLocaleString('de-de', { month: 'long' });
    summaryDate.innerHTML = `${monthL} ${heute.getDate()}, ${heute.getFullYear()}`;
    summaryDay.innerHTML = `${heute.getDate()}`;

    /* #########################   Board   ######################### */

    tasks.forEach((task, index) => {
        loadBoard(task, index);
    });

    backend.setItem('tasks', JSON.stringify(tasks)); // wenn ich etwas ändere soll es auch auf den backend geladen werden
}

// ist dazu da das im Board die add task leiste reinanimiert wird
function showAddTask() {
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.classList.remove('hide');

    let boardAddTask = document.getElementById('boardAddTask');
    boardAddTask.innerHTML = addTaskHTML();
    updateAssignedTo();
}

// Wenn man im board das add task schließt, bekommt es die klasse slideOut
function hideAddTask() {
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

    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.classList.add('hide');

    let boardAddTask = document.getElementById('boardAddTask');
    boardAddTask.innerHTML = '';
}

/** Ändert die beiden Bilder je nach angemeldetem Profile */
function changeImg() {
    let userImgHeader = document.getElementById('userImgHeader');
    let userImg = document.getElementById('userImg');

    //Fals kein Bild gefunden wird
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