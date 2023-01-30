let taskIdCounter = 0;
let urgency = false;
let subtasks = [];

/** Creates a new task with the given content */
function createTask() {
    urgency ? createNewTask() : banner('You have to select an urgency', 'background: rgba(255, 0, 0, 0.538);', 'categoryAlreadyExistsContainer', 1250);
}

/** selects the img according to urgency  */
function setUrgencyImg() {
    if (urgency === 'High') return 'assets/img/prioHigh.png';
    else if (urgency === 'Middle') return 'assets/img/prioMiddle.png';
    else if (urgency === 'Low') return 'assets/img/prioLow.png';
}

/** selects the color according to the category */
function setCategoryColor() {
    let category = categorySelect.value;
    if (category === 'Managment') return '#bc935b';
    else if (category === 'Design') return 'orange';
    else if (category === 'Sales') return '#e583e5';
    else if (category === 'Backoffice') return '#68ffce';
    else if (category === 'Marketing') return 'blue';
    else if (category === 'Media') return '#c1c100';
}

/** selects the img according to assignedToSelect */
function setImgFromAssignedToSelect(task, name) {
    //insert the appropriate picture for the name
    if (name === 'Kai Wiehe') return `<img class="boardProfileImg" src="assets/img/profileImg/profileImg.jpg">`;
    else if (name === 'Carolin') return `<img class="boardProfileImg" src="assets/img/profileImg/profileImg2.jpg">`;
    else return `<div class="noImg">${firstLetter(name)}</div>`;
}

/** fill the assignedToSelect with the contacts */
function updateAssignedTo() {
    let assignedToSelect = document.getElementById('assignedToSelect');
    assignedToSelect.innerHTML = '';
    assignedToSelect.innerHTML = '<option value="" disabled selected hidden>Select contacts to assign</option>';
    contacts.forEach((contact, index) => (assignedToSelect.innerHTML += assignedToSelectHTML(contact, index)));
}

/** HTML snippet */
function assignedToSelectHTML(contact, index) {
    return /* html */ `<option value="${contact.name}">${contact.name}</option>`;
}

/** Shows the edit task card */
function editTask(id, number) {
    let task = returnSelectedTask(id);
    closeCard();
    showAddTask();
    changeAddTaskToEditTask(task, number, id);
}

/** If you click on the button the new task will save.
 * Close the card, update the board etc., shows the task in big and shows the banner. */
async function saveChangesTask(id, number) {
    let task = returnSelectedTask(id);
    setEditedTask(task);
    hideAddTask();
    loadTasks();
    openCard(id, number);
    banner('Task succesfully edited', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}

/** Function for the cancel button, to close "Edit Task" and open the task in big */
function hideEditTask(id, number) {
    hideAddTask();
    openCard(id, number);
    let boardAddTaskcontainer = document.getElementById('boardAddTaskcontainer');
    boardAddTaskcontainer.setAttribute('onclick', `hideAddTask()`);
}

/** If you click the urency high button, it will change the look 
 * @param {i} number - 0 = High, 1 = Middle, 2 = Low */
function clickUrgencyButton(i) {
    removeUrgencyClasses();
    let ids = ['urgencyButtonHigh', 'urgencyButtonMiddle', 'urgencyButtonLow', 'urgencyImgHigh', 'urgencyImgMiddle', 'urgencyImgLow']
    let classes = ['urgencyHigh', 'urgencyMiddle', 'urgencyLow'];
    let urgencyButton = document.getElementById(ids[i])
    let urgencyImg = document.getElementById(ids[i + 3])
    urgencyButton.classList.add(classes[i]);
    urgencyImg.classList.add('urgencyImg');
    urgency = urgencyButton.innerText;
}

/** Remove the look of all urgency buttons */
function removeUrgencyClasses() {
    let ids = ['urgencyButtonHigh', 'urgencyButtonMiddle', 'urgencyButtonLow', 'urgencyImgHigh', 'urgencyImgMiddle', 'urgencyImgLow']
    let buttons = [];
    let classes = ['urgencyHigh', 'urgencyMiddle', 'urgencyLow', 'urgencyImg', 'urgencyImg', 'urgencyImg'];
    ids.forEach(el => {
        buttons.push(document.getElementById(el));
    });
    buttons.forEach((el, i) => {
        el.classList.remove(classes[i]);
    });
}

function pushNewTask() {
    let titelInputField = document.getElementById('titelInputField');
    let dateInputField = document.getElementById('dateInputField');
    let categorySelect = document.getElementById('categorySelect');
    let descriptionInputField = document.getElementById('descriptionInputField');
    let assignedToSelect = document.getElementById('assignedToSelect');
    taskPush(titelInputField, dateInputField, categorySelect, descriptionInputField, assignedToSelect);
}

/**
 * @param {*} HTMLElement - titelInputField 
 * @param {*} HTMLElement - dateInputField 
 * @param {*} HTMLElement - categorySelect 
 * @param {*} HTMLElement - descriptionInputField 
 * @param {*} HTMLElement - assignedToSelect 
 */
function taskPush(titelInputField, dateInputField, categorySelect, descriptionInputField, assignedToSelect) {
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

/** Creates a new task with the given content */
async function createNewTask() {
    pushNewTask();
    await backend.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    taskIdCounter++;
    backend.setItem('taskIdCounter', JSON.stringify(taskIdCounter));
    clearInputFields();
    removeUrgencyClasses();
    hideAddTask();
    banner('Task succesfully created', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}