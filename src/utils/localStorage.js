// Key used for storing recipes in localStorage
const STORAGE_KEY = 'recipes';

/**
 * Load recipes from localStorage
 * @returns {Array} Array of recipes or empty array if none found or error occurs
 */
export const loadRecipes = () => {
  try {
    const storedRecipes = localStorage.getItem(STORAGE_KEY);
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  } catch (error) {
    console.error('Error loading recipes from localStorage:', error);
    return [];
  }
};

/**
 * Save recipes to localStorage
 * @param {Array} recipes Array of recipe objects to save
 * @returns {boolean} True if save was successful, false otherwise
 */
export const saveRecipes = (recipes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return true;
  } catch (error) {
    console.error('Error saving recipes to localStorage:', error);
    return false;
  }
};

/**
 * Clear all recipes from localStorage
 * @returns {boolean} True if clear was successful, false otherwise
 */
export const clearRecipes = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing recipes from localStorage:', error);
    return false;
  }
};

/**
 * Export recipes as a JSON string for download
 * @param {Array} recipes Array of recipe objects to export
 * @returns {string} JSON string of recipes
 */
export const exportRecipes = (recipes) => {
  try {
    return JSON.stringify(recipes, null, 2);
  } catch (error) {
    console.error('Error exporting recipes:', error);
    return '';
  }
};

/**
 * Import recipes from a JSON string
 * @param {string} jsonString JSON string of recipes to import
 * @returns {Array|null} Array of recipes or null if import failed
 */
export const importRecipes = (jsonString) => {
  try {
    const recipes = JSON.parse(jsonString);
    if (!Array.isArray(recipes)) {
      throw new Error('Imported data is not an array');
    }
    return recipes;
  } catch (error) {
    console.error('Error importing recipes:', error);
    return null;
  }
};

/**
 * Check if localStorage is available in the browser
 * @returns {boolean} True if localStorage is available, false otherwise
 */
export const isLocalStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}; 