// Recipes.jsx
import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const [spoonacularRecipes, setSpoonacularRecipes] = useState([]);

  useEffect(() => {
    const fetchSpoonacularRecipes = async () => {
      try {
        const spoonacularResponse = await fetch('https://api.spoonacular.com/recipes/random?apiKey=1513da97d0234b2d8dfc2093707ad823&number=25');
        if (!spoonacularResponse.ok) {
          throw new Error('Error fetching Spoonacular recipes');
        }

        const spoonacularData = await spoonacularResponse.json();
        setSpoonacularRecipes(spoonacularData.recipes);
      } catch (error) {
        console.error('Error fetching Spoonacular recipes:', error);
      }
    };

    fetchSpoonacularRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <div className="recipes-container">
        {spoonacularRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
