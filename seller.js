        // Mobile menu toggle functionality
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
        
        // Close menu when clicking on a link (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('toggle');
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

        // Viewport animation for orders sections
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        function handleScroll() {
            const ordersPendingSection = document.querySelector('.orders-section');
            const ordersCompletedSection = document.querySelector('.orders-completed-section');
            
            if (isInViewport(ordersPendingSection)) {
                ordersPendingSection.classList.add('in-viewport');
            } else {
                ordersPendingSection.classList.remove('in-viewport');
            }
            
            if (isInViewport(ordersCompletedSection)) {
                ordersCompletedSection.classList.add('in-viewport');
            } else {
                ordersCompletedSection.classList.remove('in-viewport');
            }
        }

        // Initialize scroll event listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

        // Special Requests functionality
        const specialRequestLink = document.getElementById('specialRequestLink');
        const specialRequestsPopup = document.getElementById('specialRequestsPopup');
        const closeRequestsBtn = document.getElementById('closeRequests');
        const acceptButtons = document.querySelectorAll('.accept-btn');
        const declineButtons = document.querySelectorAll('.decline-btn');

        specialRequestLink.addEventListener('click', (e) => {
            e.preventDefault();
            specialRequestsPopup.classList.toggle('active');
        });

        closeRequestsBtn.addEventListener('click', () => {
            specialRequestsPopup.classList.remove('active');
        });

        acceptButtons.forEach(button => {
            button.addEventListener('click', function() {
                const requestItem = this.closest('.request-item');
                requestItem.style.opacity = '0';
                requestItem.style.height = '0';
                requestItem.style.padding = '0';
                requestItem.style.margin = '0';
                requestItem.style.overflow = 'hidden';
                requestItem.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    requestItem.remove();
                    updateNotificationBadge();
                }, 300);
            });
        });

        declineButtons.forEach(button => {
            button.addEventListener('click', function() {
                const requestItem = this.closest('.request-item');
                requestItem.style.opacity = '0';
                requestItem.style.height = '0';
                requestItem.style.padding = '0';
                requestItem.style.margin = '0';
                requestItem.style.overflow = 'hidden';
                requestItem.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    requestItem.remove();
                    updateNotificationBadge();
                }, 300);
            });
        });

        function updateNotificationBadge() {
            const remainingRequests = document.querySelectorAll('.request-item').length;
            const notificationBadge = document.querySelector('.notification-badge');
            
            if (remainingRequests > 0) {
                notificationBadge.textContent = remainingRequests;
            } else {
                notificationBadge.style.display = 'none';
                specialRequestsPopup.classList.remove('active');
            }
        }

        // Close special requests popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!specialRequestsPopup.contains(e.target) && e.target !== specialRequestLink) {
                specialRequestsPopup.classList.remove('active');
            }
        });

        // Edit Form Functionality
        const editFormOverlay = document.getElementById('editFormOverlay');
        const closeFormBtn = document.getElementById('closeForm');
        const cancelEditBtn = document.getElementById('cancelEdit');
        const editForm = document.getElementById('productEditForm');
        const editLinks = document.querySelectorAll('.edit-link');
        const categoryContainer = document.getElementById('categoryContainer');
        const availableCategories = document.querySelectorAll('.available-category');
        const categoriesInput = document.getElementById('editProductCategories');
        const addProductCard = document.getElementById('addProductCard');
        const formTitle = document.getElementById('formTitle');
        const submitBtn = document.getElementById('submitBtn');
        const imagePreview = document.getElementById('imagePreview');
        const productImageInput = document.getElementById('productImageInput');
        const uploadImageBtn = document.getElementById('uploadImageBtn');
        const imageUploadContainer = document.getElementById('imageUploadContainer');
        const notification = document.getElementById('notification');

        // Sample product data (in a real app, this would come from a database)
        const products = {
            1: {
                name: 'Bamboo Comb',
                price: '140',
                discount: '0',
                description: 'Handwoven bamboo basket perfect for storage or decoration.',
                categories: ['decor'],
                stock: '15',
                image: 'bamboo p1.png'
            },
            2: {
                name: 'Bamboo Tray',
                price: '650',
                discount: '10',
                description: 'Elegant bamboo serving tray with smooth finish.',
                categories: ['kitchen'],
                stock: '8',
                image: 'bamboo p2.png'
            },
            3: {
                name: 'Bamboo Frame',
                price: '430',
                discount: '5',
                description: 'Ambient lighting with natural bamboo shade.',
                categories: ['decor'],
                stock: '12',
                image: 'bamboo p3.png'
            },
            4: {
                name: 'Bamboo Glass',
                price: '850',
                discount: '15',
                description: 'Comfortable and stylish bamboo chair for indoor use.',
                categories: ['furniture'],
                stock: '5',
                image: 'bamboo p4.png'
            },
            5: {
                name: 'Bamboo Container',
                price: '310',
                discount: '20',
                description: 'Sturdy bamboo coffee table with glass top.',
                categories: ['furniture', 'decor'],
                stock: '3',
                image: 'bamboo p5.png'
            }
        };

        // Track new product image
        let newProductImage = null;

        // Drag and drop functionality for categories
        function setupDragAndDrop() {
            // Make available categories draggable
            availableCategories.forEach(category => {
                category.addEventListener('dragstart', dragStart);
                category.addEventListener('click', addCategory);
            });

            // Set up drop zone
            categoryContainer.addEventListener('dragover', dragOver);
            categoryContainer.addEventListener('drop', drop);
            categoryContainer.addEventListener('dragenter', dragEnter);
            categoryContainer.addEventListener('dragleave', dragLeave);
        }

        function dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.category);
            e.dataTransfer.setData('text/html', e.target.textContent);
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function dragEnter(e) {
            e.preventDefault();
            categoryContainer.classList.add('drag-over');
        }

        function dragLeave() {
            categoryContainer.classList.remove('drag-over');
        }

        function drop(e) {
            e.preventDefault();
            categoryContainer.classList.remove('drag-over');
            
            const category = e.dataTransfer.getData('text/plain');
            const categoryName = e.dataTransfer.getData('text/html');
            
            if (!categoryContainer.querySelector(`[data-category="${category}"]`)) {
                addCategoryTag(category, categoryName);
            }
        }

        function addCategory(e) {
            const category = e.target.dataset.category;
            const categoryName = e.target.textContent;
            
            if (!categoryContainer.querySelector(`[data-category="${category}"]`)) {
                addCategoryTag(category, categoryName);
            }
        }

        function addCategoryTag(category, categoryName) {
            const tag = document.createElement('div');
            tag.className = 'category-tag';
            tag.dataset.category = category;
            tag.draggable = true;
            tag.innerHTML = `
                ${categoryName}
                <span class="remove-tag" onclick="removeCategoryTag(this)">×</span>
            `;
            
            tag.addEventListener('dragstart', dragStartTag);
            categoryContainer.appendChild(tag);
            updateCategoriesInput();
        }

        function dragStartTag(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.category);
            e.dataTransfer.setData('text/html', e.target.textContent.trim().replace('×', ''));
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        }

        function removeCategoryTag(element) {
            element.parentElement.remove();
            updateCategoriesInput();
        }

        function updateCategoriesInput() {
            const categories = Array.from(categoryContainer.querySelectorAll('.category-tag')).map(tag => tag.dataset.category);
            categoriesInput.value = categories.join(',');
        }

        // Image upload functionality
        uploadImageBtn.addEventListener('click', () => {
            productImageInput.click();
        });

        productImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imagePreview.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    imagePreview.appendChild(img);
                    newProductImage = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Open edit form when clicking Edit Details
        editLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.id;
                const product = products[productId];
                
                // Set form mode to edit
                editForm.dataset.mode = 'edit';
                formTitle.textContent = 'Edit Product Details';
                submitBtn.textContent = 'Save Changes';
                
                // Fill form with product data
                document.getElementById('productId').value = productId;
                document.getElementById('editProductName').value = product.name;
                document.getElementById('editProductPrice').value = product.price;
                document.getElementById('editProductDiscount').value = product.discount;
                document.getElementById('editProductDescription').value = product.description;
                document.getElementById('editProductStock').value = product.stock;
                
                // Set image preview
                imagePreview.innerHTML = '';
                if (product.image) {
                    const img = document.createElement('img');
                    img.src = product.image;
                    imagePreview.appendChild(img);
                } else {
                    imagePreview.innerHTML = '<span>No image selected</span>';
                }
                
                // Clear and populate categories
                categoryContainer.innerHTML = '';
                if (product.categories && product.categories.length > 0) {
                    const categoryNames = {
                        'decor': 'Home Decor',
                        'furniture': 'Furniture',
                        'kitchen': 'Kitchenware',
                        'garden': 'Garden',
                        'other': 'Other'
                    };
                    
                    product.categories.forEach(category => {
                        if (categoryNames[category]) {
                            addCategoryTag(category, categoryNames[category]);
                        }
                    });
                }
                
                // Show form
                editFormOverlay.classList.add('active');
            });
        });

        // Open add product form
        addProductCard.addEventListener('click', () => {
            // Set form mode to add
            editForm.dataset.mode = 'add';
            formTitle.textContent = 'Add New Product';
            submitBtn.textContent = 'Add Product';
            
            // Reset form
            editForm.reset();
            document.getElementById('productId').value = '';
            categoryContainer.innerHTML = '';
            imagePreview.innerHTML = '<span>No image selected</span>';
            newProductImage = null;
            productImageInput.value = '';
            
            // Show form
            editFormOverlay.classList.add('active');
        });

        // Close form
        function closeEditForm() {
            editFormOverlay.classList.remove('active');
        }

        closeFormBtn.addEventListener('click', closeEditForm);
        cancelEditBtn.addEventListener('click', closeEditForm);

        // Handle form submission
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const productId = document.getElementById('productId').value;
            const name = document.getElementById('editProductName').value;
            const price = document.getElementById('editProductPrice').value;
            const discount = document.getElementById('editProductDiscount').value;
            const description = document.getElementById('editProductDescription').value;
            const categories = categoriesInput.value.split(',').filter(cat => cat);
            const stock = document.getElementById('editProductStock').value;
            const mode = editForm.dataset.mode;
            
            if (mode === 'edit') {
                // Update the product card (in a real app, you would send this to a server)
                const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
                productCard.querySelector('.product-name').textContent = name;
                productCard.querySelector('.product-price').textContent = `₹${price}`;
                
                // Update the products object
                products[productId] = {
                    ...products[productId],
                    name,
                    price,
                    discount,
                    description,
                    categories,
                    stock
                };
            } else {
                // Add new product
                const newId = Object.keys(products).length + 1;
                
                // Create new product card
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.id = newId;
                productCard.style.opacity = '0';
                productCard.style.transform = 'translateY(20px)';
                productCard.style.animation = 'fadeInUp 0.6s forwards';
                
                productCard.innerHTML = `
                    <div class="product-image-container">
                        ${newProductImage ? `<img src="${newProductImage}" alt="${name}" class="product-image">` : '<span>No image</span>'}
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${name}</h3>
                        <p class="product-price">₹${price}</p>
                        <span class="edit-link">Edit Details</span>
                    </div>
                `;
                
                // Add to DOM
                const productsGrid = document.querySelector('.products-grid');
                productsGrid.insertBefore(productCard, addProductCard);
                
                // Add edit event listener to new card
                productCard.querySelector('.edit-link').addEventListener('click', (e) => {
                    const card = e.target.closest('.product-card');
                    const id = card.dataset.id;
                    const product = products[id];
                    
                    // Set form mode to edit
                    editForm.dataset.mode = 'edit';
                    formTitle.textContent = 'Edit Product Details';
                    submitBtn.textContent = 'Save Changes';
                    
                    // Fill form with product data
                    document.getElementById('productId').value = id;
                    document.getElementById('editProductName').value = product.name;
                    document.getElementById('editProductPrice').value = product.price;
                    document.getElementById('editProductDiscount').value = product.discount;
                    document.getElementById('editProductDescription').value = product.description;
                    document.getElementById('editProductStock').value = product.stock;
                    
                    // Set image preview
                    imagePreview.innerHTML = '';
                    if (product.image) {
                        const img = document.createElement('img');
                        img.src = product.image;
                        imagePreview.appendChild(img);
                    } else {
                        imagePreview.innerHTML = '<span>No image selected</span>';
                    }
                    
                    // Clear and populate categories
                    categoryContainer.innerHTML = '';
                    if (product.categories && product.categories.length > 0) {
                        const categoryNames = {
                            'decor': 'Home Decor',
                            'furniture': 'Furniture',
                            'kitchen': 'Kitchenware',
                            'garden': 'Garden',
                            'other': 'Other'
                        };
                        
                        product.categories.forEach(category => {
                            if (categoryNames[category]) {
                                addCategoryTag(category, categoryNames[category]);
                            }
                        });
                    }
                    
                    // Show form
                    editFormOverlay.classList.add('active');
                });
                
                // Add to products object
                products[newId] = {
                    name,
                    price,
                    discount,
                    description,
                    categories,
                    stock,
                    image: newProductImage
                };
            }
            
            // Close the form
            closeEditForm();
        });

        // Close form when clicking outside
        editFormOverlay.addEventListener('click', (e) => {
            if (e.target === editFormOverlay) {
                closeEditForm();
            }
        });

        // Order completion functionality
        const checkboxes = document.querySelectorAll('.complete-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // Show notification
                    notification.classList.add('show');
                    
                    // Hide notification after 3 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 3000);
                    
                    // In a real app, you would send this to the server
                    console.log(`Order ${this.id} marked as completed`);
                }
            });
        });

        // Initialize drag and drop
        setupDragAndDrop();