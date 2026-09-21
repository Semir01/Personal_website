document.addEventListener("DOMContentLoaded", () => {
    /* === MENU === */
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


    /* === SLIDER === */
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

/* === MODALS === */

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
            location: "Donje Selo, Bosnia and Herzegovina",
            date: "Novembar 4, 2025",
            category: "Installations",
            image: "./assets/work-images/electrician/instalations/project- family-home/image1.jpg",
            gallery: [
                "./assets/work-images/electrician/instalations/project- family-home/image1.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image2.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image3.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image4.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image5.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image6.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image7.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image8.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image9.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image10.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image11.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image12.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image13.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image14.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image15.jpg",
                "./assets/work-images/electrician/instalations/project- family-home/image16.jpg",
            ],
            highlights: [
                "Distribution panel installation",
                "Complete wiring",
                "Indoor and outdoor lighting",
                "Safety testing"
            ]
        },
        {
            id: 2,
            title: "Pool Pump Control System",
            shortDescription: "Automated control system for a swimming pool pump.",
            description: "Automated control system for a swimming pool pump, including timer and remote control.",
            location: "Džajići, Bosnia and Herzegovina",
            date: "June 2, 2026",
            category: "Installations",
            image: "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image7.jpg",
            gallery: [
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image1.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image2.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image3.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image4.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image5.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image6.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image7.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image8.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image9.jpg",
                "./assets/work-images/electrician/instalations/project-pool-pump-control-station/image10.jpg",
            ],
            highlights: [
                "Control panel installation",
                "Timer setup",
                "Remote control functionality"
            ]
        },
        {
            id: 3,
            title: "OG Store Electrical Installation",
            shortDescription: "Complete electrical installation for a commercial store.",
            description: "Complete electrical installation for a commercial store, including power outlets, lighting circuits and testing.",
            location: "Boračko jezero, Bosnia and Herzegovina",
            date: "February 21, 2026",
            category: "Installations",
            image: "./assets/work-images/electrician/instalations/project-og-store-instalation/image1.jpg",
            gallery: [
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image1.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image2.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image3.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image4.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image5.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image6.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image7.jpg",
                "./assets/work-images/electrician/instalations/project-og-store-instalation/image8.jpg",
            ],
            highlights: [
                "Complete wiring",
                "Lighting installation",
                "Power outlets installation",
                "Safety testing"
            ]
        }
    ],

    lighting: [

        {
            id: 1,
            title: "Modern Bus Lighting",
            shortDescription: "Complete modern bus lighting for family house.",
            description: "Complete modern bus lighting for a family house, including main bus instaling and adding different types od lights.",
            location:"Konjic, Bosnia and Herzegovina",
            date:"June 8, 2026",
            category:"Lighting",
            image:"./assets/work-images/electrician/lighting/project-modern-bus-lighting/image6.jpg",
            gallery: [
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image1.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image2.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image3.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image4.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image5.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image6.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image7.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image8.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image9.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image10.jpg",
                "./assets/work-images/electrician/lighting/project-modern-bus-lighting/image11.jpg",
            ],
            highlights: [
               "Complete mesuring and prepering",
               "Main bus instalation",
               "Adding types of lights",
               "Safety testing"
            ]
        }

    ],

    electronics: [

        {
            id: 1,
            title: "Smart Pool Pump Control System",
            shortDescription:"Complete smart system for a pool pump station",
            description: "Complete electrical instalation for the pump station. And Complete installing main smart system",
            location: "Glavatičevo, Bosnia and Herzegovina",
            date: "June 27, 2026",
            category:"Electronics",
            image: "./assets/work-images/electrician/eletronics/project-smart-pool-pump-control-system/image3.jpg",
            gallery: [
                "./assets/work-images/electrician/eletronics/project-smart-pool-pump-control-system/image1.jpg",
                "./assets/work-images/electrician/eletronics/project-smart-pool-pump-control-system/image2.jpg",
                "./assets/work-images/electrician/eletronics/project-smart-pool-pump-control-system/image3.jpg",
                "./assets/work-images/electrician/eletronics/project-smart-pool-pump-control-system/image4.jpg",
                "./assets/work-images/electrician/eletronics/project-smart-pool-pump-control-system/image5.jpg",
            ],
            highlights: [
                "Complete instalation",
                "Instaling smart components and conecting them",
                "Concecting whit WiFi and testing",
                "Safety testing"
            ]
        }

    ]

};

const projectsModal = document.getElementById("projects-modal");
const projectsModalTitle = document.getElementById("projects-modal-title");
const projectsModalBody = document.getElementById("projects-modal-body");
const closeProjectsModalButton = document.getElementById("close-project-modal-button");

const projectItems = document.querySelectorAll(".project-item");
projectItems.forEach(item => {
    item.addEventListener("click", () => {
        const category = item.dataset.category;
        openProjectsModal(category);
    });

});

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
                    <span> <img src="./assets/icones/gold-location.png" alt=""> ${project.location}</span>
                    <span> <img src="./assets/icones/gold-calendar.png" alt=""> ${project.date}</span>
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

    projectsModalTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1) + " Projects";
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

    document.getElementById("details-location").innerHTML = `
    <img src="./assets/icones/gold-location.png" alt="">
    ${project.location}`;

    document.getElementById("details-date").innerHTML = `
    <img src="./assets/icones/gold-calendar.png" alt="">
    ${project.date}`;

    document.getElementById("details-description").textContent = project.description;

    /* = Gallery = */
    const mainImage = document.getElementById("details-main-image");
    let currentImageIndex = 0;

    const gallery = document.getElementById("details-gallery");
    gallery.innerHTML = "";

    project.gallery.forEach((image, index) => {

        const img = document.createElement("img");

        img.src = image;
        img.alt = project.title;

        img.addEventListener("click", () => {
            currentImageIndex = index;
            mainImage.src = project.gallery[currentImageIndex];
        });

        gallery.appendChild(img);
    });

    const prevButton = document.getElementById("gallery-prev");
    const nextButton = document.getElementById("gallery-next");

    prevButton.addEventListener("click", () => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = project.gallery.length - 1;
        }
        mainImage.src = project.gallery[currentImageIndex];
    });

    nextButton.addEventListener("click", () => {
        currentImageIndex++;
        if (currentImageIndex >= project.gallery.length) {
            currentImageIndex = 0;
        }
        mainImage.src = project.gallery[currentImageIndex];
    });


    const imageShowModal = document.getElementById("image-show-modal");
    const imageShow = document.getElementById("image-show");
    const closeImageShow = document.getElementById("close-image-show-button");

    closeImageShow.addEventListener("click", ()=>{
        imageShowModal.classList.remove("active");
    })

    mainImage.addEventListener("click", () => {
       imageShowModal.classList.add("active");
       imageShow.src = mainImage.src;
    })



    const highlights = document.getElementById("details-highlights");
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