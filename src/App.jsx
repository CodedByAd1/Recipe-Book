import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import Notification from './components/Notification';
import { loadRecipes, saveRecipes, isLocalStorageAvailable } from './utils/localStorage';
import './styles/App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [storageAvailable, setStorageAvailable] = useState(true);
  const navigate = useNavigate();

  // Check if localStorage is available
  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
  }, []);

  // Load recipes from localStorage on component mount
  useEffect(() => {
    if (storageAvailable) {
      const loadedRecipes = loadRecipes();
      setRecipes(loadedRecipes);
    }
  }, [storageAvailable]);

  // Save recipes to localStorage whenever recipes state changes
  useEffect(() => {
    if (storageAvailable && recipes.length > 0) {
      const success = saveRecipes(recipes);
      if (!success) {
        showNotification('Failed to save recipes to localStorage', 'error');
      }
    }
  }, [recipes, storageAvailable]);

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Clear notification
  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  // Add a new recipe
  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
    showNotification('Recipe added successfully', 'success');
  };

  // Update an existing recipe
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipe(null);
    showNotification('Recipe updated successfully', 'success');
  };

  // Delete a recipe
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    showNotification('Recipe deleted successfully', 'success');
  };

  // Set a recipe for editing and navigate to edit page
  const editRecipe = (recipe) => {
    setEditingRecipe(recipe);
    navigate(`/edit/${recipe.id}`);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Recipe Book</h1>
        {!storageAvailable && (
          <div className="storage-warning">
            LocalStorage is not available. Your recipes will not be saved between sessions.
          </div>
        )}
      </header>
      <main className="content-container">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                recipes={recipes} 
                deleteRecipe={deleteRecipe} 
                editRecipe={editRecipe}
                setRecipes={setRecipes}
                showNotification={showNotification}
              />
            } 
          />
          <Route 
            path="/add" 
            element={
              <AddRecipePage 
                addRecipe={addRecipe} 
                updateRecipe={updateRecipe} 
                editingRecipe={null} 
                setEditingRecipe={setEditingRecipe} 
              />
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <EditRecipePage 
                recipes={recipes}
                updateRecipe={updateRecipe} 
                editingRecipe={editingRecipe} 
                setEditingRecipe={setEditingRecipe} 
              />
            } 
          />
        </Routes>
      </main>
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={clearNotification} 
      />
    </div>
  );
}

export default App; 