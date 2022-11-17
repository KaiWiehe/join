let alreadyExists = false;

function loadContacts() {
    let contactsContainer = document.getElementById('contactsContainer');
    let assignedToSelect = document.getElementById('assignedToSelect');
    contactsContainer.innerHTML = '';
    assignedToSelect.innerHTML = '';
    assignedToSelect.innerHTML = '<option value="" disabled selected hidden>Select contacts to assign</option>';

    contacts.forEach(contact => {
        contactsContainer.innerHTML += /* html */ `
        <div class="contactCard">
            ${contact.img}
            <div class="collum">
                <b>${contact.name}</b>
                <p>${contact.mail}</p>
            </div>
        </div>`;

        assignedToSelect.innerHTML += /* html */ `
        <option value="${contact.name}">${contact.name}</option>`;
    });


}

function openAddContact() {
    closeOrOpenAddContact(true);
}

function closeAddContact() {
    closeOrOpenAddContact(false);
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
    contacts = arrClean(contacts);
    await backend.setItem('contacts', JSON.stringify(contacts));

    loadContactsFunction && loadContacts();

    !alreadyExists && contactBanner('Contact succesfully created', "background: var(--leftGrey);");
}

/**
 * @param open true // for open addContact
 * @param open false // for close addContact
 */
function closeOrOpenAddContact(open) {
    let addContactContainer = document.getElementById('addContactContainer');
    open ? addContactContainer.classList.remove('hide') : addContactContainer.classList.add('hide');
}

/**
 * @param {Array} arr 
 * @returns Array without dublicates
 */
function arrClean(arr) {
    const data = arr;
    const set = new Set(data.map(item => JSON.stringify(item)));
    const dedup = [...set].map(item => JSON.parse(item));
    console.log(`Removed ${data.length - dedup.length} elements`);
    if (data.length - dedup.length > 0) {
        //if contact already exists
        contactBanner('Contact already exists!', "background: rgba(255, 0, 0, 0.538);");
        alreadyExists = true;
    }
    console.log(dedup);
    return dedup;
}

function contactBanner(string, style) {
    let contactAlreadyExistsContainer = document.getElementById('contactAlreadyExistsContainer');
    contactAlreadyExistsContainer.innerHTML = string;
    contactAlreadyExistsContainer.style = style;
    contactAlreadyExistsContainer.classList.remove('hide');
    setTimeout(() => {
        contactAlreadyExistsContainer.classList.add('hide');
    }, 1250);
}

async function deleteAllContacts() {
    contacts = [];
    await backend.setItem('contacts', JSON.stringify(contacts));
}