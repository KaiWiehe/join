/** Wecheselt zwischen den Kategorien */
function switchCategorys(number) {
    let summary = document.getElementById('summary');
    let board = document.getElementById('board');
    let backlog = document.getElementById('backlog');
    let addTask = document.getElementById('addTask');
    let help = document.getElementById('help');
    let aboutUs = document.getElementById('aboutUs');
    let contacts = document.getElementById('contacts');

    summary.classList.add('hide');
    board.classList.add('hide');
    backlog.classList.add('hide');
    addTask.classList.add('hide');
    help.classList.add('hide');
    aboutUs.classList.add('hide');
    contacts.classList.add('hide');

    if (number === 1) {
        summary.classList.remove('hide');
        addTask.innerHTML = '';
    } else if (number === 2) {
        board.classList.remove('hide');
        addTask.innerHTML = '';
    } else if (number === 3) {
        backlog.classList.remove('hide');
        addTask.innerHTML = '';
    } else if (number === 4) {
        addTask.classList.remove('hide');
        addTask.innerHTML = addTaskHTML();
        updateAssignedTo();
        loadSubTasks();
    } else if (number === 5) {
        help.classList.remove('hide');
        addTask.innerHTML = '';
    } else if (number === 6) {
        aboutUs.classList.remove('hide');
        addTask.innerHTML = '';
    } else if (number === 7) {
        contacts.classList.remove('hide');
        addTask.innerHTML = '';
    }
}

function addTaskHTML() {
    return /* html */ `
    <h1 id="addTaskh1">Add Task</h1>
    <form class="addTaskForm" onsubmit="createTask(); return false;">
        <div class="addTaskLeft">
            <div class=" formCullum">
                <h2>Title</h2>
                <input required id="titelInputField" class="inputField" type="text" placeholder="Enter a Titel">
            </div>
            <div class=" formCullum">
                <h2>Description</h2>
                <textarea minlength="4" required id="descriptionInputField" class="descriptionArea" placeholder="Enter a &#13;Description..."></textarea>
            </div>
            <div class=" formCullum">
                <h2>Category</h2>
                <select required id="categorySelect" class="inputField">
                    <option value="" disabled selected hidden>Select task category</option>
                    <option value="Managment">Managment</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Backoffice">Backoffice</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Media">Media</option>
                </select>
            </div>
            <div class="collum formCullum assignedTo">
                <h2>ASSIGNED TO</h2>
                <select required id="assignedToSelect" class="inputField">
                </select>
            </div>
        </div>

        <div class="addTaskRight">
            <div class="collum formCullum">
                <h2>Date</h2>
                <input required id="dateInputField" class="inputField" placeholder="Day/Month/Year" class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')">
            </div>
            <div class=" formCullum">
                <h2>Urgency</h2>
                <div class="urgencyContainer flex">
                    <div onclick="clickUrgencyHigh()" id="urgencyButtonHigh" class="whiteButton">High <img id="urgencyImgHigh" src="assets/img/prioHigh.png"></div>
                    <div onclick="clickUrgencyMiddle()" id="urgencyButtonMiddle" class="whiteButton">Middle <img id="urgencyImgMiddle" src="assets/img/prioMiddle.png"></div>
                    <div onclick="clickUrgencyLow()" id="urgencyButtonLow" class="whiteButton">Low <img id="urgencyImgLow" src="assets/img/prioLow.png"></div>
                </div>
            </div>
            <div class=" formCullum subtasks">
                <h2>Subtasks</h2>
                <input id="subtaskInputField" class="inputField" type="text" placeholder="Enter a Subtask">
                <img class="subtaskButton" onclick="addSubtask()" src="assets/img/plusBlack.png">
                <div class="subtasksContainer" id="subtasksContainer"></div>
            </div>
            <div class="addTaskButtonContainer" id="addTaskButtonContainer">
                <button type="button" onclick="hideAddTask()" class="whiteButton">Cancel</button>
                <button type="submit" class="button">Create Task</button>
            </div>
        </div>
    </form>`;
}