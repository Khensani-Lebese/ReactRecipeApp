import React, { useState, useEffect } from "react";
import RecipeList from "../components/Recipes/RecipeList";
import RecipeForm from "../components/Recipes/RecipeForm";
import Footer from "../components/navigation/Footer";
import { api } from "../services/api";
import { FaEgg, FaUtensils, FaPizzaSlice } from "react-icons/fa";
import styled from "styled-components";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SearchAddContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddRecipeButton = styled.button`
  padding: 10px 20px;
  background-color: #ff7f50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #ff4500;
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff7f50;
    color: white;
  }

  svg {
    font-size: 2rem;
    margin-bottom: 5px;
  }
`;

const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const categories = [
    { name: "Breakfast", icon: <FaEgg /> },
    { name: "Lunch", icon: <FaUtensils /> },
    { name: "Dinner", icon: <FaPizzaSlice /> },
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await api.get("/recipes");
        setRecipes(result.data);
        setFilteredRecipes(result.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          (!selectedCategory || recipe.category === selectedCategory) &&
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, selectedCategory, recipes]);

  return (
    <HomePageContainer>
      <Header>Recipe Management</Header>
      <SearchAddContainer>
        <SearchInput
          type="text"
          placeholder="Search by recipe name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddRecipeButton onClick={() => setFormVisible(true)}>
          Add New Recipe
        </AddRecipeButton>
      </SearchAddContainer>
      {!isFormVisible && (
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon}
              <span>{category.name}</span>
            </CategoryCard>
          ))}
        </CategoryContainer>
      )}
      {isFormVisible ? (
        <RecipeForm
          recipe={selectedRecipe}
          onSave={() => setFormVisible(false)}
        />
      ) : (
        <RecipeList
          recipes={filteredRecipes}
          onEdit={(recipe) => {
            setSelectedRecipe(recipe);
            setFormVisible(true);
          }}
        />
      )}
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage;
