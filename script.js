tasks = [];

async function init() {
    await loadJSON();
    await includeHTML();
    switchCategorys();
    loadTasks();
    //if (localStorage.length > 0) {
    //    await loadJSON();
    //}
    //if (tasks.length > 1) {
    //    loadTasks();
    //}

    //saveInLocalStorrage();
}

/** Lädt die JSON herunter */
async function loadJSON() {
    // zum testen mit LocalStorrage
    //let tasksAsString = localStorage.getItem('tasks');
    //tasks.push(JSON.parse(tasksAsString));

    //TODO funktuniert noch nicht weil er alles aus dem local storage zwar als json wieder gibt 
    //aber er packt es als unterpunkt hinein (siehe Bild) 

    let resp = await fetch('./tasks.json');

    if (resp.ok) { //all good
        tasks = await resp.json();
        console.log(tasks);
    } else { //error
        alert("JSON not found 😒")
        console.error("JSON not found 😒")
            // TODO
    }
}

/** Fügt die Daten aus dem JSON in das Board und in das Backlog */
function loadTasks() {
    /* #########################   Board   ######################### */

    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let testing = document.getElementById('testing');
    let done = document.getElementById('done');

    let backlogContainer = document.getElementById('backlogContainer');

    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    testing.innerHTML = ``;
    done.innerHTML = ``;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

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
                    <img onclick="del(${i})" class="trashImg" src="img/trash.svg">
                </div>
            </div>`;
        } else if (task["process"] === "testing") {
            testing.innerHTML += `
            <div class="card">
                <h3>${task["titel"]}</h3>
                <p>${task["description"]}</p>
                <button class="button cardButton" onclick="boardBack(${i})">Back</button>
                <button class="button cardButton" onclick="boardnext(${i})">Next</button>
                <div class="AssignedTo">
                    <p>${task["AssignedTo"]}</p>
                    <img onclick="del(${i})" class="trashImg" src="img/trash.svg">
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
                    <img onclick="del(${i})" class="trashImg" src="img/trash.svg">
                </div>
            </div>`;
        }
    }

    /* #########################   Backlog   ######################### */

    backlogContainer.innerHTML = ``;

    for (let b = 0; b < tasks.length; b++) {
        const task = tasks[b];

        backlogContainer.innerHTML += `
        <tr>
            <td id="backlogFirstTd${b}" class="backlogFirstTd"><img src=${task["img"]} alt="Profile Img"> ${task["AssignedTo"]}</td>
            <td>${task["category"]}</td>
            <td class="backlogLastTd">${task["titel"]}: ${task["description"]} (Status: ${capitalizeFirstLetter(task["process"])})</td>
        </tr>`;

        changeColor(b, task);
    }

}

function changeColor(i, task) {
    backlogFirstTd = document.getElementById(`backlogFirstTd${i}`);

    if (task["AssignedTo"] === "Kai") { // Wenn es Kai zugewiesen ist
        backlogFirstTd.style = "border-left: 0.25rem solid var(--bgPrimary);";
    } else if (task["AssignedTo"] === "Caro") { // Wenn es Caro zugewiesen ist
        backlogFirstTd.style = "border-left: 0.25rem solid green;";
    }
}

function switchCategorys() {
    let summaryButton = document.getElementsByClassName('summary');
    let boardButton = document.getElementById('boardButton');
    let backlogButton = document.getElementById('backlogButton');
    let addTaskButton = document.getElementById('addTaskButton');
    let helpButton = document.getElementById('helpButton');
    let aboutUsButton = document.getElementById('aboutUsButton');

    let summary = document.getElementById('summary');
    let board = document.getElementById('board');
    let backlog = document.getElementById('backlog');
    let addTask = document.getElementById('addTask');
    let help = document.getElementById('help');
    let aboutUs = document.getElementById('aboutUs');

    for (let i = 0; i < summaryButton.length; i++) { // die for schleife muss sein da es eine Klasse ist, durch die forschleife gibt er jedem mit der klasse den eventlistener
        summaryButton[i].addEventListener('click', (KeyboardEvent) => {
            //if (KeyboardEvent.code === "Enter")
            summary.classList.remove('hide');
            board.classList.add('hide');
            backlog.classList.add('hide');
            addTask.classList.add('hide');
            help.classList.add('hide');
            aboutUs.classList.add('hide');
        })
    }
    boardButton.addEventListener('click', (KeyboardEvent) => {
        //if (KeyboardEvent.code === "Enter")
        summary.classList.add('hide');
        board.classList.remove('hide');
        backlog.classList.add('hide');
        addTask.classList.add('hide');
        help.classList.add('hide');
        aboutUs.classList.add('hide');
    })
    backlogButton.addEventListener('click', (KeyboardEvent) => {
        //if (KeyboardEvent.code === "Enter")
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.remove('hide');
        addTask.classList.add('hide');
        help.classList.add('hide');
        aboutUs.classList.add('hide');
    })
    addTaskButton.addEventListener('click', (KeyboardEvent) => {
        //if (KeyboardEvent.code === "Enter")
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.add('hide');
        addTask.classList.remove('hide');
        help.classList.add('hide');
        aboutUs.classList.add('hide');
    })
    helpButton.addEventListener('click', (KeyboardEvent) => {
        //if (KeyboardEvent.code === "Enter")
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.add('hide');
        addTask.classList.add('hide');
        help.classList.remove('hide');
        aboutUs.classList.add('hide');
    })
    aboutUsButton.addEventListener('click', (KeyboardEvent) => {
        //if (KeyboardEvent.code === "Enter")
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.add('hide');
        addTask.classList.add('hide');
        help.classList.add('hide');
        aboutUs.classList.remove('hide');
    })

}

function createTask() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let urgencySelect = document.getElementById('urgencySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    let img;
    debugger

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
    saveInLocalStorrage();
    console.log(tasks);

    titelInputField.value = '';
    dateInputField.value = '';
    categorySelect.value = '';
    urgencySelect.value = '';
    descriptionInputField.value = '';
    assignedToSelect.value = '';

}

function saveInLocalStorrage() { // funktuniert noch nicht TODO

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function boardnext(i) {
    if (tasks[i]['process'] === 'todo') {
        tasks[i]['process'] = 'inProgress';
        loadTasks();
    } else if (tasks[i]['process'] === 'inProgress') {
        tasks[i]['process'] = 'testing';
        loadTasks();
    } else if (tasks[i]['process'] === 'testing') {
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
    } else if (tasks[i]['process'] === 'testing') {
        tasks[i]['process'] = 'inProgress';
        loadTasks();
    } else if (tasks[i]['process'] === 'done') {
        tasks[i]['process'] = 'testing';
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