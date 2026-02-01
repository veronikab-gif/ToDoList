import { TaskManager } from "../js/app.js";

const manager = new TaskManager();
const tasks = manager.tasks;

renderPriorityPie();
renderStatusPie();

function renderPriorityPie() {
    const data = {
        "Vysoká": 0,
        "Střední": 0,
        "Nízká": 0
    };

    tasks.forEach(task => {
        if (data[task.priority] !== undefined) {
            data[task.priority]++;
        }
    });

    new Chart(document.getElementById("priorityPie"), {
        type: "pie",
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ["#ff6b6b", "#ffd93d", "#6bcf7f"],
                borderColor: "#ffffff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

function renderStatusPie() {
    const data = {
        "NOVÝ": 0,
        "REVIZE": 0,
        "ARCHIVOVANÝ": 0
    };

    tasks.forEach(task => {
        if (data[task.status] !== undefined) {
            data[task.status]++;
        }
    });

    new Chart(document.getElementById("statusPie"), {
        type: "pie",
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ["#4ecdc4", "#45b7d1", "#96ceb4"],
                borderColor: "#ffffff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}
