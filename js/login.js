/** lädt die Users.json herunter */
//async function loadUserJSON() {
//    let resp = await fetch('./users.json');
//    if (resp.ok) { //all good
//        users = await resp.json();
//        console.log(users);
//    } else { //error
//        alert("JSON not found 😒")
//        console.error("JSON not found 😒")
//    }
//}

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
        window.location.href = `index.html?user=${user["name"]}`;
    } else {
        let msgBox = document.getElementById('msgBox');
        msgBox.innerHTML = "Incorrect username or password.";
        password.style = "background: #ff000047;";
    }
}

function guestLogin() {}

/** zeigt die startseite Summary an sobalt man sich erfolgreich angemeldet hat */
function showSummary() {
    let summary = document.getElementById('summary');
    summary.classList.remove('hide');
}

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
    let registerName = document.getElementById('registerName');
    let registerMail = document.getElementById('registerMail');
    let registerPassword = document.getElementById('registerPassword');

    users.push({ name: registerName.value, mail: registerMail.value, password: registerPassword.value, img: "assets/img/image.svg" });

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