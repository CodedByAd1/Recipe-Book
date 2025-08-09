# Recipe Book

A React application for storing and managing your favorite recipes with local storage persistence.

## Features

- Create, read, update, and delete recipes
- Store recipe details including name, ingredients, cooking method, and images
- Search and filter recipes by name or ingredients
- Responsive design for all device sizes
- Data persistence using browser's local storage

## Tech Stack

- React (Hooks, State Management)
- Local Storage API
- CSS for styling
- UUID for generating unique IDs
- React Icons for UI elements

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/recipe-book.git
cd recipe-book
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding a Recipe

1. Fill in the recipe form with name, ingredients (comma-separated), and cooking method
2. Optionally upload an image
3. Click "Add Recipe"

### Editing a Recipe

1. Click the edit icon on any recipe card
2. Update the recipe details in the form
3. Click "Update Recipe"

### Deleting a Recipe

1. Click the delete icon on any recipe card
2. Confirm the deletion

### Searching Recipes

Use the search box to filter recipes by name or ingredients.

## Building for Production

To create a production build:

```
npm run build
```

The build files will be in the `dist` directory.

## License

This project is licensed under the ISC License. 
