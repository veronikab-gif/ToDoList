import { Task } from "./task.js";

export class Storage {
    static STORAGE_KEY = "úkolníček_data";

    static save(tasks) {
        const data = JSON.stringify(tasks); //uloží jako JSON text
        localStorage.setItem(this.STORAGE_KEY, data);    
    }

    static load() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return [];
        try {
            const jsonTask = JSON.parse(data); //převede zpět do js
            return jsonTask.map (t => new Task(
                t.id,
                t.title,   
                t.description,
                t.priority,
                t.tags,
                t.status,
                t.reviewerNote,
                new Date(t.createdAt),
                new Date(t.updatedAt)
            ));
        }
        catch (error) {
            console.error("Chyba při načítání dat", error);
            return [];
        }
    }
}


