// Add the slider JavaScript at the end
const slides = [
    {
        quote: {
          en: '"Every handmade pot = one less plastic container in landfills!"',
          hi: '"हर मिट्टी का बर्तन कहे—प्रकृति से प्रेम करो, प्लास्टिक से दूरी रखो।"'
        },
        icon: '🏺',
        layout: 'diagonal',
        images: [
          { url: 'images/w2.jpg', pos: {x: -100, y: -100} },
          { url: 'images/w2.jpg', pos: {x: 0, y: 0} },
          { url: 'images/w2.jpg', pos: {x: 100, y: 100} }
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
          { url: 'images/w2.jpg', pos: {x: 0, y: -120} },
          { url: 'images/w2.jpg', pos: {x: -100, y: 50} },
          { url: 'images/w2.jpg', pos: {x: 100, y: 50} }
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
          { url: 'images/w2.jpg', pos: {x: 90, y: -120}, rotate: 45 },
          { url: 'images/w2.jpg', pos: {x: -180, y: 0}, rotate: 45 },
          { url: 'images/w2.jpg', pos: {x: 0, y: 0}, rotate: 45 },
          { url: 'images/w2.jpg', pos: {x: 180, y: 0}, rotate: 45 },
          { url: 'images/w2.jpg', pos: {x: -90, y: -120}, rotate: 45 }
        ]
      }
];

const slider = document.getElementById('slider');
const imageContainer = document.getElementById('imageContainer');
const quoteEl = document.getElementById('quote');
const dots = document.querySelectorAll('.dot');

let current = 0;
let interval;
let currentLanguage = 'en'; // Track current language

function createImages(slide) {
    imageContainer.innerHTML = '';
    
    slide.images.forEach((img, index) => {
        const imageEl = document.createElement('div');
        imageEl.className = 'image';
        if (slide.layout === 'diamond') {
            imageEl.classList.add('diamond-image');
        }
        
        imageEl.style.backgroundImage = `url(${img.url})`;
        imageEl.style.left = `calc(50% + ${img.pos.x}px)`;
        imageEl.style.top = `calc(50% + ${img.pos.y}px)`;
        
        if (img.rotate) {
            imageEl.style.transform = `translate(-50%, -50%) rotate(${img.rotate}deg)`;
        }
        
        imageContainer.appendChild(imageEl);
    });
    
    // Update quote based on current language
    updateQuoteLanguage();
}

function updateQuoteLanguage() {
    const currentSlide = slides[current];
    quoteEl.textContent = currentSlide.quote[currentLanguage];
    quoteEl.setAttribute('data-icon', currentSlide.icon);
}

function animateImages(nextIndex) {
    const currentImages = Array.from(imageContainer.querySelectorAll('.image'));
    const nextSlide = slides[nextIndex];
    
    // Animate out current images
    currentImages.forEach((img, i) => {
        setTimeout(() => {
            img.style.opacity = '0';
            img.style.transform = img.style.transform.replace('scale(1)', 'scale(0.5)');
        }, i * 200);
    });
    
    // After animation completes, create new images
    setTimeout(() => {
        createImages(nextSlide);
        const newImages = Array.from(imageContainer.querySelectorAll('.image'));
        
        // Animate in new images
        newImages.forEach((img, i) => {
            img.style.opacity = '0';
            img.style.transform = img.style.transform.replace('scale(1)', 'scale(1.5)');
            
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = img.style.transform.replace('scale(1.5)', 'scale(1)');
            }, i * 200 + 300);
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[nextIndex].classList.add('active');
        current = nextIndex;
    }, currentImages.length * 200 + 300);
}

function goToSlide(index) {
    if (index === current) return;
    animateImages(index);
    resetInterval();
}

function nextSlide() {
    const next = (current + 1) % slides.length;
    animateImages(next);
}

function prevSlide() {
    const prev = (current - 1 + slides.length) % slides.length;
    animateImages(prev);
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
}

// Language switching support
function setLanguage(lang) {
    currentLanguage = lang;
    updateQuoteLanguage();
}

// Initialize slider
createImages(slides[0]);
dots[0].classList.add('active');
interval = setInterval(nextSlide, 5000);

// Connect to your existing language buttons
document.getElementById('hindiBtn').addEventListener('click', () => {
    setLanguage('hi');
});

document.getElementById('englishBtn').addEventListener('click', () => {
    setLanguage('en');
});