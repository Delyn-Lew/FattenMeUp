import { useParams } from "react-router-dom";
import { useRecipeContext } from "../RecipeContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipePage() {
  const { id } = useParams();
  const { selectedRecipe, setSelectedRecipe } = useRecipeContext();
  const [getIngredients, setGetIngredients] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  // if(!selectedRecipe) {
  //     return <div>Loading ...</div>;
  // }
  useEffect(() => {
    async function fetchRecipeDetails() {
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=5999701673d14ab1a278363ed6aa6035`;
      const response = await fetch(url);
      const recipeDetails = await response.json();
      setSelectedRecipe(recipeDetails); //{analyzedInstructions:[{steps:[{number:x,step:xxx}]}]}
      setRecipeInstructions(recipeDetails.analyzedInstructions[0].steps);
      console.log(
        "instructions: ",
        recipeDetails.analyzedInstructions[0].steps
      );
      setGetIngredients(recipeDetails.extendedIngredients);
    }
    fetchRecipeDetails();
  }, [id]);

  //   const instructionsSteps = selectedRecipe.analyzedInstructions.steps;

  return (
    <>
      <h2>{selectedRecipe?.title}</h2>
      <img src={selectedRecipe?.image} alt={selectedRecipe?.title} />
      <p>Ready in: {selectedRecipe?.readyInMinutes} minutes</p>
      <p>Servings: {selectedRecipe?.servings}</p>
      <h2>Instructions</h2>
      <ol>
        {recipeInstructions?.map((instruction, index) => (
          <div key={index}>
            <li> {instruction.step}</li>
          </div>
        ))}
      </ol>
      <h2>Ingredients</h2>
      {getIngredients?.map((getIngredient, index) => (
        <div key={index}>
          <ul>
            <li>{getIngredient.original}</li>
          </ul>
        </div>
      ))}
      <Link to={`/Shopping`}>Go to Shopping List!</Link>
    </>
  );
}

export default RecipePage;
