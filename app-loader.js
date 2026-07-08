// ===== SEQUENTIAL LOADING CONTROL =====
let appsInitialized = {
    food: false,
    rider: false
};

// Initialize Food App on page load
function initFoodApp() {
    if (appsInitialized.food) return;
    console.log('📦 Initializing Food App...');
    
    // Show food app section
    const foodSection = document.getElementById('food-app-section');
    if (foodSection) {
        foodSection.style.display = 'block';
    }
    
    // Call your existing food app initialization functions here
    // Example: loadRestaurants(), initCart(), etc.
    // loadRestaurants();
    
    appsInitialized.food = true;
    console.log('✅ Food App initialized');
}

// Initialize Rider Portal on demand
function initRiderPortal() {
    if (appsInitialized.rider) return;
    console.log('🏍️ Initializing Rider Portal...');
    
    // Show main header and portal elements
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.classList.remove('hidden');
    }
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.setAttribute('data-ready', 'true');
    }
    
    // Call your existing rider portal initialization functions here
    // Example: loadRiderData(), initMap(), etc.
    // loadRiderData();
    
    appsInitialized.rider = true;
    console.log('✅ Rider Portal initialized');
}

// Updated switchToRiderPortal function
function switchToRiderPortal() {
    console.log('🔄 Switching to Rider Portal...');
    
    // Hide food app
    const foodSection = document.getElementById('food-app-section');
    if (foodSection) {
        foodSection.style.display = 'none';
    }
    
    // Show rider portal
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.classList.remove('hidden');
    }
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = 'flex';
    }
    
    // Initialize rider portal if not already done
    initRiderPortal();
    
    // Update active navigation
    updateBottomNav('portal');
}

// Go back to Food App
function bnavGoHome() {
    console.log('🍽️ Going back to Food App...');
    
    // Hide rider portal
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        mainHeader.classList.add('hidden');
    }
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    
    // Show food app
    const foodSection = document.getElementById('food-app-section');
    if (foodSection) {
        foodSection.style.display = 'block';
    }
    
    // Update active navigation
    updateBottomNav('home');
}

// Update bottom navigation active state
function updateBottomNav(tab) {
    // Remove active from all nav items
    document.querySelectorAll('.bnav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active to selected nav item
    if (tab === 'home') {
        const homeBtn = document.getElementById('bnavHome');
        if (homeBtn) homeBtn.classList.add('active');
    } else if (tab === 'portal') {
        const portalBtn = document.getElementById('bnavAdmin');
        if (portalBtn) portalBtn.classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('⏳ Page loaded - initializing Food App first...');
    initFoodApp();
    console.log('✅ Setup complete! Food App is ready. Rider Portal will load on demand.');
});

// Also handle window load event
window.addEventListener('load', function() {
    // Ensure food app is initialized
    if (!appsInitialized.food) {
        initFoodApp();
    }
});
