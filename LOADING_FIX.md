# Sequential Loading Fix: Food App First, Then Rider Portal

## THE PROBLEM
Both the **Food App** and **Rider Portal** are loading together at startup. You want them to load sequentially:
1. **Food App loads first**
2. **Rider Portal loads only when user clicks "Portal" button**

## THE SOLUTION
Add this to your JavaScript initialization section (at the end of your `<script>` tag, before `</body>`):

```javascript
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
    document.getElementById('food-app-section').style.display = 'block';
    
    // Call your existing food app initialization functions here
    // Example: loadRestaurants(), initCart(), etc.
    
    appsInitialized.food = true;
    console.log('✅ Food App initialized');
}

// Initialize Rider Portal on demand
function initRiderPortal() {
    if (appsInitialized.rider) return;
    console.log('🏍️ Initializing Rider Portal...');
    
    // Show main header and portal elements
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('sidebar').setAttribute('data-ready', 'true');
    
    // Call your existing rider portal initialization functions here
    // Example: loadRiderData(), initMap(), etc.
    
    appsInitialized.rider = true;
    console.log('✅ Rider Portal initialized');
}

// Update your switchToRiderPortal function
function switchToRiderPortal() {
    console.log('Switching to Rider Portal...');
    
    // Hide food app
    document.getElementById('food-app-section').style.display = 'none';
    
    // Show rider portal
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('sidebar').style.display = 'flex';
    
    // Initialize rider portal if not already done
    initRiderPortal();
}

// Update your bnavGoHome or goHome function to go back to food
function goHome(element) {
    console.log('Going back to Food App...');
    
    // Hide rider portal
    document.getElementById('main-header').classList.add('hidden');
    document.getElementById('sidebar').style.display = 'none';
    
    // Show food app
    document.getElementById('food-app-section').style.display = 'block';
    
    // Set active nav item
    if (element) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }
}

// Call this when page loads (add to your existing onload or DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - initializing Food App first...');
    initFoodApp();
    
    // Rider Portal will be initialized only when user clicks "Portal" button
});
```

## STEP-BY-STEP CHANGES

### 1. **Hide Rider Portal Elements on Start**
Find this line in your HTML (around line 747):
```html
<div id="food-app-section" style="display:none;">
```

Keep it as is (it's already hidden).

### 2. **Hide Main Header Initially**
Find this line (around line 701):
```html
<header class="bg-white shadow-sm z-30 px-4 py-3 flex justify-between items-center hidden" id="main-header">
```

Make sure it has `hidden` class (already there ✓).

### 3. **Add the Control Functions**
Add the JavaScript code above to the END of your `<script>` section before `</body>`.

### 4. **Update Your Navigation Buttons**

**Line 1000** - "Portal" button should call `switchToRiderPortal()`:
```html
<button class="bnav-item" id="bnavAdmin" onclick="switchToRiderPortal()"><i class="fas fa-motorcycle"></i><span>Portal</span></button>
```
✓ This is already correct!

**For going back to Food**, update your "Home" button or any function that goes back:
```html
<button class="bnav-item active" id="bnavHome" onclick="goHome(this)"><i class="fas fa-house"></i><span>Home</span></button>
```

## RESULT

✅ **Page Load Flow:**
1. Page loads → Food App initializes
2. User sees restaurants & products (no portal yet)
3. User clicks "Portal" button → Rider Portal loads
4. User clicks "Home" button → Back to Food App

🎯 **Performance Benefit:**
- Food App loads faster
- Portal only loads when needed
- Smoother user experience

---

**Need help implementing?** Let me know if you need me to show you exactly where to add this code in your file! 👍

