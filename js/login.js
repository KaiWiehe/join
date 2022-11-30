/** Überprüft den login, sind die eingegebenen werte richtig. wird ein user gefunden? */
async function login() {
    await backend.deleteItem('activeUser');

    let mail = document.getElementById('mail');
    let mailLow = mail.value.toLowerCase(); // damit die groß und kleinschreibung bei der E-Mail egal ist 
    let password = document.getElementById('password');
    let user = users.find(u => u.mail.toLowerCase() == mailLow && u.password == password.value); // duchsucht den array

    if (user) {
        await backend.setItem('activeUser', JSON.stringify(user)); //setzt den angemeldeten user
        console.log(`User gefunden`);
        window.location.href = `index.html?user=${user['name']}`;
    } else {
        let msgBox = document.getElementById('msgBox');
        msgBox.innerHTML = "Incorrect username or password.";
        password.style = "background: #ff000047;";
    }
}

function guestLogin() {} //TODO


/** leitet zur regestrierungsseite weiter */
function register() {
    window.location.href = 'register.html';
}

/** leitet wieder zur loginseite zurück */
function backToLogin() {
    window.location.href = 'login.html';
}

/** fügt einen User hinzu */
async function addUser() {
    debugger
    let registerName = document.getElementById('registerName');
    let registerMail = document.getElementById('registerMail');
    let registerPassword = document.getElementById('registerPassword');
    let registerImg = document.getElementById('imgSelect');

    users.push({ name: registerName.value, mail: registerMail.value, password: registerPassword.value, img: registerImg.value });
    addContact(registerName.value, registerMail.value, undefined, false)

    registerName.value = '';
    registerMail.value = '';
    registerPassword.value = '';

    console.log(users);

    await backend.setItem('users', JSON.stringify(users));

    window.location.href = 'login.html?msg=You have successfully registered!'; //leitet wieder zur loginseite, aber mit nachricht
}

/** Wenn es eine MSG im link gibt, zeige sie auch an */
function loadMSG() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    let msgBox = document.getElementById('msgBox');

    if (msg) {
        msgBox.innerHTML = msg;
    }
}

async function logOut() {
    await backend.setItem('activeUser', JSON.stringify([]));
    window.location.href = 'login.html';
}