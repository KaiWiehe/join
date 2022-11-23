let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = returnSelectedTask(id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
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
                <p><b>Due date:</b>${task.date}</p>
                <p><b>Priority:</b>${task.urgency} <img id="urgencyIcon" class="urgencyIcon" src="${task.urgencyImg}"></p>
                <div class="flex" style="align-items: center;"><p class="flex" style="margin: 0;"><b>Assigned to: </b>${task.AssignedTo}${task.img}</p></div>
                <img onclick="del(${i})" class="trashImg" src="assets/img/trash.svg">
                <button onclick="editTask(${task.id}, ${i})" class="editImg button"><img src="assets/img/editTaskIcon.png" alt=""></button>
            </div>
        </div>
    </div>`;
    changeCategoryColorBig(task);
}

function closeCard() {
    let bottomRightPopUp = document.getElementById('bottomRightPopUp');
    bottomRightPopUp.innerHTML = '';
}

function loadBoard(task, i) { //TODO funktuniert aus irgendeinem grund nicht mehr
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