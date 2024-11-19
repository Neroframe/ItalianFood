document.addEventListener("DOMContentLoaded", () => {
  const dishes = [
    {
      name: "Spaghetti",
      ingredients: ["Durum Wheat Semolina", "Water"],
      price: 8.99,
      isVegetarian: true,
      image: "assets/images/spaghetti.jpg",
      description: "Long, thin strands, often paired with tomato sauces.",
      ratings: 0,
      totalRatings: 0,
    },
    {
      name: "Fusilli",
      ingredients: ["Durum Wheat Semolina", "Water"],
      price: 9.99,
      isVegetarian: true,
      image: "assets/images/fusilli.jpg",
      description: "Twisted shapes that hold thick, creamy sauces.",
      ratings: 0,
      totalRatings: 0,
    },
    {
      name: "Penne",
      ingredients: ["Durum Wheat Semolina", "Water"],
      price: 7.99,
      isVegetarian: true,
      image: "assets/images/penne.jpg",
      description: "Tube-like pasta, great for baked dishes.",
      ratings: 0,
      totalRatings: 0,
    },
  ];

  let currentLanguage = "en";

  function displayDishes(dishList) {
    const dishesContainer = document.getElementById("dishes-container");
    if (!dishesContainer) return;
    dishesContainer.innerHTML = "";

    dishList.forEach((dish, index) => {
      const dishCard = document.createElement("div");
      dishCard.classList.add("dish-card", "col-lg-4", "mb-4", "animate");
      dishCard.setAttribute("tabindex", "0");

      const dishImage = document.createElement("img");
      dishImage.src = dish.image;
      dishImage.alt = dish.name;
      dishImage.classList.add("dish-image");
      dishCard.appendChild(dishImage);

      const dishName = document.createElement("h5");
      dishName.textContent = dish.name;
      dishCard.appendChild(dishName);

      const dishDescription = document.createElement("p");
      dishDescription.textContent = dish.description;
      dishDescription.classList.add("dish-description");
      dishCard.appendChild(dishDescription);

      const readMoreBtn = document.createElement("button");
      readMoreBtn.textContent = "Read More";
      readMoreBtn.classList.add("read-more-btn", "btn", "btn-info");
      dishCard.appendChild(readMoreBtn);

      // Hidden extended description
      const extendedDescription = document.createElement("div");
      extendedDescription.classList.add("extended-description");
      extendedDescription.style.display = "none";

      const ingredientsTitle = document.createElement("h6");
      ingredientsTitle.textContent = "Ingredients:";
      extendedDescription.appendChild(ingredientsTitle);

      const ingredientsList = document.createElement("ul");
      dish.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
      extendedDescription.appendChild(ingredientsList);

      dishCard.appendChild(extendedDescription);

      // Rating stars
      const ratingContainer = document.createElement("div");
      ratingContainer.classList.add("rating-container", "mt-2");
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.textContent = "★";
        star.setAttribute("data-rating", i);
        ratingContainer.appendChild(star);
      }
      dishCard.appendChild(ratingContainer);

      dishesContainer.appendChild(dishCard);

      readMoreBtn.addEventListener("click", () => {
        if (extendedDescription.style.display === "none") {
          extendedDescription.style.display = "block";
          readMoreBtn.textContent = "Read Less";
        } else {
          extendedDescription.style.display = "none";
          readMoreBtn.textContent = "Read More";
        }
      });

      const stars = ratingContainer.querySelectorAll(".star");
      stars.forEach((star) => {
        star.addEventListener("click", () => {
          const rating = parseInt(star.getAttribute("data-rating"));
          dish.ratings += rating;
          dish.totalRatings += 1;
          updateStars(stars, rating);
        });
      });

      // Hover on image
      dishImage.addEventListener("mouseover", () => {
        dishImage.style.transform = "scale(1.05)";
      });
      dishImage.addEventListener("mouseout", () => {
        dishImage.style.transform = "scale(1)";
      });
    });
  }

  function updateStars(stars, rating) {
    stars.forEach((star) => {
      if (parseInt(star.getAttribute("data-rating")) <= rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  function handleLanguageSelection() {
    const languageSelector = document.getElementById("language-selector");
    if (!languageSelector) return;
    languageSelector.addEventListener("change", (event) => {
      currentLanguage = event.target.value;
      loadLanguage(currentLanguage);
    });
  }

  function loadLanguage(language) {
    alert(`Language changed to ${language.toUpperCase()}`);
  }

  function chefsSurprise() {
    const surpriseButton = document.getElementById("surprise-button");
    if (!surpriseButton) return;
    surpriseButton.addEventListener("click", () => {
      const audio = new Audio("assets/sounds/surprise.wav");
      audio.play();
      getSurpriseDish();
    });
  }

  function getSurpriseDish() {
    const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    displaySurpriseDish(randomDish);
  }

  function displaySurpriseDish(dish) {
    const surpriseContainer = document.getElementById("surprise-container");
    if (!surpriseContainer) return; // Prevent errors if element doesn't exist
    surpriseContainer.innerHTML = `
      <h2>${dish.name}</h2>
      <img src="${dish.image}" alt="${dish.name}" class="surprise-image w-75">
      <p>${dish.description}</p>
    `;
  }

  function handleReservationForm() {
    const reservationForm = document.getElementById("reservation-form");
    if (!reservationForm) return;
    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(reservationForm);
      setTimeout(() => {
        displaySuccessMessage();
      }, 500);
    });
  }

  function displaySuccessMessage() {
    const messageContainer = document.getElementById("message-container");
    if (!messageContainer) return;
    messageContainer.textContent = "Reservation successful! Thank you.";
    messageContainer.style.color = "green";
  }

  function handleGreeting() {
    const nameInput = document.getElementById("name-input");
    const greeting = document.getElementById("greeting");
    if (!nameInput || !greeting) return;
    nameInput.addEventListener("change", () => {
      greeting.textContent = `Buongiorno, ${nameInput.value}!`;
    });
  }

  function handleKeyboardNavigation() {
    const dishCards = document.querySelectorAll(".dish-card");
    if (dishCards.length === 0) return;
    let currentIndex = 0;
    dishCards[currentIndex].focus();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % dishCards.length;
        dishCards[currentIndex].focus();
      } else if (event.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + dishCards.length) % dishCards.length;
        dishCards[currentIndex].focus();
      }
    });
  }

  function initScrollAnimations() {
    const dishElements = document.querySelectorAll(".dish-card");
    if (dishElements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    });
    dishElements.forEach((element) => {
      observer.observe(element);
    });
  }

  if (document.getElementById("dishes-container")) {
    displayDishes(dishes);
  }

  handleLanguageSelection();
  chefsSurprise();
  handleReservationForm();
  handleGreeting();
  handleKeyboardNavigation();
  initScrollAnimations();
});
