import { TaskManager } from "../js/app.js";
import { getCurrentRole } from "../js/session.js";
import { Roles } from "../js/roles.js";

const manager = new TaskManager();
const tbody = document.getElementById("taskTableBody");
let role = getCurrentRole();

// Refresh seznam když se změní role
const roleSelect = document.getElementById("roleSelect");
if (roleSelect) {
    roleSelect.addEventListener("change", () => {
        role = getCurrentRole();
        renderTaskList();
    });
}

renderTaskList();

function renderTaskList() {
    const tasks = manager.tasks;
    tbody.innerHTML = "";

    if (tasks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 20px;">Žádné úkoly zatím nejsou.</td>
            </tr>
        `;
        return;
    }

    tasks.forEach(task => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>${formatDate(task.createdAt)}</td>
            <td>${task.tags.join(", ")}</td>
            <td>${task.status}</td>
            <td>${formatDate(task.updatedAt)}</td>
            <td class="notes-column">
                ${renderReviewerNotes(task)}
            </td>
            <td class="actions-column"></td>
        `;

        // Akční tlačítka do sloupce AKCE
        const actionsCell = tr.querySelector("td.actions-column");
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");

        // ZADAVATEL – označit jako revizi
        if (role === Roles.ZADAVATEL && task.status !== "ARCHIVOVANÝ") {
            const reviseBtn = document.createElement("button");
            reviseBtn.textContent = "Revize";
            reviseBtn.classList.add("btn", "btn-warning", "btn-sm");

            reviseBtn.addEventListener("click", () => {
                reviseTask(task.id);
            });

            actionsDiv.appendChild(reviseBtn);
        }

        // SCHVALOVATEL – schválit úkol (Revize → Archivovaný)
        if (role === Roles.SCHVALOVATEL && task.status === "REVIZE") {
            const approveBtn = document.createElement("button");
            approveBtn.textContent = "Schválit";
            approveBtn.classList.add("btn", "btn-success", "btn-sm");

            approveBtn.addEventListener("click", () => {
                approveTask(task.id);
            });

            actionsDiv.appendChild(approveBtn);

            // Tlačítko zamítnutí
            const rejectBtn = document.createElement("button");
            rejectBtn.textContent = "Zamítnout";
            rejectBtn.classList.add("btn", "btn-danger", "btn-sm");

            rejectBtn.addEventListener("click", () => {
                const comment = prompt("Zadej důvod zamítnutí:");
                if (comment !== null) {
                    rejectTask(task.id, comment);
                }
            });

            actionsDiv.appendChild(rejectBtn);
        }

        // SCHVALOVATEL – smazat archivovaný úkol
        if (role === Roles.SCHVALOVATEL && task.status === "ARCHIVOVANÝ") {
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Smazat";
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm");

            deleteBtn.addEventListener("click", () => {
                const confirmed = confirm("Opravdu chceš archivovaný úkol smazat?");
                if (confirmed) {
                    deleteTask(task.id);
                }
            });

            actionsDiv.appendChild(deleteBtn);
        }

        if (actionsDiv.children.length > 0) {
            actionsCell.appendChild(actionsDiv);
        }

        tbody.appendChild(tr);
    });
}

// akce

function formatDate(date) {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("cs-CZ") + " " + d.toLocaleTimeString("cs-CZ");
}

function renderReviewerNotes(task) {
    if (!task.reviewerNotes || task.reviewerNotes.length === 0) {
        return "-";
    }

    let html = "<div class='reviewer-notes-compact'>";
    task.reviewerNotes.forEach(note => {
        const date = new Date(note.timestamp).toLocaleString("cs-CZ");
        html += `<div class='reviewer-note-item'><strong>${date}:</strong> ${note.text}</div>`;
    });
    html += "</div>";
    return html;
}

function approveTask(id) {
    const task = manager.tasks.find(t => t.id === id);
    if (!task) return;

    task.status = "ARCHIVOVANÝ";
    task.updatedAt = new Date();
    localStorage.setItem("úkolníček_data", JSON.stringify(manager.tasks));
    renderTaskList();
}

function rejectTask(id, comment) {
    const task = manager.tasks.find(t => t.id === id);
    if (!task) return;

    task.updatedAt = new Date();
    task.status = "NOVÝ";
    // Přidat nový komentář do historie
    task.reviewerNotes.push({
        text: comment,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem("úkolníček_data", JSON.stringify(manager.tasks));
    renderTaskList();
}

function deleteTask(id) {
    manager.tasks = manager.tasks.filter(t => t.id !== id);
    localStorage.setItem("úkolníček_data", JSON.stringify(manager.tasks));
    renderTaskList();
}

function reviseTask(id) {
    const task = manager.tasks.find(t => t.id === id);
    if (!task) return;

    task.status = "REVIZE";
    task.updatedAt = new Date();
    localStorage.setItem("úkolníček_data", JSON.stringify(manager.tasks));
    renderTaskList();
}

