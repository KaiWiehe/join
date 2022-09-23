let taskIdCounter = 0; // TODO auf 0 setzen, ist nur auf 9 weil ich testelemente drinnen habe

/** Erstellt einen neuen Task mit dem eigegebenem Inhalt */
async function createTask() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let urgencySelect = document.getElementById('urgencySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    let img;

    //setzt das passende bild zum namen ein
    if (assignedToSelect.value === "Kai") {
        img = "assets/img/profileImg.jpg";
    } else if (assignedToSelect.value === "Caro") {
        img = "assets/img/profileImg2.jpg";
    }

    tasks.push({
        "id": `${taskIdCounter}`,
        "titel": `${titelInputField.value}`,
        "description": `${descriptionInputField.value}`,
        "date": `${dateInputField.value}`,
        "urgency": `${urgencySelect.value}`,
        "AssignedTo": `${assignedToSelect.value}`,
        "process": "todo",
        "category": `${categorySelect.value}`,
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

async function createTask2() {
    let titelInputField2 = document.getElementById('titelInputField2');
    let dateInputField2 = document.getElementById('dateInputField2');
    let categorySelect2 = document.getElementById('categorySelect2');
    let urgencySelect2 = document.getElementById('urgencySelect2');
    let descriptionInputField2 = document.getElementById('descriptionInputField2');
    let assignedToSelect2 = document.getElementById('assignedToSelect2');
    let img;

    //setzt das passende bild zum namen ein
    if (assignedToSelect2.value === "Kai") {
        img = "assets/img/profileImg.jpg";
    } else if (assignedToSelect2.value === "Caro") {
        img = "assets/img/profileImg2.jpg";
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