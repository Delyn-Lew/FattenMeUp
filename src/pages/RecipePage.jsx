import { useParams } from "react-router-dom";
import { useRecipeContext } from "../RecipeContext";
import { useEffect } from "react";

function RecipePage(){
    const { id } = useParams();
    const {selectedRecipe, setSelectedRecipe} = useRecipeContext();

    // if(!selectedRecipe) {
    //     return <div>Loading ...</div>;
    // }
    useEffect(()=>{

        async function fetchRecipeDetails(){
            const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=6ff0206e17fd47b783fabeee52a35974`;
            const response = await fetch(url); 
            const recipeDetails = await response.json();
            setSelectedRecipe(recipeDetails);
        }
        fetchRecipeDetails();
    },[])

return(
    <>
    <h2>{selectedRecipe?.title}</h2>
    <img 
    src={selectedRecipe?.image}
    alt={selectedRecipe?.title}
    />
    <p>Ready in: {selectedRecipe?.readyInMinutes} minutes</p>
    <p>Servings: {selectedRecipe?.servings}</p>
    <p>{selectedRecipe?.summary}</p>
    </>
)
}

export default RecipePage;