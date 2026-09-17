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


/* == MODALS == */
// Treba preuredit i izucit kako radi ne ovako dodavat napamet.

// ====== Projects Modal ====== //
const projects = {

    installations: [

        {
            id: 1,

            title: "House Electrical Installation",

            shortDescription:
                "Complete electrical installation for a family house.",

            description:
                "Complete electrical installation for a family house, including distribution panel, power outlets, lighting circuits and testing.",

            location: "Mostar, Bosnia and Herzegovina",

            date: "April 12, 2024",

            category: "Installations",

            image: "./assets/work-images/tab1.jpg",

            gallery: [
                "./assets/work-images/tab1.jpg",
                "./assets/work-images/tab2.jpg",
                "./assets/work-images/viber_image_2026-04-30_08-50-34-105.jpg"
            ],

            highlights: [
                "Distribution panel installation",
                "Complete wiring",
                "Indoor and outdoor lighting",
                "Safety testing"
            ]
        }
    ],

    lighting: [

        {
            id: 3,
            title: "Outdoor Lighting Installation",
            description: "Garden and facade lighting with LED solutions.",
            location: "Glavatičevo, Bosnia and Herzegovina",
            date: "July 21, 2023",
            image: "./assets/projects/lighting-main.jpg"
        }

    ],

    electronics: [

        {
            id: 4,
            title: "Smart Heat Controller",
            description: "ESP8266-based smart heating control system.",
            location: "Glavatičevo, Bosnia and Herzegovina",
            date: "2025",
            image: "./assets/projects/smartheat-main.jpg"
        }

    ]

};

const projectItems = document.querySelectorAll(".project-item");
projectItems.forEach(item => {

    item.addEventListener("click", () => {
        const category = item.dataset.category;
        openProjectsModal(category);
    });

});

const projectsModal = document.getElementById("projects-modal");
const projectsModalTitle = document.getElementById("projects-modal-title");
const projectsModalBody = document.getElementById("projects-modal-body");
const closeProjectsModalButton = document.getElementById("close-project-modal-button");

closeProjectsModalButton.addEventListener("click", () => {
    projectsModal.classList.remove("active");
});

function openProjectsModal(category) {

    const categoryProjects = projects[category];
    projectsModalBody.innerHTML = "";

    categoryProjects.forEach(project => {

        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        projectCard.innerHTML = `

            <img
                src="${project.image}"
                alt="${project.title}"
            >

            <div class="project-card-content">

                <p class="project-card-title">${project.title}</p>

                <p class="project-card-description">${project.description}</p>

                <div class="project-info">
                    <span>📍 ${project.location}</span>
                    <span>📅 ${project.date}</span>
                </div>

                <button
                    class="view-details"
                    data-id="${project.id}"
                    data-category="${category}">
                    View Details
                </button>

            </div>

        `;

        projectsModalBody.appendChild(projectCard);
    });

    projectsModalTitle.textContent =
        category.charAt(0).toUpperCase() +
        category.slice(1) +
        " Projects";

    projectsModal.classList.add("active");

}


// ====== Details Modal ====== //
document.addEventListener("click", event => {

    if (!event.target.classList.contains("view-details")) {
        return;
    }

    const id = Number(event.target.dataset.id);
    const category = event.target.dataset.category;

    const project = projects[category].find(
        project => project.id === id
    );

    openProjectDetails(project);

});

const detailsModal = document.getElementById("project-details-modal");
const closeProjectDetailsButton = document.getElementById("close-project-details-button");  

closeProjectDetailsButton.addEventListener("click", () => {
    detailsModal.classList.remove("active");
});

function openProjectDetails(project) {

    document.getElementById("details-title").textContent =
        project.title;

    document.getElementById("details-main-image").src =
        project.image;

    document.getElementById("details-location").textContent =
        "📍 " + project.location;

    document.getElementById("details-date").textContent =
        "📅 " + project.date;

    document.getElementById("details-description").textContent =
        project.description;


    // Gallery
    const gallery =
        document.getElementById("details-gallery");

    gallery.innerHTML = "";

    project.gallery.forEach(image => {

        const img = document.createElement("img");

        img.src = image;
        img.alt = project.title;

        gallery.appendChild(img);

    });


    const highlights =
        document.getElementById("details-highlights");

    highlights.innerHTML = "";

    project.highlights.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        highlights.appendChild(li);

    });

    projectsModal.classList.remove("active");
    detailsModal.classList.add("active");

}

const backToProjects = document.getElementById("back-to-projects-button");

backToProjects.addEventListener("click", () => {

    detailsModal.classList.remove("active");
    projectsModal.classList.add("active");

});