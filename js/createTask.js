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