  // Cart functionality
  const addButtons = document.querySelectorAll('.button.add');
  const cartTable = document.getElementById('cart-table');
  const cartTotal = document.getElementById('cart-total');
  let cart = {};

  addButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const courseDiv = button.closest('.course');
      const courseId = courseDiv.querySelector('h2').textContent;
      const courseFee = parseFloat(courseDiv.querySelector('h3 p').textContent);
      const courseQuantity = parseInt(courseDiv.querySelector('.quantity-input').value);

      if (cart[courseId]) {
        cart[courseId].quantity += courseQuantity;
      } else {
        cart[courseId] = { fee: courseFee, quantity: courseQuantity };
      }

      updateCart();
    });
  });

  function updateCart() {
    cartTable.innerHTML = '';
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
      total += item.fee * item.quantity;
    }
    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll('.remove').forEach(button => {
      button.addEventListener('click', () => {
        const courseId = button.getAttribute('data-course');
        delete cart[courseId];
        updateCart();
      });
    });
  }

  function checkout() {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Thank you for your purchase! Total: $' + cartTotal.textContent);
    clearCart();
  }

  function clearCart() {
    cart = {};
    updateCart();
  }

  // Cookie functions
  const usernameCookieName = "username";
  const passwordCookieName = "password";

  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function checkCookie() {
    const username = getCookie(usernameCookieName);
    if (username) {
      document.getElementById("login-signup-link").innerHTML = "Welcome " + username + " & Sign out";
    }
  }

  function navigationClick() {
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", event => {
        if (link.href.includes("courseware.html") && !getCookie(usernameCookieName)) {
          event.preventDefault();
          window.location.href = "login.html";
        }
      });
    });
  }

  function registerFormSubmit() {
    document.getElementById("register-form").addEventListener("submit", event => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      setCookie(usernameCookieName, username, 7);
      setCookie(passwordCookieName, password, 7);
      window.location.href = "login.html";
    });
  }

  function loginFormSubmit() {
    document.getElementById("login-form").addEventListener("submit", event => {
      event.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;
      if (username === getCookie(usernameCookieName) && password === getCookie(passwordCookieName)) {
        window.location.href = "index.html";
      } else {
        alert("Incorrect username or password");
      }
    });
  }

  function loginRegisterButtonClick() {
    document.querySelector("#login-form button:not([type='submit'])").addEventListener("click", event => {
      event.preventDefault();
      window.location.href = "register.html";
    });
  }

  function indexNavigationClick() {
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", event => {
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

  function indexLoginSignupClick() {
    document.getElementById("login-signup-link").addEventListener("click", event => {
      event.preventDefault();
      window.location.href = "login.html";
    });
  }

  function validateForm() {
    const form = document.forms["enquiryForm"];
    const name = form["name"].value;
    const email = form["email"].value;
    const course = form["course"].value;
    const age = form["age"].value;
    const major = form["major"].value;
    const gender = form["gender"].value;

    if (name && email && course && age && major && gender) {
      window.location.href = "login.html";
      return false;
    } else {
      alert("Please fill all the fields.");
      return false;
    }
  }

  function redirectToRegister(event) {
    event.preventDefault();
    window.location.href = "register.html";
  }

  function initIndexPage() {
    checkCookie();
    indexNavigationClick();
    indexLoginSignupClick();
  }

  function initRegisterPage() {
    registerFormSubmit();
  }

  function initLoginPage() {
    loginFormSubmit();
    loginRegisterButtonClick();
  }

  function initPage() {
    const path = window.location.pathname;
    if (path.includes("index.html")) {
      initIndexPage();
    } else if (path.includes("register.html")) {
      initRegisterPage();
    } else if (path.includes("login.html")) {
      initLoginPage();
    } else {
      navigationClick();
    }

    // Check login status on specific pages
    const pagesToCheck = [
      '/courseware.html'
    ];
    const currentPage = path.replace(/^\//, '');
    if (pagesToCheck.includes(currentPage)) {
      checkCookie();
    }
  }

  window.onload = initPage;

  document.querySelector('.btns_more')?.addEventListener('click', () => {
    window.location.href = 'page7.html';
  });
