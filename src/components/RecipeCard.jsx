import { useState } from 'react';
import RecipeDescription from './RecipeDescription';
import '../styles/RecipeCard.css';

// Default image for recipes without an image
const DEFAULT_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f9f5eb"/><path d="M100,65 C83,65 70,78 70,95 C70,112 83,125 100,125 C117,125 130,112 130,95 C130,78 117,65 100,65 Z M100,120 C86,120 75,109 75,95 C75,81 86,70 100,70 C114,70 125,81 125,95 C125,109 114,120 100,120 Z" fill="%23d35400"/><path d="M60,140 L140,140 C140,115 125,105 100,105 C75,105 60,115 60,140 Z" fill="%23d35400"/><path d="M65,50 L75,60 M125,60 L135,50 M85,45 L90,55 M110,55 L115,45" stroke="%23d35400" stroke-width="2"/><path d="M70,150 L130,150 C130,150 135,170 100,170 C65,170 70,150 70,150 Z" fill="%23d35400"/></svg>';

const RecipeCard = ({ recipe, deleteRecipe, editRecipe }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  const openDetails = () => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Get dish type badge class and text
  const getDishTypeBadge = () => {
    switch (recipe.dishType) {
      case 'vegetarian':
        return { class: 'dish-badge vegetarian', text: 'Veg' };
      case 'non-vegetarian':
        return { class: 'dish-badge non-vegetarian', text: 'Non-Veg' };
      case 'egg-based':
        return { class: 'dish-badge egg-based', text: 'Egg' };
      default:
        return { class: 'dish-badge vegetarian', text: 'Veg' };
    }
  };

  const dishTypeBadge = getDishTypeBadge();

  return (
    <>
      <div className="recipe-card" onClick={openDetails}>
        <div className="recipe-image">
          <img 
            src={recipe.image && !imageError ? recipe.image : DEFAULT_IMAGE} 
            alt={recipe.name} 
            onError={handleImageError}
          />
          <span className={dishTypeBadge.class}>{dishTypeBadge.text}</span>
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-title">{recipe.name}</h3>
          {recipe.description && (
            <p className="recipe-description">{recipe.description}</p>
          )}
        </div>
      </div>

      {showDetails && (
        <RecipeDescription 
          recipe={{...recipe, image: recipe.image && !imageError ? recipe.image : DEFAULT_IMAGE}} 
          onClose={closeDetails} 
          deleteRecipe={deleteRecipe} 
          editRecipe={editRecipe} 
        />
      )}
    </>
  );
};

export default RecipeCard; 