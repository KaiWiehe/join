tasks = [];

async function init() {
    await includeHTML();
    await loadJSON();
    switchCategorys();
    loadTasks();
}

/** Lädt die JSON herunter */
async function loadJSON() {
    let resp = await fetch('./tasks.json');
    if (resp.ok) { //all good
        tasks = await resp.json();
        console.log(tasks);
    } else { //error
        alert("JSON not found 😒")
        console.error("JSON not found 😒")
    }
}

/** Fügt die Daten aus dem JSON in das Summary, in das Board und in das Backlog */
function loadTasks() {
    definesAllSummaryIds();
    definesAllBoardIds();
    definesAllBacklogIds();

    clearAllDivs();

    /* #########################   Summary   ######################### */

    let tasksInProgressCounter = 0;
    let awaitingFeedbackCounter = 0;
    let doneSummaryCounter = 0;

    tasksInBoard.innerHTML = `${tasks.length}`;
    tasksSummary.innerHTML = `${tasks.length}`;

    for (let a = 0; a < tasks.length; a++) {
        const task = tasks[a];

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
    tasksInProgress.innerHTML = `${tasksInProgressCounter}`;
    awaitingFeedbackSummary.innerHTML = `${awaitingFeedbackCounter}`;
    doneSummary.innerHTML = `${doneSummaryCounter}`;

    /* #########################   Board   ######################### */

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        loadBoard(task, i);
    }

    /* #########################   Backlog   ######################### */

    backlogContainer.innerHTML = ``;

    for (let b = 0; b < tasks.length; b++) {
        const task = tasks[b];

        loadBacklog(task, b);
        changeColor(b, task);
    }

}

/** Erstellt einen neuen Task mit dem eigegebenem Inhalt */
function createTask() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let urgencySelect = document.getElementById('urgencySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');

    // Funktioniert noch nicht TODO 
    // er gibt kein bild wieder 
    //changeIMG();

    let img;
    //setzt das passende bild zum namen ein
    if (assignedToSelect.value === "Kai") {
        img = "../assets/img/profileImg.jpg";
    } else if (assignedToSelect.value === "Caro") {
        img = "../assets/img/profileImg2.jpg";
    }

    tasks.push({
        "titel": `${titelInputField.value}`,
        "description": `${descriptionInputField.value}`,
        "date": `${dateInputField.value}`,
        "urgency": `${urgencySelect.value}`,
        "AssignedTo": `${assignedToSelect.value}`,
        "process": "todo",
        "category": `${categorySelect.value}`,
        "img": `${img}`
    })
    loadTasks();
    console.log(tasks);

    titelInputField.value = '';
    dateInputField.value = '';
    categorySelect.value = '';
    urgencySelect.value = '';
    descriptionInputField.value = '';
    assignedToSelect.value = '';

}

function boardnext(i) {
    if (tasks[i]['process'] === 'todo') {
        tasks[i]['process'] = 'inProgress';
        loadTasks();
    } else if (tasks[i]['process'] === 'inProgress') {
        tasks[i]['process'] = 'awaitingFeedback';
        loadTasks();
    } else if (tasks[i]['process'] === 'awaitingFeedback') {
        tasks[i]['process'] = 'done';
        loadTasks();
    } else if (tasks[i]['process'] === 'done') {
        alert("Mehr als fertig wird es nicht 👌");
    }

}

function boardBack(i) {
    if (tasks[i]['process'] === 'todo') {
        alert("Weiter zurück geht nicht 😒");
    } else if (tasks[i]['process'] === 'inProgress') {
        tasks[i]['process'] = 'todo';
        loadTasks();
    } else if (tasks[i]['process'] === 'awaitingFeedback') {
        tasks[i]['process'] = 'inProgress';
        loadTasks();
    } else if (tasks[i]['process'] === 'done') {
        tasks[i]['process'] = 'awaitingFeedback';
        loadTasks();
    }
}

function del(i) {
    tasks.splice(i, 1);
    loadTasks();
}

/* #############################################   Hilfsfunktionen   ############################################# */

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

/** Definiert alle ID's in der Summary Karte */
function definesAllSummaryIds() {
    let tasksInBoard = document.getElementById('tasksInBoard');
    let tasksInProgress = document.getElementById('tasksInProgress');
    let awaitingFeedbackSummary = document.getElementById('awaitingFeedbackSummary');
    let tasksSummary = document.getElementById('tasksSummary');
    let doneSummary = document.getElementById('doneSummary');
}

/** Definiert alle ID's in der Board Karte */
function definesAllBoardIds() {
    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
}

/** Definiert alle ID's in der Backlog Karte */
function definesAllBacklogIds() {
    let backlogContainer = document.getElementById('backlogContainer');
}

/** Löscht alle Divs */
function clearAllDivs() {
    tasksInBoard.innerHTML = ``;
    tasksInProgress.innerHTML = ``;
    awaitingFeedbackSummary.innerHTML = ``;
    tasksSummary.innerHTML = ``;
    doneSummary.innerHTML = ``;

    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;

    backlogContainer.innerHTML = ``;
}

/** Lädt das HTML Gerüßt */
function loadBoard(task, i) {
    if (task["process"] === "todo") {
        todo.innerHTML += `
        <div class="card">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <button class="button cardButton" onclick="boardBack(${i})">Back</button>
            <button class="button cardButton" onclick="boardnext(${i})">Next</button>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="../assets/img/trash.svg">
            </div>
        </div>`;
    } else if (task["process"] === "inProgress") {
        inProgress.innerHTML += `
        <div class="card">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <button class="button cardButton" onclick="boardBack(${i})">Back</button>
            <button class="button cardButton" onclick="boardnext(${i})">Next</button>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="../assets/img/trash.svg">
            </div>
        </div>`;
    } else if (task["process"] === "awaitingFeedback") {
        awaitingFeedback.innerHTML += `
        <div class="card">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <button class="button cardButton" onclick="boardBack(${i})">Back</button>
            <button class="button cardButton" onclick="boardnext(${i})">Next</button>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="../assets/img/trash.svg">
            </div>
        </div>`;
    } else if (task["process"] === "done") {
        done.innerHTML += `
        <div class="card">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <button class="button cardButton" onclick="boardBack(${i})">Back</button>
            <button class="button cardButton" onclick="boardnext(${i})">Next</button>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="../assets/img/trash.svg">
            </div>
        </div>`;
    }
}

/** Lädt das HTML Gerüßt */
function loadBacklog(task, b) {
    backlogContainer.innerHTML += `
        <tr>
            <td id="backlogFirstTd${b}" class="backlogFirstTd"><img src=${task["img"]} alt="Profile Img"> ${task["AssignedTo"]}</td>
            <td>${task["category"]}</td>
            <td class="backlogLastTd">${task["titel"]}: ${task["description"]} (Status: ${capitalizeFirstLetter(task["process"])})</td>
        </tr>`;
}

/** Setzt die passende Farbe je nach zugewiesener Person */
function changeColor(i, task) {
    backlogFirstTd = document.getElementById(`backlogFirstTd${i}`);

    if (task["AssignedTo"] === "Kai") { // Wenn es Kai zugewiesen ist
        backlogFirstTd.style = "border-left: 0.25rem solid var(--bgPrimaryBlue);";
    } else if (task["AssignedTo"] === "Caro") { // Wenn es Caro zugewiesen ist
        backlogFirstTd.style = "border-left: 0.25rem solid green;";
    }
}

function changeIMG() {
    let img;
    //setzt das passende bild zum namen ein
    if (assignedToSelect.value === "Kai") {
        img = "../assets/img/profileImg.jpg";
    } else if (assignedToSelect.value === "Caro") {
        img = "../assets/img/profileImg2.jpg";
    }
    return img;
}