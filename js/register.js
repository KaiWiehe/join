/** adds a user */
async function addUser() {
    let registerName = document.getElementById('registerName');
    let registerMail = document.getElementById('registerMail');
    let registerPassword = document.getElementById('registerPassword');
    let registerImg = document.getElementById('imgSelect');

    users.push({ name: registerName.value, mail: registerMail.value, password: registerPassword.value, img: registerImg.value });
    addContact(registerName.value, registerMail.value, undefined, false);

    clearAddUserValue(registerName, registerMail, registerPassword);
    await backend.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html?msg=You have successfully registered!';
}

function clearAddUserValue(registerName, registerMail, registerPassword) {
    registerName.value = '';
    registerMail.value = '';
    registerPassword.value = '';
}