import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipeContext } from "../RecipeContext";
import { API_KEY } from "../key";

function RandomRecipes() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const { setSelectedRecipe } = useRecipeContext();
  const [shouldFetch, setShouldFetch] = useState(true);

  async function loadRandomRecipe() {
    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const randomRecipes = await response.json();
    setRandomRecipes(randomRecipes.recipes);
  }
  useEffect(() => {
    let active = true;

    if (shouldFetch) {
      loadRandomRecipe();
      setShouldFetch(false);
    }
    return () => {
      active = false;
    };
  }, [shouldFetch]);

  function handleRandom() {
    loadRandomRecipe();
  }

  return (
    <>
      <button onClick={handleRandom}>Inspire me!</button>
      <div>
        {randomRecipes?.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <Link to={`/recipes/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default RandomRecipes;
