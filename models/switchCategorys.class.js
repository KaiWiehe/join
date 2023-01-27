class SwitchCategorys {
    summary = document.getElementById('summary');
    board = document.getElementById('board');
    addTask = document.getElementById('addTask');
    contacts = document.getElementById('contacts');
    help = document.getElementById('help');
    aboutUs = document.getElementById('aboutUs');

    menuSummary = document.getElementById('menuSummary');
    menuBoard = document.getElementById('menuBoard');
    menuAddTask = document.getElementById('menuAddTask');
    menuHelp = document.getElementById('menuHelp');
    menuAboutUs = document.getElementById('menuAboutUs');
    menuContacts = document.getElementById('menuContacts');

    number;

    content = [this.summary, this.board, this.addTask, this.contacts, this.help, this.aboutUs];
    menu = [this.menuSummary, this.menuBoard, this.menuAddTask, this.menuContacts, this.menuHelp, this.menuAboutUs];

    /**
     * @param {number} number the number of the respective menu item
     */
    constructor(number) {
        this.number = number;
        this.hideAll();
        this.hideMenuBorder();
        this.openContent();
        this.highlightActiveMenu();
    }

    /**
     * opens the correct window depending on the number
     */
    openContent() {
        if (!(this.number === 2)) {
            this.content[this.number].classList.remove('hide');
            this.addTask.innerHTML = '';
        } else {
            this.openAddTask();
        }
    }

    /**
     * hides the entire content
     */
    hideAll() {
        this.content.forEach((contentItem) => {
            contentItem.classList.add('hide');
        })
    }

    /**
     * opens addTask and fill the content
     */
    openAddTask() {
        this.addTask.classList.remove('hide');
        this.addTask.innerHTML = addTaskHTML();
        updateAssignedTo();
        subtasks = [];
        loadSubTasks();
        loadCategorys();
    }

    /**
     * remove the highlight of the menu
     */
    hideMenuBorder() {
        this.menu.forEach((menuItem) => {
            menuItem.classList.remove('highlightActiveMenu');
        })
    }

    /**
     * highlight the active menu
     */
    highlightActiveMenu() {
        this.menu[this.number].classList.add('highlightActiveMenu');
    }
}