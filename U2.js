// 获取所有添加按钮
const addButtons = document.querySelectorAll('.button.add');

// 获取购物车表格和总金额元素
const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');

// 购物车对象，用来存储课程及其数量
let cart = {};

// 为每个“添加”按钮绑定事件
addButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // 获取课程信息
    const courseDiv = button.closest('.course');
    const courseId = courseDiv.querySelector('h2').textContent;
    const courseFee = parseFloat(courseDiv.querySelector('h3 p').textContent);
    const courseQuantity = parseInt(courseDiv.querySelector('.quantity-input').value);

    // 如果课程已经在购物车中，更新数量
    if (cart[courseId]) {
      cart[courseId].quantity += courseQuantity;
    } else {
      cart[courseId] = {
        fee: courseFee,
        quantity: courseQuantity
      };
    }

    // 更新购物车界面
    updateCart();
  });
});

// 更新购物车界面
function updateCart() {
  // 清空购物车表格
  cartTable.innerHTML = '';

  // 遍历购物车对象，更新表格
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

    // 计算总金额
    total += item.fee * item.quantity;
  }

  // 更新总金额显示
  cartTotal.textContent = total.toFixed(2);

  // 为每个移除按钮绑定事件
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const courseId = button.getAttribute('data-course');
      delete cart[courseId]; // 移除购物车中的课程
      updateCart(); // 重新更新购物车
    });
  });
}

// 结账功能
function checkout() {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty.');
    return;
  }
  alert('Thank you for your purchase! Total: $' + cartTotal.textContent);
  clearCart();
}

// 清空购物车功能
function clearCart() {
  cart = {};
  updateCart();
}

// 定义全局变量
var usernameCookieName = "username";
var passwordCookieName = "password";

// 获取cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// 设置cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 检查cookie中是否有用户名
function checkCookie() {
    var username = getCookie(usernameCookieName);
    if (username) {
        document.getElementById("login-signup-link").innerHTML = "Welcome " + username + " & Sign out";
    }
}

// 导航栏点击事件
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

// 注册表单提交事件
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

// 登录表单提交事件
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

// 登录页面注册按钮点击事件
function loginRegisterButtonClick() {
    document.querySelector("#login-form button:not([type='submit'])").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "register.html";
    });
}

// 首页导航栏点击事件
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

// 首页点击登录注册链接
function indexLoginSignupClick() {
    document.getElementById("login-signup-link").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "login.html";
    });
}

// 首页检查登录状态
function indexCheckLogin() {
    checkCookie();
    indexNavigationClick();
    indexLoginSignupClick();
}

// 首页初始化
function initIndexPage() {
    indexCheckLogin();
}

// 注册页面初始化
function initRegisterPage() {
    registerFormSubmit();
}

// 登录页面初始化
function initLoginPage() {
    loginFormSubmit();
    loginRegisterButtonClick();
}

// 根据页面加载不同的初始化函数
function initPage() {
    var path = window.location.pathname;
    if (path.includes("index.html")) {
        initIndexPage();
    } else if (path.includes("register.html")) {
        initRegisterPage();
    } else if (path.includes("login.html")) {
        initLoginPage();
    } else {
        navigationClick(); // 确保在其他页面也调用 navigationClick 函数
    }
}

// 页面加载完成后初始化
window.onload = initPage;

















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