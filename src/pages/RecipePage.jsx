import { useParams } from "react-router-dom";
import { useRecipeContext } from "../RecipeContext";
import { useEffect, useState } from "react";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const { selectedRecipe, setSelectedRecipe } = useRecipeContext();
  const [getIngredients, setGetIngredients] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState(
    selectedRecipe?.analyzedInstructions?.[0]?.steps || []
  );
  const [nextRecipeId, setNextRecipeId] = useState(1);

  useEffect(() => {
    async function fetchRecipeDetails() {
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=8646d0b1985a49999f8cc40d8af4a704`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const recipeDetails = await response.json();
        setRecipe(recipeDetails);
        setSelectedRecipe(recipeDetails);
        setRecipeInstructions(recipeDetails.analyzedInstructions[0].steps);
        setGetIngredients(recipeDetails.extendedIngredients);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchRecipeDetails();
  }, [id]);

  useEffect(() => {
    async function fetchRecipeInstructions() {
      const url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=8646d0b1985a49999f8cc40d8af4a704`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const analInstruct = await response.json();
        setRecipeInstructions(analInstruct[0].steps);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchRecipeInstructions();
  }, [id]);

  const instructionsSteps = selectedRecipe?.analyzedInstructions?.[0]?.steps;

  async function sendIngredients() {
    try {
      const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/Projects";
      const ingredients = recipe.extendedIngredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }));
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
        body: JSON.stringify({
          fields: {
            RecipeId: nextRecipeId.toString(),
            SpoonId: id,
            Ingredients: JSON.stringify(ingredients),
          },
        }),
      });
      if (!response.ok) {
        console.error(
          "There was a problem with your fetch operation:",
          response.statusText
        );
      } else {
        setNextRecipeId(nextRecipeId + 1);
      }
    } catch (error) {
      console.log("Error");
    }
  }

  function handleClick() {
    sendIngredients();
  }

  return (
    <>
      <button onClick={handleClick}>Add to Shopping List</button>
      <h2>{recipe?.title}</h2>
      <img src={recipe?.image} alt={recipe?.title} />
      <p>Ready in: {recipe?.readyInMinutes} minutes</p>
      <p>Servings: {recipe?.servings}</p>
      <h2>Instructions:</h2>
      <ol>
        {instructionsSteps?.map((step, index) => (
          <div key={index}>
            <li> {step.step}</li>
          </div>
        ))}
      </ol>
      <h2>Ingredients:</h2>
      {recipe?.extendedIngredients.map((ingredient, index) => (
        <div key={index}>
          <ul>
            <li>{ingredient.original}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default RecipePage;
