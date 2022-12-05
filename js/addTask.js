let taskIdCounter = 0;
let urgency = false;
let subtasks = [];

/** Erstellt einen neuen Task mit dem eigegebenem Inhalt */
function createTask() {
    if (urgency) {
        createNewTask();
    } else {
        banner('You have to select an urgency', 'background: rgba(255, 0, 0, 0.538);', 'categoryAlreadyExistsContainer', 1250);
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
    if (categorySelect.value === 'Managment') {
        return '#bc935b';
    } else if (categorySelect.value === 'Design') {
        return 'orange';
    } else if (categorySelect.value === 'Sales') {
        return '#e583e5';
    } else if (categorySelect.value === 'Backoffice') {
        return '#68ffce';
    } else if (categorySelect.value === 'Marketing') {
        return 'blue';
    } else if (categorySelect.value === 'Media') {
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
    let task = returnSelectedTask(id);
    closeCard();
    showAddTask();
    changeAddTaskToEditTask(task, number, id);
}

async function saveChangesTask(id, number) {
    let task = returnSelectedTask(id);
    setEditedTask(task);
    hideAddTask();
    loadTasks();
    openCard(id, number);
    banner('Task succesfully edited', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
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

function addSubtask() {
    subtaskInputField = document.getElementById('subtaskInputField');

    subtasks.push(subtaskInputField.value);
    loadSubTasks(subtasksContainer);
    subtaskInputField.value = '';
}

function loadSubTasks() {
    subtasksContainer = document.getElementById('subtasksContainer');
    subtasksContainer.innerHTML = '';
    subtasks.forEach((subtask, index) => {
        subtasksContainer.innerHTML += /* html */ `<div class="subtask">${subtask} <img onclick="delSubtask(${index})" src="assets/img/trash.svg"> <div>`;
    });
}

function delSubtask(index) {
    subtasks.splice(index, 1);
    loadSubTasks();
}

function openAddCategory() {
    openAddContactOrEdit();
    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    addContactTitel.innerHTML = 'Add Category';
    addContactSlogan.classList.remove('hide');
    addContactImg.style = 'display: none;';
    addContactSlogan.style = 'display: none;';
    addContactButtons.innerHTML = `
    <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="button" class="button" onclick="addCategoryForm()">Create Category</button>`;

    addContactName.value = ``;
    addContactMail.style = 'display: none;';
    addContactTel.style = 'display: none;';
}

function closeAddCategory() {
    closeAddContact();
}

function loadCategorys() {
    let categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '';
    categorySelect.innerHTML = '<option value="" disabled selected hidden>Select task category</option>';
    categorys.forEach((category) => {
        categorySelect.innerHTML += /* html */ `
        <option value="${category}">${category}</option>`;
    });
}

function addCategoryForm() {
    let addCategoryTitel = document.getElementById('addContactName');
    addCategory(addCategoryTitel.value);
    addCategoryTitel.value = '';
}

async function addCategory(category) {
    categorys.push(category);
    categorys = arrClean(categorys, 'Category already exists!', 'categoryAlreadyExistsContainer');
    closeAddCategory();
    await backend.setItem('categorys', JSON.stringify(categorys));
    loadCategorys();
    !alreadyExists && banner('Category succesfully created', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}

function pushNewTask() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');

    tasks.push({
        id: `${taskIdCounter}`,
        titel: `${titelInputField.value}`,
        description: `${descriptionInputField.value}`,
        date: `${dateInputField.value}`,
        urgency: `${urgency}`,
        urgencyImg: `${setUrgencyImg()}`,
        AssignedTo: `${assignedToSelect.value}`,
        process: 'todo',
        category: `${categorySelect.value}`,
        categoryColor: `${setCategoryColor()}`,
        img: `${setImgFromAssignedToSelect(true, assignedToSelect.value)}`,
        subtasks: subtasks,
    });
}

function clearInputFields() {
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
    subtasks = [];
    loadSubTasks();
}

async function createNewTask() {
    pushNewTask();
    await backend.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    taskIdCounter++;
    backend.setItem('taskIdCounter', JSON.stringify(taskIdCounter));
    clearInputFields();
    hideAddTask();
    removeUrgencyClasses();
    banner('Task succesfully created', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}

function changeAddTaskToEditTask(task, number, id) {
    definesAllInputs();
    subtasks = task.subtasks;
    changeContent(task, number, id);
}

function definesAllInputs() {
    let addTaskh1 = document.getElementById('addTaskh1');
    let addTaskButtonContainer = document.getElementById('addTaskButtonContainer');
    let hideAddTaskButton = document.getElementById('hideAddTaskButton');
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
}

function changeContent(task, number, id) {
    addTaskh1.innerHTML = 'Edit Task';
    addTaskButtonContainer.innerHTML = editTaskButtonsHTML(id, number);
    hideAddTaskButton.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    boardAddTaskcontainer.setAttribute('onclick', `hideEditTask(${id}, ${number})`);
    loadCategorys();
    loadInputValue(task, number, id);
    highlightUrgencyButton(task);
}

function editTaskButtonsHTML(id, number) {
    return /* html */ `
    <button type="button" class="whiteButton" onclick="hideEditTask(${id}, ${number})">Cancel</button>
    <button type="button" onclick="saveChangesTask(${id}, ${number})" class="button">Save</button>`;
}

function loadInputValue(task, number, id) {
    titelInputField.value = `${task.titel}`;
    dateInputField.value = `${task.date}`;
    categorySelect.value = `${task.category}`;
    descriptionInputField.value = `${task.description}`;
    assignedToSelect.value = `${task.AssignedTo}`;
    loadSubTasks();
}

function highlightUrgencyButton(task) {
    if (task.urgency === 'High') {
        clickUrgencyHigh();
    } else if (task.urgency === 'Middle') {
        clickUrgencyMiddle();
    } else if (task.urgency === 'Low') {
        clickUrgencyLow();
    }
}

function setEditedTask(task) {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');

    task.titel = titelInputField.value;
    task.date = dateInputField.value;
    task.category = categorySelect.value;
    task.urgency = urgency;
    task.description = descriptionInputField.value;
    task.AssignedTo = assignedToSelect.value;
    task.urgencyImg = setUrgencyImg();
    task.categoryColor = setCategoryColor();
    task.img = setImgFromAssignedToSelect(true, assignedToSelect.value);
}