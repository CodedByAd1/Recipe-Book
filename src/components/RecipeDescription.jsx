import { FaEdit, FaTrash, FaTimes, FaArrowUp } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import '../styles/RecipeDescription.css';

// Default image for recipes without an image
const DEFAULT_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f9f5eb"/><path d="M100,65 C83,65 70,78 70,95 C70,112 83,125 100,125 C117,125 130,112 130,95 C130,78 117,65 100,65 Z M100,120 C86,120 75,109 75,95 C75,81 86,70 100,70 C114,70 125,81 125,95 C125,109 114,120 100,120 Z" fill="%23d35400"/><path d="M60,140 L140,140 C140,115 125,105 100,105 C75,105 60,115 60,140 Z" fill="%23d35400"/><path d="M65,50 L75,60 M125,60 L135,50 M85,45 L90,55 M110,55 L115,45" stroke="%23d35400" stroke-width="2"/><path d="M70,150 L130,150 C130,150 135,170 100,170 C65,170 70,150 70,150 Z" fill="%23d35400"/></svg>';

const RecipeDescription = ({ recipe, onClose, deleteRecipe, editRecipe }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalContentRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Add smooth scrolling behavior when modal opens
  useEffect(() => {
    // Disable body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Enable smooth scrolling for the modal content
    if (modalContentRef.current) {
      modalContentRef.current.style.scrollBehavior = 'smooth';
    }
    
    // Cleanup function to restore body scrolling when modal closes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle scroll event to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (modalContentRef.current) {
        setShowScrollTop(modalContentRef.current.scrollTop > 300);
      }
    };

    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Get dish type badge
  const getDishTypeBadge = () => {
    const dishType = recipe.dishType || 'vegetarian';
    
    switch (dishType) {
      case 'vegetarian':
        return { class: 'vegetarian', text: 'Vegetarian' };
      case 'non-vegetarian':
        return { class: 'non-vegetarian', text: 'Non-Vegetarian' };
      case 'egg-based':
        return { class: 'egg-based', text: 'Egg-Based' };
      default:
        return { class: 'vegetarian', text: 'Vegetarian' };
    }
  };

  const dishTypeBadge = getDishTypeBadge();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="recipe-modal-overlay" onClick={onClose}>
      <div className="recipe-modal-content" ref={modalContentRef} onClick={handleModalClick}>
        <div className="recipe-modal-header">
          <h2>{recipe.name}</h2>
          <div className="recipe-actions">
            <button 
              className="action-btn edit-btn" 
              onClick={() => editRecipe(recipe)}
              aria-label="Edit recipe"
            >
              <FaEdit />
            </button>
            <button 
              className="action-btn delete-btn" 
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
                  deleteRecipe(recipe.id);
                  onClose();
                }
              }}
              aria-label="Delete recipe"
            >
              <FaTrash />
            </button>
            <button className="action-btn close-btn" onClick={onClose} aria-label="Close modal">
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="recipe-modal-image">
          <img 
            src={recipe.image && !imageError ? recipe.image : DEFAULT_IMAGE} 
            alt={recipe.name} 
            onError={handleImageError}
          />
          <span className={`dish-badge ${dishTypeBadge.class}`}>{dishTypeBadge.text}</span>
        </div>

        <div className="recipe-modal-details">
          {recipe.description && (
            <div className="recipe-section">
              <h3>Description</h3>
              <p className="recipe-description">{recipe.description}</p>
            </div>
          )}

          <div className="recipe-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h3>Cooking Method</h3>
            <p className="cooking-method">{recipe.cookingMethod}</p>
          </div>
        </div>

        {showScrollTop && (
          <button 
            className="scroll-top-btn" 
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeDescription; 