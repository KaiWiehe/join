/** sets the url to the backend and loads the info into the variables*/
async function downloadBackend() {
    setURL('https://join.kai-wiehe.de/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    activeUser = JSON.parse(backend.getItem('activeUser')) || [];
    taskIdCounter = JSON.parse(backend.getItem('taskIdCounter')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    console.log('users', users);
    console.log('tasks', tasks);
    console.log('activeUser', activeUser);
    console.log('contacts', contacts);
    console.log('categorys', categorys);
}