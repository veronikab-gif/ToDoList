export class Task {
    constructor(id, title, description, priority, tags = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = "NOVÝ";
        this.reviewerNote = "";
        this.priority = priority;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.tags = tags;
    }

    updateStatus (newStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

}