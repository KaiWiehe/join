let currentDraggedElement;

/**
 * if you click and hold on a task in the board 
 * ondragstart="startDragging(task.id)"
 * @param {number} id - The id of the selected task
 */
function startDragging(id) {
    currentDraggedElement = returnSelectedTask(id);
}

/** changes the html behavior so that an element can be placed there 
 * 
 *  More infos = {@link https://www.w3schools.com/html/html5_draganddrop.asp}
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * changes the category and reloded the board
 * @param {string} category - the category where it is dropped
 */
async function moveTo(category) {
    currentDraggedElement.process = category;
    loadTasks();
    removehighlightArea(category);
}

/**
 * ondragover="highlightArea('todo')"
 * @param {string} id - the id of the element to be highlighted 
 */
function highlightArea(id) {
    document.getElementById(id).classList.add('onDragOverHighlight');
}

/**
 * ondragleave="removehighlightArea('todo')"
 * @param {string} id - the id of the element to remove the highlight
 */
function removehighlightArea(id) {
    document.getElementById(id).classList.remove('onDragOverHighlight');
}