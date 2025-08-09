import { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import '../styles/RecipeList.css';

const RecipeList = ({ recipes, deleteRecipe, editRecipe }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: false,
    nonVegetarian: false,
    eggBased: false
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilters({
      ...filters,
      [filterType]: !filters[filterType]
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(filters).filter(Boolean).length;
  };

  // Filter recipes based on search term and dish type filters
  const filteredRecipes = recipes.filter(recipe => {
    // Search term filter
    const matchesSearch = 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Dish type filter
    const dishType = recipe.dishType || 'vegetarian'; // Default to vegetarian if not specified
    
    // If no filters are selected, show all recipes
    const noFiltersSelected = !filters.vegetarian && !filters.nonVegetarian && !filters.eggBased;
    
    // Check if recipe matches selected filters
    const matchesFilter = 
      noFiltersSelected || 
      (filters.vegetarian && dishType === 'vegetarian') ||
      (filters.nonVegetarian && dishType === 'non-vegetarian') ||
      (filters.eggBased && dishType === 'egg-based');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="recipe-list-container">
      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container" ref={dropdownRef}>
          <button 
            className="filter-dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Filter by</span>
            {getActiveFilterCount() > 0 && (
              <span className="filter-count">{getActiveFilterCount()}</span>
            )}
            <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
          </button>
          
          {isDropdownOpen && (
            <div className="filter-dropdown-menu">
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.vegetarian}
                    onChange={() => handleFilterChange('vegetarian')}
                  />
                  <span className="filter-badge vegetarian">Veg</span>
                </label>
                
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.nonVegetarian}
                    onChange={() => handleFilterChange('nonVegetarian')}
                  />
                  <span className="filter-badge non-vegetarian">Non-Veg</span>
                </label>
                
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.eggBased}
                    onChange={() => handleFilterChange('eggBased')}
                  />
                  <span className="filter-badge egg-based">Egg-Based</span>
                </label>
              </div>
              
              <div className="filter-actions">
                <button 
                  className="clear-filters-btn"
                  onClick={() => setFilters({ vegetarian: false, nonVegetarian: false, eggBased: false })}
                  disabled={getActiveFilterCount() === 0}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="no-recipes">
          {recipes.length === 0 
            ? "No recipes yet. Add your first recipe!" 
            : "No recipes match your search and filters."}
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              deleteRecipe={deleteRecipe}
              editRecipe={editRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList; 