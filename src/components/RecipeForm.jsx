import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/RecipeForm.css';

const RecipeForm = ({ addRecipe, updateRecipe, editingRecipe, setEditingRecipe }) => {
  const initialFormState = {
    name: '',
    description: '',
    ingredients: '',
    cookingMethod: '',
    image: '',
    dishType: 'vegetarian' // Default to vegetarian
  };

  const [formData, setFormData] = useState(initialFormState);
  const [previewImage, setPreviewImage] = useState('');

  // Update form data when editing a recipe
  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        name: editingRecipe.name,
        description: editingRecipe.description || '',
        ingredients: editingRecipe.ingredients.join(', '),
        cookingMethod: editingRecipe.cookingMethod,
        image: editingRecipe.image,
        dishType: editingRecipe.dishType || 'vegetarian'
      });
      setPreviewImage(editingRecipe.image);
    } else {
      setFormData(initialFormState);
      setPreviewImage('');
    }
  }, [editingRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.ingredients || !formData.cookingMethod) {
      alert('Please fill in all required fields');
      return;
    }

    // Process ingredients into an array
    const ingredientsArray = formData.ingredients
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient !== '');

    const recipeData = {
      name: formData.name,
      description: formData.description,
      ingredients: ingredientsArray,
      cookingMethod: formData.cookingMethod,
      image: formData.image || '',
      dishType: formData.dishType
    };

    if (editingRecipe) {
      // Update existing recipe
      updateRecipe({ ...recipeData, id: editingRecipe.id });
    } else {
      // Add new recipe
      addRecipe({ ...recipeData, id: uuidv4() });
    }

    // Reset form
    setFormData(initialFormState);
    setPreviewImage('');
  };

  const handleCancel = () => {
    setEditingRecipe(null);
    setFormData(initialFormState);
    setPreviewImage('');
  };

  return (
    <div className="recipe-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter recipe name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief, enticing description of your recipe..."
            rows="3"
            spellCheck="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dishType">Dish Type</label>
          <div className="dish-type-options">
            <label className="dish-type-option">
              <input
                type="radio"
                name="dishType"
                value="vegetarian"
                checked={formData.dishType === 'vegetarian'}
                onChange={handleChange}
              />
              <span className="dish-type-label vegetarian">Vegetarian</span>
            </label>
            <label className="dish-type-option">
              <input
                type="radio"
                name="dishType"
                value="non-vegetarian"
                checked={formData.dishType === 'non-vegetarian'}
                onChange={handleChange}
              />
              <span className="dish-type-label non-vegetarian">Non-Vegetarian</span>
            </label>
            <label className="dish-type-option">
              <input
                type="radio"
                name="dishType"
                value="egg-based"
                checked={formData.dishType === 'egg-based'}
                onChange={handleChange}
              />
              <span className="dish-type-label egg-based">Egg-Based</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="List ingredients separated by commas (e.g., 2 cups flour, 1 tsp salt, 3 eggs)"
            rows="5"
            spellCheck="true"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cookingMethod">Cooking Method</label>
          <textarea
            id="cookingMethod"
            name="cookingMethod"
            value={formData.cookingMethod}
            onChange={handleChange}
            placeholder="Describe the step-by-step cooking instructions in detail..."
            rows="7"
            spellCheck="true"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Recipe Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Recipe preview" />
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
          </button>
          {editingRecipe && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecipeForm; 