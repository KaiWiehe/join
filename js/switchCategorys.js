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
    } else if (number === 2) {
        board.classList.remove('hide');
    } else if (number === 3) {
        backlog.classList.remove('hide');
    } else if (number === 4) {
        addTask.classList.remove('hide');
    } else if (number === 5) {
        help.classList.remove('hide');
    } else if (number === 6) {
        aboutUs.classList.remove('hide');
    } else if (number === 7) {
        contacts.classList.remove('hide');
    }
}