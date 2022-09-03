//async function init() {
//    await includeHTML();
//    //document.getElementById('headline').innerHTML = 'Herzlich Willkommen!';
//}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); // Suche nach allem was dieses Atribut hat
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];

        let file = element.getAttribute("w3-include-html"); // "includes/header.html" Die Zeile ließt den Wert aus, also die header.html
        let resp = await fetch(file); // Lade die Datei herunter

        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found 😒';
        }
    }
}