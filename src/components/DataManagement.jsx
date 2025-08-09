import { useState, useRef } from 'react';
import { FaDownload, FaUpload, FaTrash } from 'react-icons/fa';
import { exportRecipes, importRecipes } from '../utils/localStorage';
import '../styles/DataManagement.css';

const DataManagement = ({ recipes, setRecipes, showNotification }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    if (recipes.length === 0) {
      showNotification('No recipes to export', 'info');
      return;
    }

    const jsonData = exportRecipes(recipes);
    if (!jsonData) {
      showNotification('Failed to export recipes', 'error');
      return;
    }

    // Create a blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipe-book-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    showNotification('Recipes exported successfully', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImportChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedRecipes = importRecipes(event.target.result);
        if (importedRecipes) {
          setRecipes(importedRecipes);
          showNotification(`Imported ${importedRecipes.length} recipes successfully`, 'success');
        } else {
          showNotification('Failed to import recipes. Invalid format.', 'error');
        }
      } catch (error) {
        showNotification('Error importing recipes', 'error');
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = null;
  };

  const handleClearAll = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    setRecipes([]);
    setShowConfirm(false);
    showNotification('All recipes cleared', 'success');
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <div className="data-management">
      <h3>Data Management</h3>
      <div className="data-buttons">
        <button className="data-btn export-btn" onClick={handleExport} title="Export Recipes">
          <FaDownload /> Export
        </button>
        <button className="data-btn import-btn" onClick={handleImportClick} title="Import Recipes">
          <FaUpload /> Import
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />
        </button>
        <button className="data-btn clear-btn" onClick={handleClearAll} title="Clear All Recipes">
          <FaTrash /> Clear All
        </button>
      </div>

      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete all recipes? This cannot be undone.</p>
          <div className="confirm-buttons">
            <button className="confirm-btn yes-btn" onClick={confirmClear}>Yes, Delete All</button>
            <button className="confirm-btn no-btn" onClick={cancelClear}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement; 