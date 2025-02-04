import React, { useState } from "react";
import { api } from "../../services/api";
import styled from "styled-components";

// Styled components for the RecipeForm
const RecipeFormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-in-out;

  h2 {
    text-align: center;
    color: #fff;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  input,
  textarea,
  select {
    padding: 12px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #ff7e5f;
      box-shadow: 0 0 5px rgba(255, 126, 95, 0.5);
    }
  }

  button {
    padding: 12px;
    font-size: 1rem;
    border: none;
    background-color: #ff7e5f;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #feb47b;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const RecipeForm = ({ recipe, onSave }) => {
  const [name, setName] = useState(recipe?.name || "");
  const [ingredients, setIngredients] = useState(recipe?.ingredients || "");
  const [instructions, setInstructions] = useState(recipe?.instructions || "");
  const [category, setCategory] = useState(recipe?.category || "");
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || "");
  const [cookTime, setCookTime] = useState(recipe?.cookTime || "");
  const [servings, setServings] = useState(recipe?.servings || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const categories = ["Breakfast", "Lunch", "Dinner"];
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const newRecipe = {
      name,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
      servings,
      userId: user.id, // Associate the recipe with the logged-in user
    };
    try {
      if (recipe) {
        await api.patch(`/recipes/${recipe.id}`, newRecipe);
      } else {
        await api.post("/recipes", newRecipe);
      }
      onSave();
    } catch (err) {
      setError("An error occurred while saving the recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeFormContainer>
      <h2>{recipe ? "Edit Recipe" : "New Recipe"}</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Preparation Time"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cooking Time"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Recipe"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </RecipeFormContainer>
  );
};

export default RecipeForm;
