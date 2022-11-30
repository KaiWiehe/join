let currentDraggedElement;
let searchedTasks = [];

function startDragging(id) {
    currentDraggedElement = returnSelectedTask(id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(category) {
    currentDraggedElement.process = category;
    loadTasks();
    removehighlightArea(category)
}

function highlightArea(id) {
    document.getElementById(id).classList.add('onDragOverHighlight');
}

function removehighlightArea(id) {
    document.getElementById(id).classList.remove('onDragOverHighlight');
}

function del(i) {
    tasks.splice(i, 1);
    loadTasks();
    closeCard();
}

function openCard(id, i) {
    let task = returnSelectedTask(id);

    let bottomRightPopUp = document.getElementById('bottomRightPopUp');
    bottomRightPopUp.innerHTML = /* html */ `
    <div class="cardBigContainer" onclick="closeCard()">
        <div class="cardBig" onclick="doNotClose(event)">
            <div class="card">
                <span class="cardCategory" id="categoryBig${task.id}">${task.category}</span>
                <h3>${task.titel}</h3>
                <p>${task.description}</p>
                <h4>Subtasks:</h4><div class="subtaskCardContainer" id="subtaskCardContainer"></div>
                <p><b>Due date:</b>${task.date}</p>
                <p><b>Priority:</b>${task.urgency} <img id="urgencyIcon" class="urgencyIcon" src="${task.urgencyImg}"></p>
                <div class="flex" style="align-items: center;"><p class="flex" style="margin: 0;"><b>Assigned to: </b>${task.AssignedTo}${task.img}</p></div>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <button onclick="editTask(${task.id}, ${i})" class="editImg button"><img src="assets/img/editTaskIcon.png" alt=""></button>
            </div>
        </div>
    </div>`;
    changeCategoryColorBig(task);

    let subtaskCardContainer = document.getElementById('subtaskCardContainer');
    task.subtasks.forEach(subtask => {
        subtaskCardContainer.innerHTML += /* html */ `<div class="subtaskItem">${subtask}<div>`;
    });
}

function closeCard() {
    let bottomRightPopUp = document.getElementById('bottomRightPopUp');
    bottomRightPopUp.innerHTML = '';
}

function loadBoard(task, i) {
    if (task.process === "todo") {
        todo.innerHTML += boardHTML(task, i);
    } else if (task.process === "inProgress") {
        inProgress.innerHTML += boardHTML(task, i)
    } else if (task.process === "awaitingFeedback") {
        awaitingFeedback.innerHTML += boardHTML(task, i)
    } else if (task["process"] === "done") {
        done.innerHTML += boardHTML(task, i)
    }
    changeCategoryColor(task);
}

function changeCategoryColor(task) {
    let category = document.getElementById(`category${task.id}`);
    category.style = `background: ${task.categoryColor};`;
}

function changeCategoryColorBig(task) {
    let categoryBig = document.getElementById(`categoryBig${task.id}`);
    categoryBig.style = `background: ${task.categoryColor};`;
}

function boardHTML(task, i) {
    return `<div class="card" draggable="true" ondragstart="startDragging(${task.id})" onclick="openCard(${task.id}, ${i})">
            <span id="category${task.id}" class="cardCategory">${task.category}</span>
            <h3>${task.titel}</h3>
            <p>${task.description}</p>
            <div class="AssignedTo">
                ${task.img}
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <img id="urgencyIcon${i}" class="urgencyIcon" src="${task.urgencyImg}">
            </div>
        </div>`;
}

function filterTasks() {
    clearBoard();
    searchedTasks = [];

    let search = document.getElementById('search');
    search = search.value.toLowerCase(); // damit Groß und Kleinschreibung keine rolle spielt

    if (search.length > 0) {
        tasks.forEach(task => {
            if (task.titel.toLowerCase().includes(search)) {
                searchedTasks.push(task);
            }
        });
    } else {
        loadTasks();
    }
    if (searchedTasks.length > 0) {
        searchedTasks.forEach((task, index) => {
            loadBoard(task, index)
        });
    }
}