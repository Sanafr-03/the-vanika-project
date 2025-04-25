        // Cart functionality
        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        const cartBadge = document.getElementById('cartBadge');
        let cartCount = 0;
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                cartCount++;
                cartBadge.textContent = cartCount;
                
                // Show badge when first item is added
                if (cartCount > 0) {
                    cartBadge.style.display = 'flex';
                }
                
                // Animation effect
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                this.style.backgroundColor = '#4CAF50';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart cart-icon"></i> Add to Cart';
                    this.style.backgroundColor = '#FFEDBB';
                    this.style.color = '#333';
                }, 1000);
            });
        });
        
        // Login Modal functionality
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeLoginBtn = document.getElementById('closeLogin');
        
        function toggleLoginModal() {
            loginModal.classList.toggle('active');
        }
        
        loginBtn.addEventListener('click', toggleLoginModal);
        closeLoginBtn.addEventListener('click', toggleLoginModal);
        
        // Close login modal when clicking outside
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                toggleLoginModal();
            }
        });
        
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality would be implemented here');
            toggleLoginModal();
        });
        
        // Social login buttons
        document.querySelector('.google-btn').addEventListener('click', () => {
            alert('Google login would be implemented here');
        });
        
        document.querySelector('.apple-btn').addEventListener('click', () => {
            alert('Apple login would be implemented here');
        });
        
        // Filter dropdown functionality - Fixed the issue with first click
        const filterBtn = document.getElementById('filterBtn');
        const filterDropdown = document.getElementById('filterDropdown');
        const closeFilterBtn = document.getElementById('closeFilter');
        const applyFilterBtn = document.getElementById('applyFilter');
        
        function toggleFilterDropdown() {
            filterDropdown.classList.toggle('active');
        }
        
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up to document
            toggleFilterDropdown();
        });
        
        closeFilterBtn.addEventListener('click', toggleFilterDropdown);
        
        // Close filter dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!filterDropdown.contains(e.target) && e.target !== filterBtn) {
                filterDropdown.classList.remove('active');
            }
        });
        
        // Prevent dropdown from closing when clicking inside it
        filterDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        applyFilterBtn.addEventListener('click', () => {
            // In a real app, this would filter the products
            filterDropdown.classList.remove('active');
            alert('Filters applied! (This is a demo)');
        });
        
        // Wishlist functionality
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.classList.add('active');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.classList.remove('active');
                }
            });
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Back to top button functionality
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