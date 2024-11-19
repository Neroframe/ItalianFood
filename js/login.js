document.addEventListener("DOMContentLoaded", () => {
  /**
   * ===============================
   * 1. Theme Switching
   * ===============================
   */

  const themeSwitch = document.getElementById("theme-switch");

  const applyTheme = () => {
    const isNightMode = localStorage.getItem("nightMode") === "true";
    if (isNightMode) {
      document.body.classList.add("night-mode");
    } else {
      document.body.classList.remove("night-mode");
    }
  };

  // Apply Theme on Page Load
  applyTheme();

  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      const isNightMode = localStorage.getItem("nightMode") === "true";
      if (isNightMode) {
        document.body.classList.remove("night-mode");
        localStorage.setItem("nightMode", "false");
      } else {
        document.body.classList.add("night-mode");
        localStorage.setItem("nightMode", "true");
      }
    });
  }

  /**
   * ===============================
   * 2. Authentication Management
   * ===============================
   */

  const loginButton = document.getElementById("login-button");
  const registerButton = document.getElementById("register-button");
  const authButton = document.getElementById("auth-button");

  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");

  const loginClose = document.getElementById("login-close");
  const registerClose = document.getElementById("register-close");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const authMessage = document.getElementById("auth-message");
  const registerMessage = document.getElementById("register-message");

  // Initialize Users Array with an admin
  const defaultAdmin = {
    username: "admin",
    password: "admin123",
    name: "Administrator",
    email: "admin@example.com",
    phone: "1234567890",
  };
  let users = JSON.parse(localStorage.getItem("users")) || [defaultAdmin];
  localStorage.setItem("users", JSON.stringify(users));

  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let currentUser = localStorage.getItem("currentUser") || null;

  function updateAuthStatus() {
    const storedUser = localStorage.getItem("currentUser");
    const storedStatus = localStorage.getItem("isLoggedIn") === "true";

    if (storedStatus && storedUser) {
      isLoggedIn = true;
      currentUser = storedUser;
    } else {
      isLoggedIn = false;
      currentUser = null;
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("currentUser");
    }

    // Update UI
    if (isLoggedIn) {
      if (loginButton) loginButton.style.display = "none";
      if (registerButton) registerButton.style.display = "none";
      if (authButton) {
        authButton.textContent = "Logout";
        authButton.style.display = "inline-block";
      }
    } else {
      if (loginButton) loginButton.style.display = "inline-block";
      if (registerButton) registerButton.style.display = "inline-block";
      if (authButton) authButton.style.display = "none";
    }
  }

  updateAuthStatus();

  // Event listener for auth forms
  if (loginButton && loginModal && loginClose && loginForm) {
    loginButton.addEventListener("click", () => {
      loginModal.style.display = "flex";
      authMessage.textContent = "";
      loginForm.reset();
    });

    loginClose.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  }

  if (registerButton && registerModal && registerClose && registerForm) {
    registerButton.addEventListener("click", () => {
      console.log("Register button clicked!");
      registerModal.style.display = "flex";
      registerMessage.textContent = "";
      registerForm.reset();
    });

    registerClose.addEventListener("click", () => {
      registerModal.style.display = "none";
    });
  }

  // Close modals if clicked outside
  window.addEventListener("click", (event) => {
    if (loginModal && event.target === loginModal) {
      loginModal.style.display = "none";
    }
    if (registerModal && event.target === registerModal) {
      registerModal.style.display = "none";
    }
  });

  // Utils
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[@$!%*?#&]/.test(password)) return false;
    return true;
  }

  // Registration
  if (registerForm && registerMessage) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const phone = document.getElementById("register-phone").value.trim();
      const username = document
        .getElementById("register-username")
        .value.trim();
      const password = document
        .getElementById("register-password")
        .value.trim();

      // Validation
      if (!name || !email || !phone || !username || !password) {
        registerMessage.textContent = "All fields are required.";
        registerMessage.style.color = "red";
        return;
      }

      if (!validateEmail(email)) {
        registerMessage.textContent = "Invalid email format.";
        registerMessage.style.color = "red";
        return;
      }

      if (!validatePhone(phone)) {
        registerMessage.textContent =
          "Invalid phone number format. Enter 10 digits.";
        registerMessage.style.color = "red";
        return;
      }

      if (!validatePassword(password)) {
        registerMessage.textContent =
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
        registerMessage.style.color = "red";
        return;
      }

      // Check if username exists
      if (users.find((user) => user.username === username)) {
        registerMessage.textContent =
          "Username already exists. Please choose another.";
        registerMessage.style.color = "red";
        return;
      }

      const newUser = { username, password, name, email, phone };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      registerMessage.textContent =
        "Registration successful! You can now log in.";
      registerMessage.style.color = "green";
      registerForm.reset();

      // registerModal.style.display = "none";
    });
  }

  // Login
  if (loginForm && authMessage) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        isLoggedIn = true;
        currentUser = username;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", currentUser);
        loginModal.style.display = "none";
        alert("Login successful!");
        updateAuthStatus();
        window.location.href = "profile.html";
      } else {
        authMessage.textContent = "Invalid credentials. Please try again.";
        authMessage.style.color = "red";
      }
    });
  }

  // Logout
  if (authButton) {
    authButton.addEventListener("click", () => {
      if (isLoggedIn) {
        isLoggedIn = false;
        currentUser = null;
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("currentUser");
        alert("You have been logged out.");
        updateAuthStatus();
        window.location.href = "index.html";
      }
    });
  }

  /**
   * ===============================
   * 3. Profile Management
   * ===============================
   */

  const profileButton = document.getElementById("profile-button");

  if (profileButton) {
    if (!isLoggedIn) {
      profileButton.style.display = "none"; // Hide profile button if not logged in
    } else {
      profileButton.style.display = "inline-block"; // Show profile button if logged in
    }

    profileButton.addEventListener("click", () => {
      if (isLoggedIn) {
        window.location.href = "profile.html";
      } else {
        alert("You need to log in to access your profile.");
      }
    });
  }

  function displayUserProfile() {
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profilePhone = document.getElementById("profile-phone");
    const profileUsername = document.getElementById("profile-username");

    if (profileName && profileEmail && profilePhone && profileUsername) {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        window.location.href = "index.html";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.username === currentUser);

      if (!user) {
        window.location.href = "index.html";
        return;
      }

      // Populate profile
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
      profilePhone.textContent = user.phone;
      profileUsername.textContent = user.username;
    }
  }

  displayUserProfile();
});
