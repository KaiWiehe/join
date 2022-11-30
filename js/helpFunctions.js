/* #############################################   Hilfsfunktionen   ############################################# */

/**
 * @param string 
 * @returns string Großgeschrieben
 * @example
 * // Die Funktion gibt uns "Name" zurück
 * console.log(capitalizeFirstLetter(name))
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param string 
 * @returns string only first letter Big
 * @example
 * // Die Funktion gibt uns "N" zurück
 * console.log(capitalizeFirstLetter(name))
 */
function firstLetter(string) {
    return string.charAt(0).toUpperCase();
}

/** Definiert alle ID's in der Summary Karte */
function definesAllSummaryIds() {
    let tasksInBoard = document.getElementById('tasksInBoard');
    let tasksInProgress = document.getElementById('tasksInProgress');
    let awaitingFeedbackSummary = document.getElementById('awaitingFeedbackSummary');
    let todoSummary = document.getElementById('todoSummary');
    let doneSummary = document.getElementById('doneSummary');
    let goodMorningName = document.getElementById('goodMorningName');
    let summaryDate = document.getElementById('summaryDate');
    let summaryDay = document.getElementById('summaryDay');
}

/** Definiert alle ID's in der Board Karte */
function definesAllBoardIds() {
    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
}

/** Löscht alle Divs */
function clearAllDivs() {
    tasksInBoard.innerHTML = ``;
    tasksInProgress.innerHTML = ``;
    awaitingFeedbackSummary.innerHTML = ``;
    todoSummary.innerHTML = ``;
    doneSummary.innerHTML = ``;

    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;
}

function clearBoard() {
    let todo = document.getElementById('todo');
    let inProgress = document.getElementById('inProgress');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
    todo.innerHTML = ``;
    inProgress.innerHTML = ``;
    awaitingFeedback.innerHTML = ``;
    done.innerHTML = ``;
}

function returnSelectedTask(i) {
    let id = [i];
    let task = tasks.filter((itm) => {
        return id.indexOf(Number(itm.id)) > -1;
    })
    task = task[0];
    return task;
}