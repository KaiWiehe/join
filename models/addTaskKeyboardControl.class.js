class AddTaskKeyboardControl {
    addSubTask;
    addSubTaskActive = true;

    constructor() {
        this.addSubTask = document.getElementById('subtaskInputField');
        this.startInterval();
    }

    startInterval() {
        setInterval(() => {
            this.addEventListener()
        }, 60 / 1000);
    }

    addEventListener() {
        this.addSubTaskEvent();
    }

    addSubTaskEvent() {
        if (this.addSubTask && this.addSubTaskActive) {
            this.addSubTask.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') addSubtask();
            })
            this.addSubTaskActive = false;
        }
    }
}