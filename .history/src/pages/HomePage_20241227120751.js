import React, { useState, useEffect } from 'react';
import RecipeList from '../components/Recipes/RecipeList';
import RecipeForm from '../components/Recipes/RecipeForm';
import Footer from '../components/Shared/Footer';
import { api } from '../services/api';
import './Profile.css';
const HomePage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState([
    { name: 'Breakfast', image: '/images/pexels-tijana-drndarski-449691-2635307.jpg' },
    { name: 'Lunch', image: '/images/pexels-pixabay-361184.jpg' },
    { name: 'Dinner', image: '/images/pexels-chanwalrus-958545.jpg' }
  ]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await api.get('/recipes');
        setRecipes(result.data);
        setFilteredRecipes(result.data); // Initialize filteredRecipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);
  useEffect(() => {
    const updatedFilteredRecipes = recipes.filter(recipe => {
      const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
      const matchesName = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesName;
    });
    setFilteredRecipes(updatedFilteredRecipes);
  }, [searchTerm, selectedCategory, recipes]); // Update filtered recipes when search term, category, or recipes change
  const handleAddNewRecipe = () => {
    setSelectedRecipe(null);
    setFormVisible(true);
  };
  const handleSaveRecipe = async () => {
    setFormVisible(false);
    const result = await api.get('/recipes');
    setRecipes(result.data);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="page-container">
      <h1>Recipe Management</h1>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by recipe name"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="add-recipe-btn" onClick={handleAddNewRecipe}>Add New Recipe</button>
      </div>
      {!isFormVisible && (
        <>
          <div className="category-container">
            {categories.map(category => (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
              >
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {isFormVisible ? (
        <RecipeForm
          recipe={selectedRecipe}
          onSave={handleSaveRecipe}
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
    </div>
  );
};
export default HomePage;