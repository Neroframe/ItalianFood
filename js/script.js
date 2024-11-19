document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  const categories = document.querySelectorAll(".category-btn");
  const recipeList = document.getElementById("recipe-list");

  const fetchRecipes = async (category) => {
    const storageKey = `recipes_${category}`;
    const cachedRecipes = localStorage.getItem(storageKey);

    if (cachedRecipes) {
      try {
        const recipes = JSON.parse(cachedRecipes);
        console.log(`Loaded ${category} recipes from cache.`);
        displayRecipes(recipes);
        return;
      } catch (error) {
        console.error("Error parsing cached data:", error);
        localStorage.removeItem(storageKey);
      }
    }

    // If no cached data, fetch from the API
    try {
      recipeList.innerHTML = `<div class="loader"></div>`;

      const response = await fetch(
        `${BASE_URL}${encodeURIComponent(category)}`
      );
      if (!response.ok) throw new Error("Failed to fetch recipes");

      const data = await response.json();
      displayRecipes(data.meals);

      // Store the fetched recipes
      if (data.meals) {
        localStorage.setItem(storageKey, JSON.stringify(data.meals));
        console.log(`Fetched and cached ${category} recipes.`);
      }
    } catch (error) {
      recipeList.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      console.error("Fetch Error:", error);
    }
  };

  const displayRecipes = (recipes) => {
    recipeList.innerHTML = ""; // Clear previous recipes

    if (!recipes) {
      recipeList.innerHTML = "<p>No recipes found for this category.</p>";
      return;
    }

    recipes.forEach((recipe) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      recipeDiv.innerHTML = `
            <h3>${recipe.strMeal}</h3>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
            <p><a href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank">View Recipe</a></p>
          `;

      recipeList.appendChild(recipeDiv);
    });
  };

  categories.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      fetchRecipes(category);
    });
  });
});
