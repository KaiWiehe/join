let forgotPasswortUser = [];

/** Checks the values entered. If the values belong to a user, they are logged in */
async function login() {
	await backend.deleteItem("activeUser");
	let user = checkEnteredValues();
	if (user) {
		await backend.setItem("activeUser", JSON.stringify(user));
		window.location.href = `index.html?user=${user.name}`;
	} else {
		//error
		let msgBox = document.getElementById("msgBox");
		msgBox.innerHTML = "Incorrect username or password.";
		password.style = "background: #ff000047;";
	}
}

/** Checks the values entered. If the values belong to a user, return it */
function checkEnteredValues() {
	let mail = document.getElementById("mail");
	let mailLow = mail.value.toLowerCase(); // so that the e-mail is not case-sensitive
	let password = document.getElementById("password");
	let user = users.find(
		(u) => u.mail.toLowerCase() == mailLow && u.password == password.value
	);
	return user;
}

/** login as a guest */
async function guestLogin() {
	await backend.setItem(
		"activeUser",
		JSON.stringify({
			img: "noImg",
			mail: "guest@mail.com",
			name: "Guest",
			password: undefined,
		})
	);
	window.location.href = `index.html?user=Guest`;
}

/** redirects to the registration page */
function register() {
	window.location.href = "register.html";
}

/** redirects back to the login page */
function backToLogin() {
	window.location.href = "login.html";
}

/** If there is an MSG in the link, display it*/
function loadMSG() {
	let urlParams = new URLSearchParams(window.location.search);
	let msg = urlParams.get("msg");
	let msgBox = document.getElementById("msgBox");

	msg && (msgBox.innerHTML = msg);
}

/** del activeUser and go back to login.html */
async function logOut() {
	await backend.setItem("activeUser", JSON.stringify([]));
	window.location.href = "login.html";
}

/** show the forgetPassword window */
function showForgetPassword() {
	let loginContainer = document.getElementById("loginContainer");
	let forgotPasswort = document.getElementById("forgotPasswort");
	loginContainer.classList.add("hide");
	forgotPasswort.classList.remove("hide");
}

/** if the mail belongs to a user, forward to reset passwort else open mail not found */
function forgotPasswort() {
	let forgotPasswortMail = document.getElementById("forgotPasswortMail");
	forgotPasswortUser = returnForgotPasswortUser(forgotPasswortMail);
	if (forgotPasswortUser) openResetPasswort();
	else openEmailNotFound(forgotPasswortMail);
}

/**
 * if the mail belongs to a user, return this user
 * @param {HTMLElement} forgotPasswortMail
 * @returns {JSON} - the user with this mail
 */
function returnForgotPasswortUser(forgotPasswortMail) {
	let userNew = [];
	users.forEach(
		(user) =>
			user.mail
				.toLowerCase()
				.includes(forgotPasswortMail.value.toLowerCase()) &&
			userNew.push(user)
	);
	return userNew[0];
}

/** show 'E-Mail not found!' if the mail is not found */
function openEmailNotFound(forgotPasswortMail) {
	let forgotPasswortString = document.getElementById("forgotPasswortString");
	forgotPasswortMail.style = "background: #ff000047;";
	forgotPasswortString.innerHTML = `E-Mail not found!`;
}

/** open the reset passwort window */
function openResetPasswort() {
	let forgotPasswort = document.getElementById("forgotPasswort");
	let resetPasswort = document.getElementById("resetPasswort");
	forgotPasswort.classList.add("hide");
	resetPasswort.classList.remove("hide");
}

/** if the passwords are different change it, else openNotSamePasswort*/
function resetPasswort() {
	let resetPassword1 = document.getElementById("resetPassword1");
	let resetPassword2 = document.getElementById("resetPassword2");
	if (sameString(resetPassword1.value, resetPassword2.value))
		changePasswort(resetPassword1);
	else openNotSamePasswort(resetPassword1, resetPassword2);
}

/** show 'It's not the same passwort!' */
function openNotSamePasswort(resetPassword1, resetPassword2) {
	let resetPasswortString = document.getElementById("resetPasswortString");
	resetPassword1.style = "background: #ff000047;";
	resetPassword2.style = "background: #ff000047;";
	resetPasswortString.innerHTML = `It's not the same passwort!`;
}

/** set the new passwort and go back to login */
async function changePasswort(newPasswort) {
	forgotPasswortUser.password = newPasswort.value;
	forgotPasswortUser = [];
	await backend.setItem("users", JSON.stringify(users));
	openLogin();
}

/** show banner and go back to login */
function openLogin() {
	banner(
		"You reset your passwort!",
		"background: var(--leftGrey);",
		"categoryAlreadyExistsContainer",
		1250
	);
	setTimeout(
		() =>
			(window.location.href = "login.html?msg=You reset your passwort!"),
		500
	);
}
