/** Lädt das HTML Gerüßt */
function loadBacklog(task, b) {
    let img; //TODO img ist jetzt eine html struktur
    if (task["img"] != "undefined") {
        img = task["img"];
    } else {
        img = "assets/img/profileImg/image.svg";
    }
    backlogContainer.innerHTML += `
        <tr>
            <td id="backlogFirstTd${b}" class="backlogFirstTd">${img} ${task["AssignedTo"]}</td>
            <td>${task["category"]}</td>
            <td class="backlogLastTd">${task["titel"]}: ${task["description"]} (Status: ${capitalizeFirstLetter(task["process"])})</td>
        </tr>`;
}

/** Setzt die passende Farbe je nach zugewiesener Person */
function changeColor(i, task) {
    backlogFirstTd = document.getElementById(`backlogFirstTd${i}`);

    if (task["AssignedTo"] === "Kai") { // Wenn es Kai zugewiesen ist
        backlogFirstTd.style = "border-left: 0.25rem solid var(--bgPrimaryBlue);";
    } else if (task["AssignedTo"] === "Caro") { // Wenn es Caro zugewiesen ist
        backlogFirstTd.style = "border-left: 0.25rem solid green;";
    }
}

function changeCategoryColorBig(task) {
    let categoryBig = document.getElementById(`categoryBig${task.id}`);
    categoryBig.style = `background: ${task.categoryColor};`;
}