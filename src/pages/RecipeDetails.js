// src/pages/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await api.get(`/recipes/${id}`);
      setRecipe(result.data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
      <div className="recipe-detail-info">
        <h2>{recipe.name}</h2>
        <h4>Category: {recipe.category}</h4>
        <p>Prep Time: {recipe.prepTime}</p>
        <p>Cook Time: {recipe.cookTime}</p>
        <p>Servings: {recipe.servings}</p>
        <h4>Ingredients:</h4>
        <p>{recipe.ingredients}</p>
        <h4>Instructions:</h4>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
