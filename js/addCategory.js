/** set all ids */
function openAddCategory() {
    openAddContactOrEdit();
    let addContactTitel = document.getElementById('addContactTitel');
    let addContactSlogan = document.getElementById('addContactSlogan');
    let addContactImg = document.getElementById('addContactImg');
    let addContactButtons = document.getElementById('addContactButtons');
    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactTel = document.getElementById('addContactTel');
    updateAddCategory(addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel);
}

/**
 * edit the card
 * @param {*} HTMLElement - addContactTitel 
 * @param {*} HTMLElement - addContactSlogan 
 * @param {*} HTMLElement - addContactImg 
 * @param {*} HTMLElement - addContactButtons 
 * @param {*} HTMLElement - addContactName 
 * @param {*} HTMLElement - addContactMail 
 * @param {*} HTMLElement - addContactTel 
 */
function updateAddCategory(addContactTitel, addContactSlogan, addContactImg, addContactButtons, addContactName, addContactMail, addContactTel) {
    addContactTitel.innerHTML = 'Add Category';
    addContactSlogan.classList.remove('hide');
    addContactImg.style = 'display: none;';
    addContactSlogan.style = 'display: none;';
    addContactButtons.innerHTML = `
    <button type="button" class=" whiteButton" onclick="closeAddContact()">Cancel</button>
    <button type="button" class="button" onclick="addCategoryForm()">Create Category</button>`;
    addContactName.value = ``;
    addContactMail.style = 'display: none;';
    addContactTel.style = 'display: none;';
}

function closeAddCategory() {
    closeAddContact();
}

/** fill the HTMLOption with the categorys*/
function loadCategorys() {
    let categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '';
    categorySelect.innerHTML = '<option value="" disabled selected hidden>Select task category</option>';
    categorys.forEach((category) => (categorySelect.innerHTML += categorySelectHTML(category)));
}

function categorySelectHTML(category) {
    return /* html */ `<option value="${category}">${category}</option>`;
}

/** take the value and passes it on */
function addCategoryForm() {
    let addCategoryTitel = document.getElementById('addContactName');
    addCategory(addCategoryTitel.value);
    addCategoryTitel.value = '';
}

/**
 * pushed the new category and del all dublicates
 * @param {*} string - addCategoryTitel.value
 */
async function addCategory(category) {
    categorys.push(category);
    categorys = arrClean(categorys, 'Category already exists!', 'categoryAlreadyExistsContainer');
    closeAddCategory();
    await backend.setItem('categorys', JSON.stringify(categorys));
    loadCategorys();
    !alreadyExists && banner('Category succesfully created', 'background: var(--leftGrey);', 'categoryAlreadyExistsContainer', 1250);
}