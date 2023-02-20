let alreadyExists = false;

/** fill the contact container with all contacts */
function loadContacts() {
    let contactsContainer = document.getElementById('contactsContainer');
    contactsContainer.innerHTML = '';
    contacts.forEach((contact, index) => (contactsContainer.innerHTML += contactsContainerHTML(contact, index)));
}

/**
 * @param {JSON} contact - the single contact
 * @param {number} index -the index of the contact
 * @returns {HTMLElement} - the div filled with the contact
 */
function contactsContainerHTML(contact, index) {
    return /* html */ `
    <div class="contactCard" id="contact${index}" onclick="showContactBig(${index})">
        ${contact.img}
        <div class="collum">
            <b>${contact.name}</b>
            <p>${contact.mail}</p>
        </div>
    </div>`;
}

function openAddContactOrEdit() {
    closeOrOpenAddContact(true);
}

function closeAddContact() {
    closeOrOpenAddContact(false);
}

/** open the window and rename the elements */
function openAddContact() {
    openAddContactOrEdit();
    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    updateAddContact(addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel);
}

/**
 * Rename the elements
 * @param {HTMLElement} addContactTitel 
 * @param {HTMLElement} addContactSlogan 
 * @param {HTMLElement} addContactImg 
 * @param {HTMLElement} addContactButtons 
 * @param {HTMLElement} addContactName 
 * @param {HTMLElement} addContactMail 
 * @param {HTMLElement} addContactTel 
 */
function updateAddContact(addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel) {
    addContactTitel.innerHTML = 'Add Contact';
    addContactSlogan.classList.remove('hide');
    addContactSlogan.style = 'display: flex;';
    addContactImg.style = 'display: flex;';
    addContactMail.style = 'display: flex;';
    addContactTel.style = 'display: flex;';
    addContactTel.placeholder = 'Phone';
    addContactImg.innerHTML = `<div class="noImg" id="addContactImg">?</div>`;
    addContactButtons.innerHTML = addContactButtonsHTML();
    addContactName.value = ``;
    addContactMail.value = ``;
    addContactTel.value = ``;
}

/**
 * @returns {HTMLElement} - buttons cancel and create contact
 */
function addContactButtonsHTML() {
    return `<button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="submit" class="button">Create contact</button>`;
}

/** 
 * if you click 'create contact' in the form
 * the contact is created
 * the inputs are emptied
 * and close the addContact window
 */
function addContactForm() {
    alreadyExists = false;

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');
    let el = [addContactName, addContactMail, addContactTel]

    addContact(addContactName.value, addContactMail.value, addContactTel.value, true);
    el.forEach(element => clearValue(element));
    closeOrOpenAddContact(false);
}

/**
 * 
 * @param {String} name - addContactName.value
 * @param {String} mail - addContactMail.value
 * @param {number} phone - addContactTel.value
 * @param {boolean} loadContactsFunction - true = loadContacts() | false = nothing
 * @param {string} registerImg - registerImg.value
 */
async function addContact(name, mail, phone, loadContactsFunction, registerImg) {
    let img;
    if (registerImg) img = `<img class="boardProfileImg" src="${registerImg}">`;
    else img = setImgFromAssignedToSelect(false, name);
    contacts.push({
        name: name,
        mail: mail,
        phone: phone,
        img: img,
    });
    contacts = arrClean(contacts, 'Contact already exists!', 'contactAlreadyExistsContainer');
    await backend.setItem('contacts', JSON.stringify(contacts));
    loadContactsFunction && loadContacts();
    !alreadyExists && banner('Contact succesfully created', 'background: var(--leftGrey);', 'contactAlreadyExistsContainer', 1250);
}

/**
 * @param {boolean} open true // for open addContact
 * @param {boolean} open false // for close addContact
 */
function closeOrOpenAddContact(open) {
    let addContactContainer = document.getElementById('addContactContainer');
    open ? addContactContainer.classList.remove('hide') : addContactContainer.classList.add('hide');
}

async function deleteAllContacts() {
    contacts = [];
    await backend.setItem('contacts', JSON.stringify(contacts));
}

/**
 * del contact on this position
 * reload contacts
 * and close contacts big
 * @param {number} number - the index of the contact
 */
async function delContact(number) {
    contacts.splice(number, 1);
    await backend.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
    let showContactBottom = document.getElementById('showContactBottom');
    showContactBottom.innerHTML = '';
    closeContactBig();
}

/**
 * opens the contact big window and fill it with the selectet contact
 * highlight the selected contact
 * @param {number} number - the index of the contact
 */
function showContactBig(number) {
    let showContactBottom = document.getElementById('showContactBottom');
    let contact = setContact(number);
    showContactBottom.innerHTML = contactBigHTML(contact, number);
    clearContactCardStyle();
    setContactCardStyle(number);

    let showContact = document.getElementById('showContact');
    showContact.style = 'display: block;';
}

/** close the contact big window and remove the highlight */
function closeContactBig() {
    let showContact = document.getElementById('showContact');
    showContact.style = 'display: none;';
    clearContactCardStyle();
}

/**
 * opens the edit contact window 
 * @param {number} number - the index of the contact
 */
function editContact(number) {
    let contact = setContact(number);
    openAddContactOrEdit();
    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');
    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    updateEditContact(number, contact, addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel);
}

/**
 * change the window to edit contact
 * @param {number} number - the index of the contact
 * @param {JSON} contact - the selectet contact
 * @param {HTMLElement} addContactTitel 
 * @param {HTMLElement} addContactSlogan 
 * @param {HTMLElement} addContactImg 
 * @param {HTMLElement} addContactButtons 
 * @param {HTMLElement} addContactName 
 * @param {HTMLElement} addContactMail 
 * @param {HTMLElement} addContactTel 
 */
function updateEditContact(number, contact, addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel) {
    addContactTitel.innerHTML = 'Edit Contact';
    addContactSlogan.classList.add('hide');
    addContactImg.style = 'display: flex;';
    addContactMail.style = 'display: flex;';
    addContactTel.style = 'display: flex;';
    addContactTel.placeholder = 'Phone';
    addContactImg.innerHTML = `${contact.img}`;
    addContactButtons.innerHTML = editContactButtonsHTML(number);
    addContactName.value = `${contact.name}`;
    addContactMail.value = `${contact.mail}`;
    addContactTel.value = `${contact.phone}`;
}

/**
 * @param {number} number - the index of the contact
 * @returns {HTMLElement} - buttons cancel and save
 */
function editContactButtonsHTML(number) {
    return /* html */ `
    <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="button" class="button" onclick="saveChanges(${number})">Save</button>`;
}

/**
 * save changes
 * reload contacts
 * show banner
 * @param {number} number - the index of the contact
 */
async function saveChanges(number) {
    updateContact(number);
    closeAddContact();
    loadContacts();
    showContactBig(number);
    banner('Contact succesfully edited', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
    await backend.setItem('contacts', JSON.stringify(contacts));
}

/**
 * change the contact
 * @param {number} number - the index of the contact
 */
function updateContact(number) {
    let contact = setContact(number);
    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');
    contact.name = addContactName.value;
    contact.mail = addContactMail.value;
    contact.phone = addContactTel.value;
}

/**
 * @param {number} number - the index of the contact you want
 * @returns {JSON} - the contact JSON
 */
function setContact(number) {
    return contacts[number];
}

/**
 * @param {JSON} contact - the contact JSON
 * @param {number} number - the index of the contact
 * @returns {HTMLElement} - contact big HTML
 */
function contactBigHTML(contact, number) {
    return /* html */ `
    <div class="nameAndImg">
        ${contact.img}
        <h3>${contact.name}</h3>
    </div>
    <div class="contactInfo">
        <h4>Contact Informations<h4>
        <p onclick="editContact(${number})"><img src="assets/img/editIcon.png">Edit contact</p>
    </div>
    <div class="contactInfos">
        <h4>E-Mail</h4>
        <p>${contact.mail}</p>
        <h4>Phone</h4>
        <p>${contact.phone}</p>
        <img src="assets/img/trash.svg" alt="delContact" class="trashImg" onclick="delContact(${number})">
    </div>`;
}

/** remove all highlights of the contacts */
function clearContactCardStyle() {
    contacts.forEach((contact, index) => (document.getElementById(`contact${index}`).style = ''));
}

/** 
 * highlight the selected contact 
 * @param {number} number - the index of the contact
 */
function setContactCardStyle(number) {
    let contactCard = document.getElementById(`contact${number}`);
    contactCard.style = 'background-color: var(--leftGrey);color: var(--white);';
}