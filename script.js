document.addEventListener("DOMContentLoaded", () => {
    /* == MENU == */
    fetch("menu.html")                          // Assuming menu.html is in the same directory as the current page
        .then(response => response.text())      // Convert the response to text
        .then(data => {                         // Insert the menu HTML into the page

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

            // Highlight active menu item
            const links = document.querySelectorAll(".menu-item a");
            let curentPage = window.location.pathname.split("/").pop();

            if (curentPage === "") {
                curentPage = "index.html";
            }

            links.forEach(link => {

                if (link.getAttribute("href") === curentPage) {
                    console.log("Active link:", link);
                    link.parentElement.classList.add("active");
                }
            });
        })
        .catch(error => console.error("Error loading menu:", error));   // Handle errors in loading the menu


    /* == MODALS == */
    const closeModalTrigger = document.getElementById("close-modal-trigger");
    const installationsModalTrigger = document.getElementById("installations-modal-trigger");
    const installationsModal = document.getElementById("installations-modal");

    if (installationsModalTrigger) {
        installationsModalTrigger.addEventListener("click", () => {
            installationsModal.classList.add("active");
        });
    }

    if (closeModalTrigger) {
        closeModalTrigger.addEventListener("click", () => {
            installationsModal.classList.remove("active");
        });
    }


    /* == DROPDOWN == */
    const dropdownTrigger = document.querySelector(".project-card-click");
    const dropdownContent = document.querySelector(".project-no1-info");

    if (dropdownTrigger) {
        dropdownTrigger.addEventListener("click", () => {
            dropdownContent.classList.toggle("active");
        });
    }

    /* == SLIDER == */
    const wrapper = document.querySelector(".slide-wrapper");
    const indicators = document.querySelectorAll(".indicator");

    let curentSlide = 0;

    function showSlide(index) {
        wrapper.style.transform = `translateX(-${index * 100}%)`;      // Move the wrapper to show the selected slide

        indicators.forEach(ind => ind.classList.remove('active'));     // Remove active class from all indicators
        indicators[index].classList.add('active');

        curentSlide = index;
    }

    indicators.forEach((indicator, i) => {                             // Add click event listener to each indicator
        indicator.addEventListener('click', () => {
            showSlide(i);
        });
    });

    showSlide(0);

    /* Swipe functionality for mobile devices */
    let startX = 0;
    let endX = 0;

    wrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;     // Get the starting X coordinate of the touch    
    });

    wrapper.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX; // Get the ending X coordinate of the touch
        handleSwipe();
    });

    function handleSwipe() {
        let diff = startX - endX;

        if (diff > 50) {
            let next = (curentSlide + 1) % indicators.length;  // Calculate the next slide index (wrap around to the beginning)
            showSlide(next);
        } else if (diff < -50) {
            let prev = (curentSlide - 1 + indicators.length) % indicators.length;   // Calculate the previous slide index (wrap around to the end)
            showSlide(prev);
        }
    }
})

