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
    let img;
    if (task["AssignedTo"] === "Kai") {
        img = "assets/img/profileImg.jpg"
    } else if (task["AssignedTo"] === "Caro") {
        img = "assets/img/profileImg2.jpg"
    } else if (task["AssignedTo"] === "Paul") {
        img = "assets/img/image.svg" //TODO richtiges bild einsetzen
    }

    if (task["process"] === "todo") {
        todo.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <span id="category${i}" class="cardCategory">${task["category"]}</span>
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
                <img class="boardProfileImg" src="${img}">
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <img id="urgencyIcon${i}" class="urgencyIcon" src="assets/img/prioLow.png">
            </div>
        </div>`;
    } else if (task["process"] === "inProgress") {
        inProgress.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <span id="category${i}" class="cardCategory">${task["category"]}</span>
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
            <img class="boardProfileImg" src="${img}">
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <img id="urgencyIcon${i}" class="urgencyIcon" src="assets/img/prioLow.png">
            </div>
        </div>`;
    } else if (task["process"] === "awaitingFeedback") {
        awaitingFeedback.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <span id="category${i}" class="cardCategory">${task["category"]}</span>
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
            <img class="boardProfileImg" src="${img}">
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <img id="urgencyIcon${i}" class="urgencyIcon" src="assets/img/prioLow.png">
            </div>
        </div>`;
    } else if (task["process"] === "done") {
        done.innerHTML += `
        <div class="card" draggable="true" ondragstart="startDragging(${task["id"]})">
            <span id="category${i}" class="cardCategory">${task["category"]}</span>
            <h3>${task["titel"]}</h3>
            <p>${task["description"]}</p>
            <div class="AssignedTo">
            <img class="boardProfileImg" src="${img}">
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <img id="urgencyIcon${i}" class="urgencyIcon" src="assets/img/prioLow.png">
            </div>
        </div>`;
    }
    changeCategoryColor(task, i);
    setUrgencyIcon(task, i);
}

/** Lädt das HTML Gerüßt */
function loadBacklog(task, b) {
    let img;
    if (task["img"] != "undefined") {
        img = task["img"];
    } else {
        img = "assets/img/image.svg";
    }
    backlogContainer.innerHTML += `
        <tr>
            <td id="backlogFirstTd${b}" class="backlogFirstTd"><img src=${img} alt="Profile Img"> ${task["AssignedTo"]}</td>
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

function changeCategoryColor(task, i) {
    if (task["category"] === "Managment") {
        let category = document.getElementById(`category${i}`);
        category.style = "background: #bc935b;";
    } else if (task["category"] === "Design") {
        let category = document.getElementById(`category${i}`);
        category.style = "background: orange;";
    } else if (task["category"] === "Sales") {
        let category = document.getElementById(`category${i}`);
        category.style = "background: #e583e5;";
    } else if (task["category"] === "Backoffice") {
        let category = document.getElementById(`category${i}`);
        category.style = "background: #68ffce;";
    } else if (task["category"] === "Marketing") {
        let category = document.getElementById(`category${i}`);
        category.style = "background: blue;";
    } else if (task["category"] === "Media") {
        let category = document.getElementById(`category${i}`);
        category.style = "background: #c1c100;";
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

function setUrgencyIcon(task, i) {
    let urgencyIcon = document.getElementById(`urgencyIcon${i}`);
    if (task["urgency"] === "HIGH") {
        urgencyIcon.src = "assets/img/prioHigh.png";
    } else if (task["urgency"] === "MIDDLE") {
        urgencyIcon.src = "assets/img/prioMiddle.png";
    } else if (task["urgency"] === "LOW") {
        urgencyIcon.src = "assets/img/prioLow.png";
    }
}