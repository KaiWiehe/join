let taskIdCounter = 0;
let urgency = false;

/** Erstellt einen neuen Task mit dem eigegebenem Inhalt */
async function createTask() {
    debugger
    if (urgency) {
        let titelInputField = document.getElementById('titelInputField');
        let dateInputField = document.getElementById('dateInputField');
        let categorySelect = document.getElementById('categorySelect');
        let descriptionInputField = document.getElementById('descriptionInputField');
        let assignedToSelect = document.getElementById('assignedToSelect');

        tasks.push({
            "id": `${taskIdCounter}`,
            "titel": `${titelInputField.value}`,
            "description": `${descriptionInputField.value}`,
            "date": `${dateInputField.value}`,
            "urgency": `${urgency}`,
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
        descriptionInputField.value = '';
        assignedToSelect.value = '';

        hideAddTask();
        removeUrgencyClasses();
    } else {
        alert('error')
    }
}

function setUrgencyImg() {
    if (urgency === 'High') {
        return 'assets/img/prioHigh.png';
    } else if (urgency === 'Middle') {
        return 'assets/img/prioMiddle.png';
    } else if (urgency === 'Low') {
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

function updateAssignedTo() {
    let assignedToSelect = document.getElementById('assignedToSelect');
    assignedToSelect.innerHTML = '';
    assignedToSelect.innerHTML = '<option value="" disabled selected hidden>Select contacts to assign</option>';
    contacts.forEach((contact, index) => {
        assignedToSelect.innerHTML += /* html */ `
        <option value="${contact.name}">${contact.name}</option>`;
    });
}

function editTask(id, number) {
    let task = returnSelectedTask(id)
    closeCard();
    showAddTask();
    let addTaskh1 = document.getElementById('addTaskh1');
    let addTaskButtonContainer = document.getElementById('addTaskButtonContainer');
    let hideAddTaskButton = document.getElementById('hideAddTaskButton');
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');

    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let urgencySelect = document.getElementById('urgencySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');

    addTaskh1.innerHTML = 'Edit Task';
    addTaskButtonContainer.innerHTML = /* html */ `
    <button type="button" class="whiteButton" onclick="hideEditTask(${id}, ${number})">Cancel</button>
    <button type="button" onclick="saveChangesTask(${id}, ${number})" class="button">Save</button>`;
    hideAddTaskButton.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    boardAddTaskcontainer.setAttribute('onclick', `hideEditTask(${id}, ${number})`);

    titelInputField.value = `${task.titel}`;
    dateInputField.value = `${task.date}`;
    categorySelect.value = `${task.category}`;
    urgencySelect.value = `${task.urgency}`;
    descriptionInputField.value = `${task.description}`;
    assignedToSelect.value = `${task.AssignedTo}`;
}

function saveChangesTask(id, number) {
    let task = returnSelectedTask(id);

    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let urgencySelect = document.getElementById('urgencySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');

    task.titel = titelInputField.value
    task.date = dateInputField.value
    task.category = categorySelect.value
    task.urgency = urgencySelect.value
    task.description = descriptionInputField.value
    task.AssignedTo = assignedToSelect.value
    task.urgencyImg = setUrgencyImg();
    task.categoryColor = setCategoryColor();
    task.img = setImgFromAssignedToSelect(true, assignedToSelect.value);

    hideAddTask();
    loadTasks();
    openCard(id, number);
}

function hideEditTask(id, number) {
    hideAddTask();
    openCard(id, number);
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.setAttribute('onclick', `hideAddTask()`);
}

function clickUrgencyHigh() {
    removeUrgencyClasses();
    let urgencyButtonHigh = document.getElementById('urgencyButtonHigh');
    let urgencyImgHigh = document.getElementById('urgencyImgHigh');
    urgencyButtonHigh.classList.add('urgencyHigh');
    urgencyImgHigh.classList.add('urgencyImg');
    urgency = urgencyButtonHigh.innerText;
}

function clickUrgencyMiddle() {
    removeUrgencyClasses();
    let urgencyButtonMiddle = document.getElementById('urgencyButtonMiddle');
    let urgencyImgMiddle = document.getElementById('urgencyImgMiddle');
    urgencyButtonMiddle.classList.add('urgencyMiddle');
    urgencyImgMiddle.classList.add('urgencyImg');
    urgency = urgencyButtonMiddle.innerText;
}

function clickUrgencyLow() {
    removeUrgencyClasses();
    let urgencyButtonLow = document.getElementById('urgencyButtonLow');
    let urgencyImgLow = document.getElementById('urgencyImgLow');
    urgencyButtonLow.classList.add('urgencyLow');
    urgencyImgLow.classList.add('urgencyImg');
    urgency = urgencyButtonLow.innerText;
}

function removeUrgencyClasses() {
    let urgencyButtonHigh = document.getElementById('urgencyButtonHigh');
    let urgencyButtonMiddle = document.getElementById('urgencyButtonMiddle');
    let urgencyButtonLow = document.getElementById('urgencyButtonLow');
    let urgencyImgHigh = document.getElementById('urgencyImgHigh');
    let urgencyImgMiddle = document.getElementById('urgencyImgMiddle');
    let urgencyImgLow = document.getElementById('urgencyImgLow');
    urgencyButtonHigh.classList.remove('urgencyHigh');
    urgencyButtonMiddle.classList.remove('urgencyMiddle');
    urgencyButtonLow.classList.remove('urgencyLow');
    urgencyImgHigh.classList.remove('urgencyImg');
    urgencyImgMiddle.classList.remove('urgencyImg');
    urgencyImgLow.classList.remove('urgencyImg');
}