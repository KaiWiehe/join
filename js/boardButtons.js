let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]["process"] = category;
    loadTasks();
    removehighlightArea(category)
}

function highlightArea(id) {
    document.getElementById(id).classList.add('onDragOverHighlight');
}

function removehighlightArea(id) {
    document.getElementById(id).classList.remove('onDragOverHighlight');
}

function boardnext(i) {
    if (tasks[i]['process'] === 'todo') {
        tasks[i]['process'] = 'inProgress';
        loadTasks();
    } else if (tasks[i]['process'] === 'inProgress') {
        tasks[i]['process'] = 'awaitingFeedback';
        loadTasks();
    } else if (tasks[i]['process'] === 'awaitingFeedback') {
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
    } else if (tasks[i]['process'] === 'awaitingFeedback') {
        tasks[i]['process'] = 'inProgress';
        loadTasks();
    } else if (tasks[i]['process'] === 'done') {
        tasks[i]['process'] = 'awaitingFeedback';
        loadTasks();
    }
}

function del(i) {
    tasks.splice(i, 1);
    loadTasks();
}