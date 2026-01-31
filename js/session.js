import { Roles } from "./roles.js";

const ROLE_KEY = "current_role";

export function getCurrentRole() {
    return localStorage.getItem(ROLE_KEY) || Roles.ZADAVATEL;
}

export function setCurrentRole(role) {
    localStorage.setItem(ROLE_KEY, role);
}
