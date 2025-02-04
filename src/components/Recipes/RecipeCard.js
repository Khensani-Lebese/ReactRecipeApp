import React from "react";
import styled from "styled-components";
import { api } from "../../services/api";

// Styled Components
const Card = styled.div`
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  max-width: 400px;
  color: white;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 22px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h4`
  margin: 10px 0;
  font-size: 18px;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
`;

const Ingredient = styled.li`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Details = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: white;
    color: #ff7e5f;
  }
`;

const RecipeCard = ({ recipe, onEdit }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/recipes/${recipe._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [recipe.ingredients];

  return (
    <Card>
      <Title>{recipe.name}</Title>
      <SubTitle>Ingredients:</SubTitle>
      <IngredientsList>
        {ingredients.map((ingredient, index) => (
          <Ingredient key={index}>{ingredient}</Ingredient>
        ))}
      </IngredientsList>

      <Details>
        <strong>Instructions:</strong> {recipe.instructions}
      </Details>
      <Details>
        <strong>Category:</strong> {recipe.category}
      </Details>
      <Details>
        <strong>Preparation Time:</strong> {recipe.prepTime}
      </Details>
      <Details>
        <strong>Cooking Time:</strong> {recipe.cookTime}
      </Details>
      <Details>
        <strong>Servings:</strong> {recipe.servings}
      </Details>

      <Actions>
        <Button onClick={() => onEdit(recipe)}>Edit Recipe</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Actions>
    </Card>
  );
};

export default RecipeCard;
