import { getCurrentRole, setCurrentRole } from "../js/session.js";

const select = document.getElementById("roleSelect");

select.value = getCurrentRole();

select.addEventListener("change", () => {
    setCurrentRole(select.value);
    location.reload();
});
