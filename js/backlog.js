/** Lädt das HTML Gerüßt */
function loadBacklog() {
    backlog.forEach((element, index) => {
        backlogContainer.innerHTML += `
    <tr>
        <td id="backlogFirstTd${index}" class="backlogFirstTd">${element.img} ${element.AssignedTo}</td>
        <td>${element.category}</td>
        <td class="backlogLastTd">${element.titel}: ${element.description} (Status: ${capitalizeFirstLetter(element.process)})</td>
    </tr>`;
    });
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