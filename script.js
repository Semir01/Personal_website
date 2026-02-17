document.addEventListener("DOMContentLoaded", () => {

    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu").innerHTML = data;
            const menuIcon = document.querySelector(".menu-icon");
            const menuContainer = document.querySelector(".menu-container");
            const overlayer = document.querySelector(".overlayer");

            menuIcon.addEventListener("click", () => {
                menuContainer.classList.toggle("active");
                overlayer.classList.toggle("active");
            });

            overlayer .addEventListener("click", () => {
                menuContainer.classList.remove("active");
                overlayer.classList.remove("active");
            });
        })
        .catch(error => console.error("Error loading menu:", error));
})