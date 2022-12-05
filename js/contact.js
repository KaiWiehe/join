let alreadyExists = false;

function loadContacts() {
    let contactsContainer = document.getElementById('contactsContainer');
    contactsContainer.innerHTML = '';

    contacts.forEach((contact, index) => {
        contactsContainer.innerHTML += /* html */ `
        <div class="contactCard" id="contact${index}" onclick="showContactBig(${index})">
            ${contact.img}
            <div class="collum">
                <b>${contact.name}</b>
                <p>${contact.mail}</p>
            </div>
        </div>`;
    });
}

function openAddContactOrEdit() {
    closeOrOpenAddContact(true);
}

function closeAddContact() {
    closeOrOpenAddContact(false);
}

function openAddContact() {
    openAddContactOrEdit();

    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    addContactTitel.innerHTML = 'Add Contact';
    addContactSlogan.classList.remove('hide');
    addContactSlogan.style = "display: flex;";
    addContactImg.style = "display: flex;";
    addContactMail.style = "display: flex;";
    addContactTel.style = "display: flex;";
    addContactTel.placeholder = "Phone";
    addContactImg.innerHTML = `<div class="noImg" id="addContactImg">?</div>`;
    addContactButtons.innerHTML = `
    <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="submit" class="button">Create contact</button>`;

    addContactName.value = ``;
    addContactMail.value = ``;
    addContactTel.value = ``;
}

function addContactForm() {
    alreadyExists = false;

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    addContact(addContactName.value, addContactMail.value, addContactTel.value, true);

    addContactName.value = '';
    addContactMail.value = '';
    addContactTel.value = '';

    closeOrOpenAddContact(false);
}

async function addContact(name, mail, phone, loadContactsFunction) {
    contacts.push({
        name: name,
        mail: mail,
        phone: phone,
        img: setImgFromAssignedToSelect(false, name)
    })
    contacts = arrClean(contacts, 'Contact already exists!', 'contactAlreadyExistsContainer');
    await backend.setItem('contacts', JSON.stringify(contacts));

    loadContactsFunction && loadContacts();

    !alreadyExists && banner('Contact succesfully created', "background: var(--leftGrey);", 'contactAlreadyExistsContainer', 1250);
}

/**
 * @param open true // for open addContact
 * @param open false // for close addContact
 */
function closeOrOpenAddContact(open) {
    let addContactContainer = document.getElementById('addContactContainer');
    open ? addContactContainer.classList.remove('hide') : addContactContainer.classList.add('hide');
}

async function deleteAllContacts() {
    contacts = [];
    await backend.setItem('contacts', JSON.stringify(contacts));
}

async function delContact(number) {
    contacts.splice(number, 1);
    await backend.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
    let showContactBottom = document.getElementById('showContactBottom');
    showContactBottom.innerHTML = '';
}

function showContactBig(number) {
    let showContactBottom = document.getElementById('showContactBottom');
    let contact = setContact(number);
    showContactBottom.innerHTML = contactBigHTML(contact, number);
    clearContactCardStyle();
    setContactCardStyle(number);

    let showContact = document.getElementById('showContact');
    showContact.style = "display: block;"
}

function closeContactBig() {
    let showContact = document.getElementById('showContact');
    showContact.style = "display: none;"
    clearContactCardStyle();
}

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

    addContactTitel.innerHTML = 'Edit Contact';
    addContactSlogan.classList.add('hide');
    addContactImg.style = "display: flex;";
    addContactMail.style = "display: flex;";
    addContactTel.style = "display: flex;";
    addContactTel.placeholder = "Phone";
    addContactImg.innerHTML = `${contact.img}`;
    addContactButtons.innerHTML = /* html */ `
    <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="button" class="button" onclick="saveChanges(${number})">Save</button>`;

    addContactName.value = `${contact.name}`;
    addContactMail.value = `${contact.mail}`;
    addContactTel.value = `${contact.phone}`;
}

async function saveChanges(number) {
    let contact = setContact(number);

    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');

    contact.name = addContactName.value;
    contact.mail = addContactMail.value;
    contact.phone = addContactTel.value;

    closeAddContact();
    loadContacts();
    showContactBig(number)
    banner('Contact succesfully edited', "background: var(--leftGrey);", 'categoryAlreadyExistsContainer', 1250);
    await backend.setItem('contacts', JSON.stringify(contacts));
}

function setContact(number) {
    return contacts[number];
}

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

function clearContactCardStyle() {
    contacts.forEach((contact, index) => {
        let contactCard = document.getElementById(`contact${index}`);
        contactCard.style = '';
    })
}

function setContactCardStyle(number) {
    let contactCard = document.getElementById(`contact${number}`);
    contactCard.style = 'background-color: var(--leftGrey);color: var(--white);';
}