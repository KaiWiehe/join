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

async function guestLogin() {
    await backend.setItem('activeUser', JSON.stringify({
        img: 'noImg',
        mail: 'guest@mail.com',
        name: 'Guest',
        password: undefined
    }));
    window.location.href = `index.html?user=Guest`;
}


/** leitet zur regestrierungsseite weiter */
function register() {
    window.location.href = 'register.html';
}

/** leitet wieder zur loginseite zurück */
function backToLogin() {
    window.location.href = 'login.html';
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