document.addEventListener("DOMContentLoaded", () => {
    // MENU
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

            overlayer.addEventListener("click", () => {
                menuContainer.classList.remove("active");
                overlayer.classList.remove("active");
            });
        })
        .catch(error => console.error("Error loading menu:", error));


    // SLIDER

    const wrapper = document.querySelector(".slide-wrapper");
    const indicators = document.querySelectorAll(".indicator");

    let curentSlide = 0;

    function showSlide(index) {
        wrapper.style.transform = `translateX(-${index * 100}%)`;

        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');

        curentSlide = index;
    }

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            showSlide(i);
        });
    });

    showSlide(0);
})

