import { TaskManager } from "../js/app.js";

const manager = new TaskManager();

const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityButtons = document.querySelectorAll(".priority button");
const selectedTags = new Set();
const tagsContainer = document.querySelector(".tags");
const tagButtons = document.querySelectorAll(".tags button");
const CUSTOM_TAGS_KEY = "custom_tags";

let selectedPriority = "Střední"; // výchozí priorita
priorityButtons.forEach(button => {
    button.addEventListener("click", () => {
        priorityButtons.forEach(btn => btn.classList.remove("selected"));
        selectedPriority = button.textContent;
        button.classList.add("selected");
    });
});

function toggleTagSelection(button) {
    const tag = button.textContent;

    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        button.classList.remove("active");
    } else {
        selectedTags.add(tag);
        button.classList.add("active");
    }
}

tagButtons.forEach(button => {
    button.addEventListener("click", () => toggleTagSelection(button));
});

function createCustomTagButton(label, color, isActive = false) {
    const newTagButton = document.createElement("button");
    newTagButton.type = "button";
    newTagButton.textContent = label;
    newTagButton.classList.add("custom-tag");
    newTagButton.style.backgroundColor = color;
    newTagButton.style.borderColor = color;
    newTagButton.style.color = "#ffffff";

    if (isActive) {
        newTagButton.classList.add("active");
        selectedTags.add(label);
    }

    newTagButton.addEventListener("click", () => toggleTagSelection(newTagButton));
    return newTagButton;
}

function loadCustomTags() {
    const data = localStorage.getItem(CUSTOM_TAGS_KEY);
    if (!data) return;

    try {
        const savedTags = JSON.parse(data);
        if (!Array.isArray(savedTags)) return;

        const existingLabels = new Set(
            Array.from(document.querySelectorAll(".tags button")).map(btn => btn.textContent)
        );

        savedTags.forEach(tag => {
            if (!tag || !tag.label || existingLabels.has(tag.label)) return;
            const btn = createCustomTagButton(tag.label, tag.color || "#128fe2");
            tagsContainer.appendChild(btn);
        });
    } catch {
        // kdyby JSON šel špatně, appka nespadne
        console.error("Chyba při načítání vlastních štítků");
    }
}

function saveCustomTags() {
    const customButtons = Array.from(tagsContainer.querySelectorAll("button.custom-tag"));
    const data = customButtons.map(btn => ({
        label: btn.textContent,
        color: btn.style.backgroundColor || "#128fe2"
    }));
    localStorage.setItem(CUSTOM_TAGS_KEY, JSON.stringify(data));
}

loadCustomTags();

const customTagInput = document.getElementById("customTagInput");
const customTagColorInput = document.getElementById("customTagColor");
const addCustomTagButton = document.getElementById("addCustomTag");

addCustomTagButton.addEventListener("click", () => {
    const value = customTagInput.value.trim();
    if (!value) return;

    const color = customTagColorInput ? customTagColorInput.value : "#128fe2";

    const existingLabels = new Set(
        Array.from(document.querySelectorAll(".tags button")).map(btn => btn.textContent)
    );
    if (existingLabels.has(value)) {
        customTagInput.value = "";
        return;
    }

    const newTagButton = createCustomTagButton(value, color, true);
    tagsContainer.appendChild(newTagButton);
    saveCustomTags();
    customTagInput.value = "";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("SUBMIT OK"); //  test
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

     if (!title) {
        alert("Zadej název úkolu");
        return;
    }

    const tagsArray = Array.from(selectedTags); 
    manager.createTask(title, description, selectedPriority, tagsArray);
    form.reset();
    selectedTags.clear();
    priorityButtons.forEach(btn => btn.classList.remove("selected"));
    tagButtons.forEach(btn => btn.classList.remove("active"));
    selectedPriority = "Střední";
    document.querySelectorAll(".active")
        .forEach(el => el.classList.remove("active"));
    alert("Úkol byl přidán");
});