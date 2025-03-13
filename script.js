// Sample product data
const products = [
    {
      id: 1,
      name: "Sony Alpha 7 III",
      category: "Mirrorless",
      description: "Full-frame mirrorless camera with advanced features",
      price: 179990,
      originalPrice: 199990,
      discount: 10,
      image: "https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Canon EOS R6",
      category: "Mirrorless",
      description: "High-performance full-frame mirrorless camera",
      price: 215990,
      originalPrice: 239990,
      discount: 10,
      image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Nikon Z6 II",
      category: "Mirrorless",
      description: "Versatile mirrorless camera with exceptional low-light performance",
      price: 164990,
      originalPrice: 189990,
      discount: 13,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
      badge: null
    },
    {
      id: 4,
      name: "Canon EOS 850D",
      category: "DSLR",
      description: "Entry-level DSLR with excellent image quality",
      price: 67990,
      originalPrice: 79990,
      discount: 15,
      image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "Hot Deal"
    },
    {
      id: 5,
      name: "Sony GM 24-70mm f/2.8",
      category: "Lens",
      description: "Professional-grade standard zoom lens",
      price: 189990,
      originalPrice: 209990,
      discount: 10,
      image: "https://images.pexels.com/photos/3602258/pexels-photo-3602258.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: null
    },
    {
      id: 6,
      name: "Manfrotto Befree Advanced",
      category: "Tripod",
      description: "Compact and lightweight travel tripod",
      price: 14990,
      originalPrice: 17990,
      discount: 17,
      image: "https://images.pexels.com/photos/385998/pexels-photo-385998.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "Value Pick"
    }
  ];
  
  // DOM Elements
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.navbar nav');
    
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      });
    }
    
    // Initialize price filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get min and max price values
          const minPrice = parseInt(this.getAttribute('data-min'));
          const maxPrice = parseInt(this.getAttribute('data-max'));
          
          // Filter and render products
          renderProducts(minPrice, maxPrice);
        });
      });
      
      // Render all products initially
      renderProducts(0, 1000000);
    }
    
    // Initialize category cards
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length) {
      categoryCards.forEach(card => {
        card.addEventListener('click', function() {
          const category = this.getAttribute('data-category');
          navigateToProductsPage(category);
        });
      });
    }
    
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        
        // Show success message
        alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
        this.reset();
      });
    }
    
    // Initialize newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
      });
    }
  });
  
  // Render products based on price filter
  function renderProducts(minPrice, maxPrice) {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;
    
    // Clear current products
    productsContainer.innerHTML = '';
    
    // Filter products by price
    const filteredProducts = products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
    
    // Show message if no products found
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-products-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p>No products found in this price range.</p>
        </div>
      `;
      return;
    }
    
    // Render filtered products
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      // Format prices
      const formattedPrice = formatPrice(product.price);
      const formattedOriginalPrice = formatPrice(product.originalPrice);
      
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-category">${product.category}</div>
          <div class="product-price">
            <div>
              <span class="price-current">₹${formattedPrice}</span>
              <span class="price-original">₹${formattedOriginalPrice}</span>
            </div>
            <span class="discount-tag">${product.discount}% OFF</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">View Details</button>
            <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
      
      productsContainer.appendChild(productCard);
    });
  }
  
  // Format price with commas for Indian Rupees
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // Navigate to products page with category filter
  function navigateToProductsPage(category) {
    // In a real application, this would navigate to a products page
    // For this example, we'll just show an alert
    alert(`Navigating to products page with category: ${category}`);
  }
  
  // View product details
  function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      alert(`Viewing details for ${product.name}`);
    }
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      alert(`${product.name} added to cart`);
    }
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });