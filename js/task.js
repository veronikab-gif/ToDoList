export class Task {
    constructor(id, title, description, priority, tags = [], status = "NOVÝ") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.reviewerNotes = []; // Historie poznámek s timestamp
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