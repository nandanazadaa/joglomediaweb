    AOS.init({
        once: false, // Allow animations to replay when scrolling back
        offset: 100, // Trigger animations earlier
        duration: 1000, // Smooth duration
        easing: 'ease-out', // Smoother easing
    });
    // Add scroll event listener to change navbar background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const mainSection = document.querySelector('.hero');
        if (window.scrollY > mainSection.offsetHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

// Main Category Filter functionality
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const subcategoryFilters = document.getElementById('subcategory-filters');
    const websiteProjectsContainer = document.querySelector('#website-projects .grid');
    const aplikasiProjectsContainer = document.querySelector('#aplikasi-projects .grid');
    const mainGrid = document.getElementById('main-grid');
    const websiteSection = document.getElementById('website-projects');
    const aplikasiSection = document.getElementById('aplikasi-projects');
    const aplikasiHeading = aplikasiSection.querySelector('h3');

    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all main filter buttons
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked main filter button
            button.classList.add('active');

            const mainFilterValue = button.getAttribute('data-main-filter');

            // Show/hide subcategory filters with animation
            if (mainFilterValue === 'website') {
                subcategoryFilters.classList.remove('hidden');
                // Reset subcategory filter to 'all'
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                allFilterBtn.classList.add('active');
            } else {
                subcategoryFilters.classList.add('hidden');
            }

            // Clear containers
            websiteProjectsContainer.innerHTML = '';
            aplikasiProjectsContainer.innerHTML = '';
            mainGrid.innerHTML = '';

            // Hide both sections by default
            websiteSection.classList.add('hidden');
            aplikasiSection.classList.add('hidden');
            mainGrid.classList.add('hidden');

            if (mainFilterValue === 'website') {
                // Show website section with heading
                websiteSection.classList.remove('hidden');
                aplikasiSection.classList.add('hidden');
                mainGrid.classList.add('hidden');
                // Populate website projects based on active subcategory filter
                const activeSubFilter = document.querySelector('.filter-btn.active').getAttribute(
                    'data-filter');
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    const subCategory = card.getAttribute('data-category');
                    if (mainCategory === 'website' && (activeSubFilter === 'all' ||
                            subCategory === activeSubFilter)) {
                        const clonedCard = card.cloneNode(true);
                        websiteProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            } else if (mainFilterValue === 'aplikasi') {
                // Hide both sections, show main grid without heading
                websiteSection.classList.add('hidden');
                aplikasiSection.classList.add('hidden');
                mainGrid.classList.remove('hidden');
                // Populate aplikasi projects in main grid
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    if (mainCategory === 'aplikasi') {
                        const clonedCard = card.cloneNode(true);
                        mainGrid.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            }

            AOS.refresh();
        });
    });

    // Subcategory Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all subcategory filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked subcategory filter button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Clear containers
            websiteProjectsContainer.innerHTML = '';
            aplikasiProjectsContainer.innerHTML = '';
            mainGrid.innerHTML = '';

            // Show sections based on filter
            if (filterValue === 'all') {
                // Show both sections with headings
                websiteSection.classList.remove('hidden');
                aplikasiSection.classList.remove('hidden');
                mainGrid.classList.add('hidden');
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    const clonedCard = card.cloneNode(true);
                    if (mainCategory === 'website') {
                        websiteProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    } else if (mainCategory === 'aplikasi') {
                        aplikasiProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            } else {
                // Show only website section for subcategory filters
                websiteSection.classList.remove('hidden');
                aplikasiSection.classList.add('hidden');
                mainGrid.classList.add('hidden');
                projectCards.forEach(card => {
                    const mainCategory = card.getAttribute('data-main-category');
                    const subCategory = card.getAttribute('data-category');
                    if (mainCategory === 'website' && subCategory === filterValue) {
                        const clonedCard = card.cloneNode(true);
                        websiteProjectsContainer.appendChild(clonedCard);
                        clonedCard.classList.remove('hidden');
                        clonedCard.classList.add('show');
                    }
                });
            }

            AOS.refresh();
        });
    });

    // Modal functionality
    function openModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Close modal when clicking outside the image
    document.getElementById('imageModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Close modal when clicking the close button
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Add click event to project cards to open modal
    document.addEventListener('click', (event) => {
        const card = event.target.closest('.project-card');
        if (card) {
            const imageSrc = card.getAttribute('data-image');
            openModal(imageSrc);
        }
    });

    // Initialize: Show subcategory filters by default (Website is active)
    subcategoryFilters.classList.remove('hidden');

    // Initialize: Show all projects under their respective headings
    websiteProjectsContainer.innerHTML = '';
    aplikasiProjectsContainer.innerHTML = '';
    mainGrid.innerHTML = '';
    websiteSection.classList.remove('hidden');
    aplikasiSection.classList.remove('hidden');
    mainGrid.classList.add('hidden');
    projectCards.forEach(card => {
        const mainCategory = card.getAttribute('data-main-category');
        const clonedCard = card.cloneNode(true);
        if (mainCategory === 'website') {
            websiteProjectsContainer.appendChild(clonedCard);
            clonedCard.classList.remove('hidden');
            clonedCard.classList.add('show');
        } else if (mainCategory === 'aplikasi') {
            aplikasiProjectsContainer.appendChild(clonedCard);
            clonedCard.classList.remove('hidden');
            clonedCard.classList.add('show');
        }
    });
    AOS.refresh();