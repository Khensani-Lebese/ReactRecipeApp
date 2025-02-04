import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onEdit }) => {
  useEffect(() => {
    console.log({ recipes });
    recipes.forEach(item => {
      console.log({ item });
    });
  }, [recipes]);

  if (recipes.length === 0) {
    return <p>No recipes available in this category.</p>;
  }

  return (
    <>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe._id} 
          recipe={recipe}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default RecipeList;