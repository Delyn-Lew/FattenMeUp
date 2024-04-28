import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipeContext } from "../RecipeContext";

function RandomRecipes() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const { setSelectedRecipe } = useRecipeContext();
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  async function loadRandomRecipe() {
    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=8646d0b1985a49999f8cc40d8af4a704`;
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

  // function handleRecipeClick(recipeId){
  // async function fetchRecipeDetails(){
  //     const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=6ff0206e17fd47b783fabeee52a35974`;
  //     const response = await fetch(url);
  //     const recipeDetails = await response.json();
  //     console.log(recipeDetails);
  //     setSelectedRecipe(recipeDetails);
  // }
  // fetchRecipeDetails();
  // console.log(recipeId);
  // }

  return (
    <>
      <button onClick={handleRandom}>Inspire me!</button>
      <div>
        {randomRecipes?.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <Link to={`/recipes/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                // onClick={()=> handleRecipeClick(recipe.id)}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default RandomRecipes;
