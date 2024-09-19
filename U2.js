/'James Renhuaiyuan 223190623'/
// Get all "Add" buttons
const addButtons = document.querySelectorAll('.button.add');

// Get the cart table and total amount element
const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');

// Cart object to store courses and their quantities
let cart = {};

// Attach event listener to each "Add" button
addButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Get course information
    const courseDiv = button.closest('.course');
    const courseId = courseDiv.querySelector('h2').textContent;
    const courseFee = parseFloat(courseDiv.querySelector('h3 p').textContent);
    const courseQuantity = parseInt(courseDiv.querySelector('.quantity-input').value);

    // If the course is already in the cart, update the quantity
    if (cart[courseId]) {
      cart[courseId].quantity += courseQuantity;
    } else {
      // Add new course to the cart
      cart[courseId] = {
        fee: courseFee,
        quantity: courseQuantity
      };
    }

    // Update the cart display
    updateCart();
  });
});

// Function to update the cart display
function updateCart() {
  // Clear the cart table
  cartTable.innerHTML = '';

  // Iterate through the cart object and update the table
  let total = 0;
  for (const courseId in cart) {
    const item = cart[courseId];
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${courseId}</td>
      <td>$${item.fee}</td>
      <td>${item.quantity}</td>
      <td>$${(item.fee * item.quantity).toFixed(2)}</td>
      <td><button class="remove" data-course="${courseId}">Remove</button></td>
    `;
    cartTable.appendChild(row);

    // Calculate the total amount
    total += item.fee * item.quantity;
  }

  // Update the total amount display
  cartTotal.textContent = total.toFixed(2);

  // Attach event listener to each "Remove" button
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const courseId = button.getAttribute('data-course');
      delete cart[courseId]; // Remove the course from the cart
      updateCart(); // Refresh the cart display
    });
  });
}

// Checkout function
function checkout() {
  // If the cart is empty, show an alert
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty.');
    return;
  }
  // Display a thank you message and the total amount
  alert('Thank you for your purchase! Total: $' + cartTotal.textContent);
  clearCart(); // Clear the cart after checkout
}

// Function to clear the cart
function clearCart() {
  cart = {}; // Reset the cart object
  updateCart(); // Refresh the cart display
}









// Define global variables
var usernameCookieName = "username";
var passwordCookieName = "password";

// Get cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Set cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Check if username exists in cookies
function checkCookie() {
    var username = getCookie(usernameCookieName);
    if (username) {
        document.getElementById("login-signup-link").innerHTML = "Welcome " + username + " & Sign out";
    }
}

// Navigation bar click event
function navigationClick() {
    document.querySelectorAll("nav a").forEach(function(link) {
        link.addEventListener("click", function(event) {
            if (link.href.includes("courseware.html") && !getCookie(usernameCookieName)) {
                event.preventDefault();
                window.location.href = "login.html";
            }
        });
    });
}

// Register form submit event
function registerFormSubmit() {
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        setCookie(usernameCookieName, username, 7);
        setCookie(passwordCookieName, password, 7);
        window.location.href = "login.html";
    });
}

// Login form submit event
function loginFormSubmit() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("login-username").value;
        var password = document.getElementById("login-password").value;
        if (username === getCookie(usernameCookieName) && password === getCookie(passwordCookieName)) {
            window.location.href = "index.html";
        } else {
            alert("Incorrect username or password");
        }
    });
}

// Login page register button click event
function loginRegisterButtonClick() {
    document.querySelector("#login-form button:not([type='submit'])").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "register.html";
    });
}

// Index page navigation bar click event
function indexNavigationClick() {
    document.querySelectorAll("nav a").forEach(function(link) {
        link.addEventListener("click", function(event) {
            if (link.href.includes("courseware.html") && !getCookie(usernameCookieName)) {
                event.preventDefault();
                window.location.href = "login.html";
            } else if (link.href.includes("login.html")) {
                event.preventDefault();
                window.location.href = "login.html";
            }
        });
    });
}

// Index page login/signup link click event
function indexLoginSignupClick() {
    document.getElementById("login-signup-link").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "login.html";
    });
}

// Index page check login status
function indexCheckLogin() {
    checkCookie();
    indexNavigationClick();
    indexLoginSignupClick();
}

// Initialize index page
function initIndexPage() {
    indexCheckLogin();
}

// Initialize register page
function initRegisterPage() {
    registerFormSubmit();
}

// Initialize login page
function initLoginPage() {
    loginFormSubmit();
    loginRegisterButtonClick();
}

// Load different initialization functions based on the page
function initPage() {
    var path = window.location.pathname;
    if (path.includes("index.html")) {
        initIndexPage();
    } else if (path.includes("register.html")) {
        initRegisterPage();
    } else if (path.includes("login.html")) {
        initLoginPage();
    } else {
        navigationClick(); // Ensure navigationClick function is called on other pages
    }
}

// Initialize after the page loads
window.onload = initPage;




// Index page check login status
function indexCheckLogin() {
    var username = getCookie(usernameCookieName);
    if (!username) {
        alert("Please log in");
        window.location.href = "login.html"; // Redirect to login page after the alert
    } else {
        checkCookie(); // If logged in, update UI
    }
    indexNavigationClick();
    indexLoginSignupClick();
}






function validateForm() {
    // Get form values
    var name = document.forms["enquiryForm"]["name"].value;
    var email = document.forms["enquiryForm"]["email"].value;
    var course = document.forms["enquiryForm"]["course"].value;
    var age = document.forms["enquiryForm"]["age"].value;
    var major = document.forms["enquiryForm"]["major"].value;
    var gender = document.forms["enquiryForm"]["gender"].value;
    
    // Simple validation to ensure all fields are filled (HTML required attribute already ensures this)
    if (name && email && course && age && major && gender) {
        // After successful validation, redirect to the register page
        window.location.href = "login.html";
        return false; // Prevent form from actually submitting to backend
    } else {
        alert("Please fill all the fields.");
        return false; // Prevent form from submitting if validation fails
    }
}

function redirectToRegister(event) {
    event.preventDefault(); // Prevent form submission

    // Redirect to the register page
    window.location.href = "register.html";
}
