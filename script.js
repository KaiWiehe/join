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
    addContactImg.innerHTML = `<img src="${user.img}">`;
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
    banner('User succesfully edited', "background: var(--leftGrey);", 'categoryAlreadyExistsContainer');
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

// function editContact(number) {
//     let contact = setContact(number);

//     openAddContactOrEdit();

//     let addContactTitel = document.getElementById('addContactTitel');
//     let addContactSlogan = document.getElementById('addContactSlogan');
//     let addContactImg = document.getElementById('addContactImg');
//     let addContactButtons = document.getElementById('addContactButtons');

//     let addContactName = document.getElementById('addContactName');
//     let addContactMail = document.getElementById('addContactMail');
//     let addContactTel = document.getElementById('addContactTel');

//     addContactTitel.innerHTML = 'Edit Contact';
//     addContactSlogan.classList.add('hide');
//     addContactImg.innerHTML = `${contact.img}`;
//     addContactButtons.innerHTML = /* html */ `
//     <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
//     <button type="button" class="button" onclick="saveChanges(${number})">Save</button>`;

//     addContactName.value = `${contact.name}`;
//     addContactMail.value = `${contact.mail}`;
//     addContactTel.value = `${contact.phone}`;
// }