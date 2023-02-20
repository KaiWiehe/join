/** determines the active user and passes it on */
function editUser() {
    let user = returnActiveUser();
    openAddContactOrEdit();
    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');
    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');
    updateEditUser(user, addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel);
}

/**
 * edit the window to edit user and fill the empty inputs
 * @param {JSON} user - the active user
 * @param {HTMLElement} addContactTitel 
 * @param {HTMLElement} addContactSlogan 
 * @param {HTMLElement} addContactImg 
 * @param {HTMLElement} addContactButtons 
 * @param {HTMLElement} addContactName 
 * @param {HTMLElement} addContactMail 
 * @param {HTMLElement} addContactTel 
 */
function updateEditUser(user, addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel) {
    addContactTitel.innerHTML = 'Edit User';
    addContactSlogan.classList.add('hide');
    addContactImg.style = 'display: flex;';
    addContactMail.style = 'display: flex;';
    addContactTel.style = 'display: flex;';
    if (user.img === 'noImg') addContactImg.innerHTML = firstLetter(user.name);
    else addContactImg.innerHTML = `<img src="${user.img}">`;
    addContactButtons.innerHTML = editUserButtonsHTML();
    fillEditUserInputs(user, addContactName, addContactMail, addContactTel);
}

/**
 * @returns {HTMLElement} - buttons cancel and save
 */
function editUserButtonsHTML() {
    return /* html */ `
    <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="button" class="button" onclick="saveChangesUser()">Save</button>`;
}

/** fill the enpty inputs */
function fillEditUserInputs(user, addContactName, addContactMail, addContactTel) {
    addContactName.value = `${user.name}`;
    addContactMail.value = `${user.mail}`;
    addContactTel.value = `${user.password}`;
    addContactTel.placeholder = 'Password';
}

/** save the changes and show the banner */
async function saveChangesUser() {
    updateUser();
    closeAddContact();
    banner('User succesfully edited', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
    await backend.setItem('users', JSON.stringify(users));
}

/** save the changes */
function updateUser() {
    let user = returnActiveUser();
    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');
    user.name = addContactName.value;
    user.mail = addContactMail.value;
    user.password = addContactTel.value;
}

/**
 * @returns {JSON} - the active user
 */
function returnActiveUser() {
    let userNew = [];
    users.forEach((user) => user.name.includes(activeUser.name) && userNew.push(user));
    userNew = userNew[0];
    return userNew;
}