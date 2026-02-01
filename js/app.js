import { Task } from "./task.js";
import { Storage } from "./storage.js";

export class TaskManager {
    constructor() {
        this.tasks = Storage.load();
    }

    createTask(title, description, priority, tags) {
        const id = Date.now().toString();
        const newTask = new Task(id, title, description, priority, tags);
        this.tasks.push(newTask);
        Storage.save(this.tasks);
    }
}

