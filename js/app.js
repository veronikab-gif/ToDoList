import { Task } from "./task.js";
import { Storage } from "./storage.js";

class TaskManager { 
    constructor() { 
        this.tasks = Storage.load(); 
        this.taskListElement = document.getElementById('taskList'); 
        this.render();
    } 

    createTask(title, description, priority, tags) {
        const id = Date.now().toString(); //ID bude datum ve stringu
        const newTask = new Task(id, title, description, priority, tags);

        this.tasks.push(newTask);
        this.saveAndRender();    
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveAndRender();
    }

    saveAndRender() { //uloží a znovu vykreslí
        Storage.save(this.tasks);
        this.render();
    }

    render() { 
        this.taskListElement.innerHTML = ""; //vyčistí předchozí obsah
        this.tasks.forEach(t => {
            const taskCard = document.createElement("div");
            taskCard.className = `card mb-3 task-priority`; //přidá třídu card z bootstrapu

            taskCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"> ${t.title} <span class="badge bg-info">${t.status}</span> </h5>
                <p class="card-text"> ${t.description}</p>
                <p class="small text-muted">Priorita: ${t.priority}</p>
                <button class="btn btn-danger btn.sm" onclick="app.deleteTask('${t.id}')">Smazat</button>
            </div>`;

            this.taskListElement.appendChild(taskCard); //přidá kartu do seznamu
        });
    }
}

const app = new TaskManager();
window.app = app;
