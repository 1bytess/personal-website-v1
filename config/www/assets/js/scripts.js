// assets/js/scripts.js

/*!
=========================================================
* Meyawo Landing Page
=========================================================
* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com
=========================================================
*/

// Main application object to avoid global namespace pollution
const MeyawoApp = {
    // Initialize all functionality when document is ready
    init: function() {
        this.setupNavigation();
        this.setupModals();
        this.setupLanguageDropdown();
        this.setupKeyboardHandlers();
    },

    // Navigation functionality
    setupNavigation: function() {
        // Smooth scrolling for navigation links
        $(".nav .link").on("click", function (event) {
            event.preventDefault();
            
            const target = $(this).data("target");
            
            if (target) {
                const targetElement = $("#" + target);
                if (targetElement.length) {
                    $("html, body").animate({
                        scrollTop: targetElement.offset().top - 60
                    }, 700);
                }
            }
            
            return false;
        });
        
        // Mobile menu toggle
        $("#nav-toggle").click(function () {
            $(this).toggleClass("is-active");
            $("ul.nav").toggleClass("show");
        });
    },

    // Unified modal system
    setupModals: function() {
        // Single click handler for all modal interactions
        document.addEventListener('click', (event) => {
            // Handle modal opening for certificate/award images
            if (event.target.classList.contains('modal-trigger')) {
                const imgSrc = event.target.src || event.target.dataset.src;
                if (imgSrc) {
                    this.openImageModal(imgSrc);
                }
            }
            
            // Handle demo modal opening
            if (event.target.classList.contains('demo-btn')) {
                if (event.target.style.pointerEvents === 'none') {
                    event.preventDefault();
                    alert('This demo is currently unavailable. Please try again later.');
                    return false;
                }
                this.openDemoModal();
            }
            
            // Handle modal closing when clicking outside
            const imageModal = document.getElementById("imageModal");
            const demoModal = document.getElementById('demoModal');
            
            if (imageModal && event.target === imageModal) {
                this.closeImageModal();
            }
            
            if (demoModal && event.target === demoModal) {
                this.closeDemoModal();
            }
            
            // Handle language dropdown closing
            const dropdown = document.getElementById('lang-dropdown');
            const langButton = document.querySelector('.lang-btn');
            
            if (dropdown && langButton && 
                !langButton.contains(event.target) && 
                !dropdown.contains(event.target)) {
                dropdown.style.display = 'none';
            }
        });
    },

    // Enhanced image modal with smart sizing
    openImageModal: function(imgSrc) {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");

        if (!modal || !modalImg) return;

        modal.style.display = "flex";
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
        
        // Smart sizing based on image aspect ratio
        const tempImg = new Image();
        tempImg.onload = function() {
            const aspectRatio = this.width / this.height;
            
            modalImg.style.objectFit = "contain";
            modalImg.style.maxWidth = "90vw";
            modalImg.style.maxHeight = "90vh";
            
            // Adjust based on aspect ratio
            if (aspectRatio > 1.5) {
                modalImg.style.width = "85vw";
                modalImg.style.height = "auto";
            } else {
                modalImg.style.height = "85vh";
                modalImg.style.width = "auto";
            }
        };
        tempImg.src = imgSrc;
    },

    // Close image modal
    closeImageModal: function() {
        const modal = document.getElementById("imageModal");
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    },

    // Demo modal functions
    openDemoModal: function() {
        const modal = document.getElementById('demoModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },

    closeDemoModal: function() {
        const modal = document.getElementById('demoModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    // Language dropdown functionality
    setupLanguageDropdown: function() {
        window.toggleDropdown = function() {
            const dropdown = document.getElementById('lang-dropdown');
            if (dropdown) {
                dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
            }
        };
    },

    // Keyboard event handlers
    setupKeyboardHandlers: function() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeImageModal();
                this.closeDemoModal();
                
                // Close language dropdown
                const dropdown = document.getElementById('lang-dropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
    }
};

// Initialize when document is ready
$(document).ready(function() {
    MeyawoApp.init();
});

// Legacy function support (if needed for existing HTML)
function openModal(imgSrc) {
    MeyawoApp.openImageModal(imgSrc);
}

function closeModal() {
    MeyawoApp.closeImageModal();
}

function openDemoModal() {
    MeyawoApp.openDemoModal();
}

function closeDemoModal() {
    MeyawoApp.closeDemoModal();
}