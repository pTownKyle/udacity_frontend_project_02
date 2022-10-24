// Variables
const header = document.querySelector('header'); // Get the Header
const navList = document.querySelector('nav ul'); // Get the Nav List
const mainContent = document.querySelector('main'); // Get Main Area
const sections = document.querySelectorAll('section'); // Get the Sections
const seenSections = []; // Track sections that have been seen
const jumpToTop = document.getElementById('jumpButton'); // Get Jump to Top Button

// Observer Setup
const setActive = (section) => {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const currentSection = entry.target;
                // Check if section is in Viewport
                if (entry.isIntersecting) {
                    currentSection.dataset.active = true; // Set Section Data-Active to True
                    currentSection.classList.add('active'); // Add Active Class to Section

                    // Hide Jump to Top Button
                    if (currentSection.id === 'featured') {
                        jumpToTop.style.opacity = 0;
                    } else {
                        jumpToTop.style.opacity = 100;
                    }

                    // Add current section to Nav; if not already there
                    if (!seenSections.includes(currentSection.id)) {
                        seenSections.push(currentSection.id);

                        // Create Nav Item
                        const li = document.createElement('li');
                        li.innerHTML = `<a href="#${currentSection.id}">${currentSection.dataset.sectionName}</a>`;

                        // Add Nav Item to Nav
                        navList.appendChild(li);
                    }

                    // Get All Nav Items
                    const navItems = document.querySelectorAll('nav li a');

                    // Toggle Nav Item Data-Active
                    navItems.forEach((navItem) => {
                        navItem.dataset.active =
                            navItem.getAttribute('href') ===
                            `#${currentSection.id}`
                                ? true
                                : false;
                    });
                } else {
                    currentSection.dataset.active = false; // Set Section Data-Active to False
                    currentSection.classList.remove('active'); // Remove Active Class from Section
                }
            });
        },
        {
            threshold: 0.1, // 20% of Section in Viewport to Trigger Snapping
        }
    );

    io.observe(section); // Observe Section
};

sections.forEach(setActive); // Loop through Sections

// Hide Nav on Scroll
mainContent.addEventListener('scroll', () => {
    // Get Active Section Container
    const activeSection = document.querySelector(
        'section[data-active="true"] .section_container'
    );
    let scrolling = false; // Track if user is scrolling
    scrolling = true;

    header.classList.add('hide'); // Hide Header
    activeSection.style.paddingTop = `${header.offsetHeight}px`; // Add Padding to Active Section

    // If user is not scrolling, show Header
    setInterval(() => {
        scrolling = false;
        header.classList.remove('hide');
    }, 2000);
});

// Padding for Active Section on Load
window.addEventListener('load', () => {
    setTimeout(() => {
        const activeSection = document.querySelector(
            'section[data-active="true"] .section_container'
        );
        activeSection.style.paddingTop = `${header.offsetHeight}px`;
    }, 1500);
});

// Smooth Scroll to Section
navList.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent Default
    const target = e.target.getAttribute('href'); // Get Target
    const section = document.querySelector(target); // Get Section
    const sectionContainer = section.querySelector('.section_container'); // Get Section Container

    // Scroll to Section
    sectionContainer.scrollIntoView({
        behavior: 'smooth',
    });
});

// Smooth Scroll to Top
jumpToTop.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent Default
    const target = e.target.getAttribute('href'); // Get Target
    const section = document.querySelector(target); // Get Section
    const sectionContainer = section.querySelector('.section_container'); // Get Section Container
    sectionContainer.scrollIntoView({
        behavior: 'smooth',
    });
});
