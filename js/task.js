export class Task {
    constructor(id, title, description, priority, tags = [], status = "NOVÝ", reviewerNotes = [], createdAt = null, updatedAt = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.reviewerNotes = reviewerNotes; // historie poznámek s timestamp
        this.priority = priority;
        this.createdAt = createdAt ? new Date(createdAt) : new Date(); // fix timestampů
        this.updatedAt = updatedAt ? new Date(updatedAt) : new Date(); // fix timestampů
        this.tags = tags;
    }

    updateStatus (newStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

}