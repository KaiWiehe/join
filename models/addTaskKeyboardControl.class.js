class AddTaskKeyboardControl {
    addTaskForm;
    addSubTask;
    createTaskButton;
    titelInputField;
    active = true;

    tab = false;
    shift = false;

    constructor() {
        this.addTaskForm = document.getElementById('addTaskForm');
        this.addSubTask = document.getElementById('subtaskInputField');
        this.createTaskButton = document.getElementById('createTaskButton');
        this.titelInputField = document.getElementById('titelInputField');
        this.startInterval();
    }

    startInterval() {
        setInterval(() => {
            this.addEventListener()
            console.log(this.tab, this.shift);
        }, 60 / 1000);
    }

    addEventListener() {
        this.addSubTaskEvent();
    }

    addSubTaskEvent() {
        if (this.addSubTask && this.active) {
            this.addSubTask.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') addSubtask();
                })
                // this.createTaskButton.addEventListener('keydown', (e) => {
                //     if (e.key === 'Tab') this.goToFirst();
                // })
                // this.titelInputField.addEventListener('keydown', (e) => {
                //     if (this.tab && this.shift) this.goToButton();
                // })
                // this.addTaskForm.addEventListener('keydown', (e) => {
                //     if (e.key === 'Tab') {
                //         this.tab = true;
                //     }
                //     if (e.key === 'Shift') {
                //         this.shift = true;
                //     }
                // })
                // this.addTaskForm.addEventListener('keyup', (e) => {
                //     if (e.key === 'Tab') {
                //         this.tab = false;
                //     }
                //     if (e.key === 'Shift') {
                //         this.shift = false;
                //     }
                // })
                // this.addSubTaskActive = false;
        }
    }

    goToFirst() {
        this.titelInputField.focus();
    }

    goToButton() {
        this.createTaskButton.focus();
    }
}