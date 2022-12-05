function loadSummary() {
    let todoSummaryCounter = 0;
    let tasksInProgressCounter = 0;
    let awaitingFeedbackCounter = 0;
    let doneSummaryCounter = 0;

    tasksInBoard.innerHTML = `${tasks.length}`;

    tasks.forEach(task => {
        if (task.process === "todo") {
            todoSummaryCounter++
        }
        if (task.process === "inProgress") {
            tasksInProgressCounter++
        }
        if (task.process === "awaitingFeedback") {
            awaitingFeedbackCounter++
        }
        if (task.process === "done") {
            doneSummaryCounter++
        }
    });

    todoSummary.innerHTML = `${todoSummaryCounter}`;
    tasksInProgress.innerHTML = `${tasksInProgressCounter}`;
    awaitingFeedbackSummary.innerHTML = `${awaitingFeedbackCounter}`;
    doneSummary.innerHTML = `${doneSummaryCounter}`;
    goodMorningName.innerHTML = activeUser["name"];

    //Clock
    summaryDate.innerHTML = `${monthL} ${today.getDate()}, ${today.getFullYear()}`;
    summaryDay.innerHTML = `${today.getDate()}`;
}