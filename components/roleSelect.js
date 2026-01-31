import { Roles } from "../js/roles.js";
import { getCurrentRole, setCurrentRole } from "../js/session.js";

const select = document.getElementById("roleSelect");

select.value = getCurrentRole();

select.addEventListener("change", () => {
    setCurrentRole(select.value);
    location.reload();
});
