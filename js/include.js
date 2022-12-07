/** Adds the paged HTML files to the page */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); // Search for anything that has this attribute
    for (const element of includeElements) {
        let file = element.getAttribute('w3-include-html'); // "includes/header.html" Die Zeile ließt den Wert aus, also die header.html
        let resp = await fetch(file); // Download the file
        if (resp.ok) element.innerHTML = await resp.text();
        else element.innerHTML = 'Page not found!';
    }
}