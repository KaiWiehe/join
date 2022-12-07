function loadSummary() {
    fillSummaryCounters();

    //Clock
    summaryDate.innerHTML = `${monthL} ${today.getDate()}, ${today.getFullYear()}`;
    summaryDay.innerHTML = `${today.getDate()}`;
}

function fillSummaryCounters() {
    let todoSummaryCounter = 0;
    let tasksInProgressCounter = 0;
    let awaitingFeedbackCounter = 0;
    let doneSummaryCounter = 0;

    tasks.forEach((task) => {
        task.process === 'todo' && todoSummaryCounter++;
        task.process === 'inProgress' && tasksInProgressCounter++;
        task.process === 'awaitingFeedback' && awaitingFeedbackCounter++;
        task.process === 'done' && doneSummaryCounter++;
    });
    updateSummaryCounters(todoSummaryCounter, tasksInProgressCounter, awaitingFeedbackCounter, doneSummaryCounter);
}

function updateSummaryCounters(todoSummaryCounter, tasksInProgressCounter, awaitingFeedbackCounter, doneSummaryCounter) {
    tasksInBoard.innerHTML = `${tasks.length}`;
    todoSummary.innerHTML = `${todoSummaryCounter}`;
    tasksInProgress.innerHTML = `${tasksInProgressCounter}`;
    awaitingFeedbackSummary.innerHTML = `${awaitingFeedbackCounter}`;
    doneSummary.innerHTML = `${doneSummaryCounter}`;
    goodMorningName.innerHTML = activeUser['name'];
}