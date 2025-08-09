import { Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import DataManagement from '../components/DataManagement';
import { FaPlus } from 'react-icons/fa';
import '../styles/HomePage.css';

const HomePage = ({ recipes, deleteRecipe, editRecipe, setRecipes, showNotification }) => {
  return (
    <div className="home-page">
      <div className="page-header">
        <h2>My Recipes</h2>
        <Link to="/add" className="add-recipe-btn">
          <FaPlus />
          <span>Add Recipe</span>
        </Link>
      </div>
      <RecipeList 
        recipes={recipes} 
        deleteRecipe={deleteRecipe} 
        editRecipe={editRecipe} 
      />
      <DataManagement 
        recipes={recipes} 
        setRecipes={setRecipes} 
        showNotification={showNotification} 
      />
    </div>
  );
};

export default HomePage; 