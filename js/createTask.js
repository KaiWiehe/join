let taskIdCounter = 0;

/** Erstellt einen neuen Task mit dem eigegebenem Inhalt */
async function createTask() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let urgencySelect = document.getElementById('urgencySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');

    tasks.push({
        "id": `${taskIdCounter}`,
        "titel": `${titelInputField.value}`,
        "description": `${descriptionInputField.value}`,
        "date": `${dateInputField.value}`,
        "urgency": `${urgencySelect.value}`,
        "urgencyImg": `${setUrgencyImg()}`,
        "AssignedTo": `${assignedToSelect.value}`,
        "process": "todo",
        "category": `${categorySelect.value}`,
        "categoryColor": `${setCategoryColor()}`,
        "img": `${setImgFromAssignedToSelect(true, assignedToSelect.value)}`
    })

    await backend.setItem('tasks', JSON.stringify(tasks));

    loadTasks();

    taskIdCounter++

    backend.setItem('taskIdCounter', JSON.stringify(taskIdCounter));

    titelInputField.value = '';
    dateInputField.value = '';
    categorySelect.value = '';
    urgencySelect.value = '';
    descriptionInputField.value = '';
    assignedToSelect.value = '';
}

async function createTask2() {
    let titelInputField2 = document.getElementById('titelInputField2');
    let dateInputField2 = document.getElementById('dateInputField2');
    let categorySelect2 = document.getElementById('categorySelect2');
    let urgencySelect2 = document.getElementById('urgencySelect2');
    let descriptionInputField2 = document.getElementById('descriptionInputField2');
    let assignedToSelect2 = document.getElementById('assignedToSelect2');
    let img;

    //setzt das passende bild zum namen ein
    if (assignedToSelect2.value === 'Kai') {
        img = 'assets/img/profileImg/profileImg.jpg';
    } else if (assignedToSelect2.value === "Caro") {
        img = 'assets/img/profileImg/profileImg2.jpg';
    } else {
        img = 'assets/img/profileImg/image.svg';
    }

    tasks.push({
        "id": `${taskIdCounter}`,
        "titel": `${titelInputField2.value}`,
        "description": `${descriptionInputField2.value}`,
        "date": `${dateInputField2.value}`,
        "urgency": `${urgencySelect2.value}`,
        "AssignedTo": `${assignedToSelect2.value}`,
        "process": "todo",
        "category": `${categorySelect2.value}`,
        "img": `${img}`
    })

    await backend.setItem('tasks', JSON.stringify(tasks));

    loadTasks();

    taskIdCounter++

    titelInputField.value = '';
    dateInputField.value = '';
    categorySelect.value = '';
    urgencySelect.value = '';
    descriptionInputField.value = '';
    assignedToSelect.value = '';
}

function setUrgencyImg() {
    if (urgencySelect.value === 'HIGH') {
        return 'assets/img/prioHigh.png';
    } else if (urgencySelect.value === 'MIDDLE') {
        return 'assets/img/prioMiddle.png';
    } else if (urgencySelect.value === 'LOW') {
        return 'assets/img/prioLow.png';
    }
}

function setCategoryColor() {
    if (categorySelect.value === "Managment") {
        return '#bc935b';
    } else if (categorySelect.value === "Design") {
        return 'orange';
    } else if (categorySelect.value === "Sales") {
        return '#e583e5';
    } else if (categorySelect.value === "Backoffice") {
        return '#68ffce';
    } else if (categorySelect.value === "Marketing") {
        return 'blue';
    } else if (categorySelect.value === "Media") {
        return '#c1c100';
    }
}

function setImgFromAssignedToSelect(task, name) {
    //setzt das passende bild zum namen ein
    if (name === 'Kai Wiehe') {
        return `<img class="boardProfileImg" src="assets/img/profileImg/profileImg.jpg">`;
    } else if (name === 'Carolin') {
        return `<img class="boardProfileImg" src="assets/img/profileImg/profileImg2.jpg">`;
    } else {
        return `<div class="noImg">${firstLetter(name)}</div>`;
    }
}