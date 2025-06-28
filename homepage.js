const languageModal = document.getElementById('languageModal');
const hindiBtn = document.getElementById('hindiBtn');
const englishBtn = document.getElementById('englishBtn');
let currentLanguage = 'en';
let animationsStarted = false;

// Show language modal on page load
document.addEventListener('DOMContentLoaded', function () {
    languageModal.style.display = 'flex';

    // Initially hide animated elements
    document.querySelector('.book-cover').style.visibility = 'hidden';
    document.querySelector('.book-pages').style.visibility = 'hidden';

    // Remove any existing animations
    document.querySelector('.book-cover').style.animation = 'none';
    document.querySelectorAll('.collage-photo').forEach(photo => {
        photo.style.animation = 'none';
    });

    initializeSlider();
    
    // Initialize bamboo animations
    document.querySelectorAll('.floating-bamboo').forEach((el, index) => {
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const size = Math.random() * 50 + 70;
        
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
    });
});

hindiBtn.addEventListener('click', () => {
    setLanguage('hi');
});

englishBtn.addEventListener('click', () => {
    setLanguage('en');
});

function setLanguage(lang) {
    if (animationsStarted) return;
    animationsStarted = true;

    currentLanguage = lang;

    // Update all translatable elements
    document.querySelectorAll('[data-en], [data-hi]').forEach(element => {
        if (lang === 'hi' && element.hasAttribute('data-hi')) {
            element.textContent = element.getAttribute('data-hi');
        } else if (element.hasAttribute('data-en')) {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Animate and hide modal
    languageModal.classList.add('fade-out');

    setTimeout(() => {
        languageModal.style.display = 'none';
        setTimeout(() => {
            startSectionAnimations();
        }, 100);
        document.querySelector('.book-cover').style.visibility = 'visible';
        document.querySelector('.book-pages').style.visibility = 'visible';
        startAnimations();

        // Update the slider language
        if (typeof updateSliderLanguage === 'function') {
            updateSliderLanguage(lang);
        }
    }, 300);
}

function startAnimations() {
    setTimeout(() => {
        document.querySelector('.book-cover').style.animation = 'openBook 2s forwards';

        const photos = document.querySelectorAll('.collage-photo');
        photos.forEach((photo, index) => {
            const delay = 2 + (index * 0.2);
            photo.style.animation = `fadeIn 0.8s ${delay}s forwards, float 4s ${delay}s infinite ease-in-out`;
        });

        setTimeout(() => {
            initializeTaglines();
            setInterval(rotateTaglines, 6000);
        }, 2000);
    }, 2000);
}

function initializeTaglines() {
    const taglines = [
        document.getElementById('tagline1'),
        document.getElementById('tagline2'),
        document.getElementById('tagline3'),
        document.getElementById('tagline4'),
        document.getElementById('tagline5')
    ];

    taglines[0].style.transition = 'opacity 0.8s ease';
    taglines[0].classList.add('active');
    taglines[0].style.opacity = '1';

    for (let i = 1; i < taglines.length; i++) {
        taglines[i].style.display = 'none';
    }
}

function rotateTaglines() {
    const taglines = [
        document.getElementById('tagline1'),
        document.getElementById('tagline2'),
        document.getElementById('tagline3'),
        document.getElementById('tagline4'),
        document.getElementById('tagline5')
    ];

    const currentIndex = taglines.findIndex(t => t.classList.contains('active'));
    const current = taglines[currentIndex === -1 ? 0 : currentIndex];
    const next = taglines[(currentIndex + 1) % taglines.length];

    current.style.transition = 'all 0.8s ease-out';
    current.style.transform = 'translateX(-100%)';
    current.style.opacity = '0';

    next.style.transition = 'none';
    next.style.display = 'block';
    next.style.transform = 'translateX(100%)';
    next.style.opacity = '0';
    next.classList.add('active');

    setTimeout(() => {
        next.style.transition = 'all 0.8s ease-out 0.2s';
        next.style.transform = 'translateX(0)';
        next.style.opacity = '1';
    }, 200);

    setTimeout(() => {
        current.classList.remove('active');
        current.style.transform = 'translateX(0)';
        current.style.opacity = '0';
        current.style.display = 'none';
    }, 2000);
}

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.style.display = mobileMenu.classList.contains('active') ? 'flex' : 'none';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

document.querySelectorAll('.collage-photo').forEach(photo => {
    photo.addEventListener('click', function () {
        this.style.transform = 'scale(1.2) rotate(var(--rotation))';
        this.style.zIndex = '1000';
        setTimeout(() => {
            this.style.transform = 'scale(1.1) rotate(var(--rotation))';
        }, 300);
    });

    photo.addEventListener('mouseleave', function () {
        this.style.zIndex = '2';
    });
});

const slides = [
    {
        quote: {
            en: '"Every handmade pot = one less plastic container in landfills!"',
            hi: '"हर मिट्टी का बर्तन कहे—प्रकृति से प्रेम करो, प्लास्टिक से दूरी रखो।"'
        },
        icon: '🏺',
        layout: 'diagonal',
        images: [
            { url: 'images/product6.jpg', pos: { x: -130, y: -130 } },
            { url: 'images/product7.jpg', pos: { x: -30, y: -30 } },
            { url: 'images/product8.jpg', pos: { x: 50, y: 50 } }
        ]
    },
    {
        quote: {
            en: '"From Bamboo to Beauty – Sustainably Made by Her"',
            hi: '"बाँस की बाँसुरी से निकली सृजन की रागिनी—उसके स्पर्श से सजी सुंदरता की कहानी।"'
        },
        icon: '🎋',
        layout: 'horizontal',
        images: [
            { url: 'images/product1.jpg', pos: { x: 0, y: -120 } },
            { url: 'images/product2.jpg', pos: { x: -100, y: 50 } },
            { url: 'images/product3.jpg', pos: { x: 100, y: 50 } }
        ]
    },
    {
        quote: {
            en: '"Missing home? One bite will fix that!"',
            hi: '"घर की खुशबू जब तड़पाए, माँ के स्वाद का एक निवाला दिल बहलाए।"'
        },
        icon: '🍯',
        layout: 'diamond',
        images: [
            { url: 'images/food1.jpg', pos: { x: 90, y: -120 }, rotate: 45 },
            { url: 'images/food2.jpg', pos: { x: -180, y: 0 }, rotate: 45 },
            { url: 'images/food3.jpeg', pos: { x: 0, y: 0 }, rotate: 45 },
            { url: 'images/food4.jpeg', pos: { x: 180, y: 0 }, rotate: 45 },
            { url: 'images/snack.jpg', pos: { x: -90, y: -120 }, rotate: 45 }
        ]
    }
];

function initializeSlider() {
    const slider = document.getElementById('slider');
    const imageContainer = document.getElementById('imageContainer');
    const quoteEl = document.getElementById('quote');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let interval;

    function createImages(slide) {
        imageContainer.innerHTML = '';

        slide.images.forEach((img, index) => {
            const imageEl = document.createElement('div');
            imageEl.className = 'image';
            if (slide.layout === 'diamond') {
                imageEl.classList.add('diamond-image');
            }

            imageEl.style.backgroundImage = `url(${img.url})`;
            const screenWidth = window.innerWidth;
            let scaleFactor = 1;

            if (screenWidth <= 320) scaleFactor = 0.4;
            else if (screenWidth <= 375) scaleFactor = 0.5;
            else if (screenWidth <= 480) scaleFactor = 0.6;
            else if (screenWidth <= 640) scaleFactor = 0.75;
            else if (screenWidth <= 768) scaleFactor = 0.85;

            const posX = img.pos.x * scaleFactor;
            const posY = img.pos.y * scaleFactor;

            imageEl.style.left = `calc(50% + ${posX}px)`;
            imageEl.style.top = `calc(50% + ${posY}px)`;

            if (img.rotate) {
                imageEl.style.transform = `translate(-50%, -50%) rotate(${img.rotate}deg)`;
            } else {
                imageEl.style.transform = `translate(-50%, -50%)`;
            }
            
            imageContainer.appendChild(imageEl);
        });

        updateQuoteLanguage();
    }

    function updateQuoteLanguage() {
        const currentSlideData = slides[currentSlide];
        quoteEl.textContent = currentSlideData.quote[currentLanguage];
        quoteEl.setAttribute('data-icon', currentSlideData.icon);
    }

    function animateImages(nextIndex) {
        const currentImages = Array.from(imageContainer.querySelectorAll('.image'));
        const nextSlide = slides[nextIndex];
    
        currentImages.forEach((img, i) => {
            setTimeout(() => {
                img.style.opacity = '0';
                img.style.transform = img.style.transform.replace('scale(1)', 'scale(0.5)');
            }, i * 200);
        });
    
        setTimeout(() => {
            imageContainer.innerHTML = '';
            quoteEl.textContent = nextSlide.quote[currentLanguage];
            quoteEl.setAttribute('data-icon', nextSlide.icon);
            
            nextSlide.images.forEach((img, index) => {
                const imageEl = document.createElement('div');
                imageEl.className = 'image';
                if (nextSlide.layout === 'diamond') {
                    imageEl.classList.add('diamond-image');
                }
    
                imageEl.style.backgroundImage = `url(${img.url})`;
                const screenWidth = window.innerWidth;
                let scaleFactor = 1;

                if (screenWidth <= 320) scaleFactor = 0.4;
                else if (screenWidth <= 375) scaleFactor = 0.5;
                else if (screenWidth <= 480) scaleFactor = 0.6;
                else if (screenWidth <= 640) scaleFactor = 0.75;
                else if (screenWidth <= 768) scaleFactor = 0.85;

                const posX = img.pos.x * scaleFactor;
                const posY = img.pos.y * scaleFactor;

                imageEl.style.left = `calc(50% + ${posX}px)`;
                imageEl.style.top = `calc(50% + ${posY}px)`;
    
                imageEl.style.opacity = '0';
                let transformStr = 'translate(-50%, -50%)';
                if (img.rotate) {
                    transformStr += ` rotate(${img.rotate}deg)`;
                }
                transformStr += ' scale(1.5)';
                imageEl.style.transform = transformStr;

                imageContainer.appendChild(imageEl);
    
                setTimeout(() => {
                    imageEl.style.opacity = '1';
                    imageEl.style.transform = imageEl.style.transform.replace('scale(1.5)', 'scale(1)');
                }, index * 200 + 300);
            });
    
            dots.forEach(dot => dot.classList.remove('active'));
            dots[nextIndex].classList.add('active');
            currentSlide = nextIndex;
        }, currentImages.length * 200 + 300);
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        animateImages(next);
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    createImages(slides[0]);
    dots[0].classList.add('active');
    interval = setInterval(nextSlide, 5000);

    window.updateSliderLanguage = function (lang) {
        currentLanguage = lang;
        updateQuoteLanguage();
    };
}

// Add subtle parallax effect to feature cards
const featuresContainer = document.querySelector('.features-container');

featuresContainer.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = featuresContainer.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    document.querySelectorAll('.feature-card').forEach((card, i) => {
        const offsetX = (x - 0.5) * 20;
        const offsetY = (y - 0.5) * 20;
        
        if(i % 2 === 0) {
            card.style.transform = `translate(-${offsetX}px, -${offsetY}px) rotateY(${offsetX/2}deg)`;
        } else {
            card.style.transform = `translate(${offsetX}px, -${offsetY}px) rotateY(-${offsetX/2}deg)`;
        }
    });
});

featuresContainer.addEventListener('mouseleave', () => {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.transform = '';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const fadeInItems = document.querySelectorAll('.fade-in');
  
    function showFadeIns() {
      fadeInItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          item.classList.add('visible');
        }
      });
    }
  
    window.addEventListener('scroll', showFadeIns);
    showFadeIns(); // trigger on load
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    const stepNumbers = document.querySelectorAll('.step-number');
    const futureMessage = document.querySelector('.future-message');
    const ctaButton = document.querySelector('.cta-button');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add('visible');
          
          // Find and activate the corresponding step number immediately
          const stepContainer = card.closest('.step-container');
          if (stepContainer) {
            const stepNumber = stepContainer.querySelector('.step-number');
            
            // Remove glow from all steps first
            stepNumbers.forEach(num => num.classList.remove('active'));
            
            // Add glow to current step immediately
            stepNumber.classList.add('active');
          }
          
          // Animate future message and button after last card
          if (card === timelineCards[timelineCards.length - 1]) {
            futureMessage.style.opacity = 1;
            futureMessage.style.transform = 'translateY(0)';
            ctaButton.style.opacity = 1;
            ctaButton.style.transform = 'scale(1)';
          }
        } else {
          // Optional: Remove glow when scrolling back up and card leaves view
          const card = entry.target;
          if (!card.classList.contains('force-visible')) {
            const stepContainer = card.closest('.step-container');
            if (stepContainer) {
              const stepNumber = stepContainer.querySelector('.step-number');
              stepNumber.classList.remove('active');
            }
          }
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });
    
    // Initialize and observe elements
    timelineCards.forEach(card => observer.observe(card));
    
    futureMessage.style.opacity = 0;
    futureMessage.style.transform = 'translateY(20px)';
    futureMessage.style.transition = 'all 0.8s ease';
    
    ctaButton.style.opacity = 0;
    ctaButton.style.transform = 'scale(0.9)';
    ctaButton.style.transition = 'all 0.8s ease 0.2s';
  });

  // Add this to your existing JavaScript for animations
document.addEventListener('DOMContentLoaded', function() {
    const featureGroups = document.querySelectorAll('.features-group');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    featureGroups.forEach(group => {
      observer.observe(group);
    });
  });

// Seller Reviews Animation
function initializeSellerReviews() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initialize cards as hidden
    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Footer Animations
function initializeFooter() {
    // Floating product icons animation
    const floatingProducts = document.querySelectorAll('.product-icon');
    floatingProducts.forEach((product, index) => {
        const duration = 6 + (index * 2);
        const delay = index * 0.5;
        product.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transition = 'all 0.3s ease';
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize these when language is selected
function startSectionAnimations() {
    initializeSellerReviews();
    initializeFooter();
}
