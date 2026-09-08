/*  ============================ Variables ============================  */
console.log("NAV.JS UCITAN");
/* Navigation Elements */
const dropDown = document.getElementById("drop-down-menu-section");

/* Button Elements */
const btnDropDownMenu = document.getElementById("btnDropDownMenu");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM UCITAN");

    const navContainer = document.getElementById("nav-placeholder");
    if (!navContainer) return;

    fetch("nav.html")
        .then(res => res.text())
        .then(data => {

            navContainer.innerHTML = data;

            const btn = document.getElementById("btnDropDownMenu");
            const drop = document.getElementById("drop-down-menu-section");

            console.log("BTN:", btn);
            console.log("DROP:", drop);

            if (btn && drop) {
                btn.addEventListener("click", () => {
                    drop.style.display =
                        drop.style.display === "none" ? "flex" : "none";
                });
            }

            // Postavi aktivnu stranicu
            NewSetActivePage();


        })
        .catch(err => console.error("Greška pri učitavanju navigacije:", err));
});

// Funkcija za aktivnu stranicu
function SetActivePage() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-item");
    const navIcons = document.querySelectorAll(".nav-icon");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href && href.includes(currentPage));
    });

    navIcons.forEach(icon => {
        const href = icon.getAttribute("href");
        icon.classList.toggle("active", href && href.includes(currentPage));
    });
}


function NewSetActivePage(){
    const allLinks = document.querySelectorAll(".nav-item, .drop-down-menu a");

    // uzimamo ime trenutne stranice
    let currentPage = window.location.pathname.split("/").pop();

    // Ako je URL prazan (https://username.github.io/)
    if (currentPage === "" || currentPage === "/") {
        currentPage = "index.html";
    }

    console.log("Aktivna stranica:", currentPage);

    allLinks.forEach(link => {
        const linkHref = link.getAttribute("href");

        if (linkHref === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}