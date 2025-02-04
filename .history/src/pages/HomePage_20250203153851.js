import React, { useState, useEffect } from "react";
import RecipeList from "../components/Recipes/RecipeList";
import RecipeForm from "../components/Recipes/RecipeForm";
import Footer from "../components/Shared/Footer";
import { api } from "../services/api";
import { FaCoffee, FaHamburger, FaUtensils } from "react-icons/fa";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SearchAddContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const AddRecipeButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background: ${({ active }) => (active ? "#007BFF" : "#f5f5f5")};
  color: ${({ active }) => (active ? "white" : "black")};
  transition: 0.3s;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { name: "Breakfast", icon: <FaCoffee size={30} /> },
    { name: "Lunch", icon: <FaHamburger size={30} /> },
    { name: "Dinner", icon: <FaUtensils size={30} /> },
  ];
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

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
    const updatedFilteredRecipes = recipes.filter((recipe) => {
      const matchesCategory = selectedCategory
        ? recipe.category === selectedCategory
        : true;
      const matchesName = recipe.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesName;
    });
    setFilteredRecipes(updatedFilteredRecipes);
  }, [searchTerm, selectedCategory, recipes]);

  const handleAddNewRecipe = () => {
    setSelectedRecipe(null);
    setFormVisible(true);
  };

  const handleSaveRecipe = async () => {
    setFormVisible(false);
    const result = await api.get("/recipes");
    setRecipes(result.data);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <PageContainer>
      <Title>Recipe Management</Title>
      <SearchAddContainer>
        <SearchInput
          type="text"
          placeholder="Search by recipe name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <AddRecipeButton onClick={handleAddNewRecipe}>
          Add New Recipe
        </AddRecipeButton>
      </SearchAddContainer>
      {!isFormVisible && (
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              active={selectedCategory === category.name}
              onClick={() => handleCategoryClick(category)}
            >
              {category.icon}
              <span>{category.name}</span>
            </CategoryCard>
          ))}
        </CategoryContainer>
      )}
      {isFormVisible ? (
        <RecipeForm recipe={selectedRecipe} onSave={handleSaveRecipe} />
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
    </PageContainer>
  );
};

export default HomePage;
