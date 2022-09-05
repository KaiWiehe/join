/** Fügt den Buttons auf der linken Seite eine "click" event hinzu */
function switchCategorys() {
    let summaryButton = document.getElementsByClassName('summary');
    let boardButton = document.getElementById('boardButton');
    let backlogButton = document.getElementById('backlogButton');
    let addTaskButton = document.getElementById('addTaskButton');
    let helpButton = document.getElementById('helpButton');
    let aboutUsButton = document.getElementById('aboutUsButton');

    let summary = document.getElementById('summary');
    let board = document.getElementById('board');
    let backlog = document.getElementById('backlog');
    let addTask = document.getElementById('addTask');
    let help = document.getElementById('help');
    let aboutUs = document.getElementById('aboutUs');

    for (let i = 0; i < summaryButton.length; i++) { // die for Schleife muss sein da es eine Klasse ist, durch die for Schleife gibt er jedem mit der Klasse den eventlistener
        summaryButton[i].addEventListener('click', (KeyboardEvent) => {
            //if (KeyboardEvent.code === "Enter")
            summary.classList.remove('hide');
            board.classList.add('hide');
            backlog.classList.add('hide');
            addTask.classList.add('hide');
            help.classList.add('hide');
            aboutUs.classList.add('hide');
        })
    }
    boardButton.addEventListener('click', (KeyboardEvent) => {
        summary.classList.add('hide');
        board.classList.remove('hide');
        backlog.classList.add('hide');
        addTask.classList.add('hide');
        help.classList.add('hide');
        aboutUs.classList.add('hide');
    })
    backlogButton.addEventListener('click', (KeyboardEvent) => {
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.remove('hide');
        addTask.classList.add('hide');
        help.classList.add('hide');
        aboutUs.classList.add('hide');
    })
    addTaskButton.addEventListener('click', (KeyboardEvent) => {
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.add('hide');
        addTask.classList.remove('hide');
        help.classList.add('hide');
        aboutUs.classList.add('hide');
    })
    helpButton.addEventListener('click', (KeyboardEvent) => {
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.add('hide');
        addTask.classList.add('hide');
        help.classList.remove('hide');
        aboutUs.classList.add('hide');
    })
    aboutUsButton.addEventListener('click', (KeyboardEvent) => {
        summary.classList.add('hide');
        board.classList.add('hide');
        backlog.classList.add('hide');
        addTask.classList.add('hide');
        help.classList.add('hide');
        aboutUs.classList.remove('hide');
    })

}