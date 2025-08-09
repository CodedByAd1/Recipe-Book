import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import RecipeForm from '../components/RecipeForm';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/AddRecipePage.css'; // Reusing the same styles

const EditRecipePage = ({ recipes, updateRecipe, editingRecipe, setEditingRecipe }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Set the editing recipe based on the URL parameter
  useEffect(() => {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);
    if (recipeToEdit) {
      setEditingRecipe(recipeToEdit);
    } else {
      // If recipe not found, navigate back to home
      navigate('/');
    }
  }, [id, recipes, setEditingRecipe, navigate]);
  
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
        <h2>Edit Recipe</h2>
      </div>
      {editingRecipe && (
        <RecipeForm 
          updateRecipe={handleUpdateRecipe} 
          editingRecipe={editingRecipe} 
          setEditingRecipe={setEditingRecipe}
        />
      )}
    </div>
  );
};

export default EditRecipePage; 