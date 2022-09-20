tasks = [];
users = [];
activeUser = [];

async function init() {
    setURL('https://kai-wiehe.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    activeUser = JSON.parse(backend.getItem('activeUser')) || [];

    await includeHTML();
    //await loadTaskJSON();
    loadTasks();
}

async function initLogin() {
    setURL('https://kai-wiehe.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    activeUser = JSON.parse(backend.getItem('activeUser')) || [];

    await includeHTML();
    //await loadUserJSON();
    loadMSG();
}

/** Lädt die JSON herunter */
//async function loadTaskJSON() {
//    let resp = await fetch('./tasks.json');
//    if (resp.ok) { //all good
//        tasks = await resp.json();
//        console.log(tasks);
//    } else { //error
//        alert("JSON not found 😒")
//        console.error("JSON not found 😒")
//    }
//}

/** Fügt die Daten aus dem JSON in das Summary, in das Board und in das Backlog */
function loadTasks() {
    definesAllSummaryIds();
    definesAllBoardIds();
    definesAllBacklogIds();

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

    /* #########################   Board   ######################### */

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        loadBoard(task, i);
    }

    /* #########################   Backlog   ######################### */

    for (let b = 0; b < tasks.length; b++) {
        const task = tasks[b];

        loadBacklog(task, b);
        changeColor(b, task);
    }
}

function showAddTask() {
    let boardAddTask = document.getElementById('boardAddTask');
    boardAddTask.classList.remove('hide');
    boardAddTask.classList.add('slideIn');
}

function hideAddTask() {
    let boardAddTask = document.getElementById('boardAddTask');
    boardAddTask.classList.add('slideOut');
    setTimeout(() => {
        boardAddTask.classList.add('hide');
        boardAddTask.classList.remove('slideIn');
        boardAddTask.classList.remove('slideOut');
    }, 225)
}