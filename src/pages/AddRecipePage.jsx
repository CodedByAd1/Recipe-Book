import { Link, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/AddRecipePage.css';

const AddRecipePage = ({ addRecipe, updateRecipe, editingRecipe, setEditingRecipe }) => {
  const navigate = useNavigate();
  
  // After adding or updating a recipe, navigate back to the home page
  const handleAddRecipe = (recipe) => {
    addRecipe(recipe);
    navigate('/');
  };
  
  const handleUpdateRecipe = (recipe) => {
    updateRecipe(recipe);
    navigate('/');
  };

  return (
    <div className="add-recipe-page">
      <div className="page-header">
        <Link to="/" className="back-btn">
          <FaArrowLeft />
          <span>Back to Recipes</span>
        </Link>
        <h2>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      </div>
      <RecipeForm 
        addRecipe={handleAddRecipe} 
        updateRecipe={handleUpdateRecipe} 
        editingRecipe={editingRecipe} 
        setEditingRecipe={setEditingRecipe}
      />
    </div>
  );
};

export default AddRecipePage; 