// Portfolio data
const portfolioData = [
    {
        id: 1,
        title: "Nikola Tesla Documentry",
        category: "documentry",
        image: "exposed!.jpg",
        description: "Documentry on Nikola Tesla for SciencEpic Nepal"
    },
    {
        id: 2,
        title: "Indie Music Video",
        category: "music",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
        description: "Artistic music video with creative visual storytelling"
    },
    {
        id: 3,
        title: "Tech Startup Documentary",
        category: "documentary",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=300&fit=crop",
        description: "Behind-the-scenes look at innovative startup culture"
    },
    {
        id: 4,
        title: "Corporate Training Video",
        category: "corporate",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop",
        description: "Professional training content for enterprise clients"
    },
    {
        id: 5,
        title: "Fashion Brand Campaign",
        category: "commercial",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop",
        description: "Luxury fashion brand promotional video"
    },
    {
        id: 6,
        title: "Electronic Music Video",
        category: "music",
        image: "https://images.unsplash.com/photo-1571266028243-d220c9c3b0c4?w=500&h=300&fit=crop",
        description: "Futuristic visuals for electronic music artist"
    },
    {
        id: 7,
        title: "Environmental Documentary",
        category: "documentary",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
        description: "Powerful documentary on climate change"
    },
    {
        id: 8,
        title: "Company Culture Video",
        category: "corporate",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
        description: "Engaging company culture and values showcase"
    }
];

// DOM Elements
let cursor, cursorFollower, portfolioGrid, filterBtns;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initPortfolio();
    initAnimations();
    initSkillBars();
    initTestimonials();
    initSmoothScroll();
    initNavbar();
});

// Custom Cursor
function initCursor() {
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 20 + 'px';
            cursorFollower.style.top = e.clientY - 20 + 'px';
        }, 100);
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Portfolio functionality
function initPortfolio() {
    portfolioGrid = document.getElementById('portfolioGrid');
    filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!portfolioGrid) return;
    
    // Populate portfolio
    renderPortfolio('all');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio
            renderPortfolio(filter);
        });
    });
}

function renderPortfolio(filter) {
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    portfolioGrid.innerHTML = '';
    
    filteredData.forEach((item, index) => {
        const portfolioItem = createPortfolioItem(item, index);
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Animate items
    const items = portfolioGrid.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createPortfolioItem(item, index) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="portfolio-image">
        <div class="portfolio-overlay">
            <i class="fas fa-play play-icon"></i>
            <h3 class="portfolio-title">${item.title}</h3>
            <p class="portfolio-category">${item.category}</p>
        </div>
    `;
    
    div.addEventListener('click', () => {
        // Placeholder for video modal
        console.log(`Playing: ${item.title}`);
    });
    
    return div;
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const aboutSection = document.querySelector('.about');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        skillObserver.observe(aboutSection);
    }
}

// Testimonials slider
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Smooth scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 2000);
        });
    }
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = [
        '.hero-title .title-line',
        '.hero-subtitle',
        '.hero-stats',
        '.hero-buttons'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (index + 1) * 200);
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}
