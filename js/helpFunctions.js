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
    let todoSummary = document.getElementById('todoSummary');
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
    todoSummary.innerHTML = ``;
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
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
            </div>
        </div>`;
    } else if (task["process"] === "inProgress") {
        inProgress.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
            </div>
        </div>`;
    } else if (task["process"] === "awaitingFeedback") {
        awaitingFeedback.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
            </div>
        </div>`;
    } else if (task["process"] === "done") {
        done.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
                <p>${task["AssignedTo"]}</p>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
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
        img = "assets/img/profileImg.jpg";
    } else if (assignedToSelect.value === "Caro") {
        img = "assets/img/profileImg2.jpg";
    }
    return img;
}