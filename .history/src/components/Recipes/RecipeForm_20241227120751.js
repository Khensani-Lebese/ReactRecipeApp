import React, { useState } from 'react';
import { api } from '../../services/api';
import './RecipeForm.css';
const RecipeForm = ({ recipe, onSave }) => {
  const [name, setName] = useState(recipe?.name || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients || '');
  const [instructions, setInstructions] = useState(recipe?.instructions || '');
  const [category, setCategory] = useState(recipe?.category || '');
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || '');
  const [cookTime, setCookTime] = useState(recipe?.cookTime || '');
  const [servings, setServings] = useState(recipe?.servings || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const categories = ['Breakfast', 'Lunch', 'Dinner'];
  const user = JSON.parse(localStorage.getItem('user'));
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const newRecipe = {
      name,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
      servings,
      userId: user.id // Associate the recipe with the logged-in user
    };
    try {
      if (recipe) {
        await api.patch(`/recipes/${recipe.id}`, newRecipe);
      } else {
        await api.post('/recipes', newRecipe);
      }
      onSave();
    } catch (err) {
      setError('An error occurred while saving the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="recipe-form-container">
      <h2>New Recipe</h2>
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
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
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
          {loading ? 'Saving...' : 'Save Recipe'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
export default RecipeForm;