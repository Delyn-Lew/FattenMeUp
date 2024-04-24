import { useEffect, useState } from "react";

function RandomRecipes(){
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    async function loadRandomRecipe(){
        const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=0cacfa8a8c0845328430f3573171b10e`;
        const response = await fetch(url);
        const randomRecipes = await response.json();
        setRandomRecipes(randomRecipes.recipes);
    }
    useEffect(()=> {
        if(shouldFetch) {
        loadRandomRecipe();
        setShouldFetch(false);
        }
    },[shouldFetch]);

    function handleRandom() {
        loadRandomRecipe();
    }
    
    function handleRecipeClick(recipeId){
        async function fetchRecipeDetails(){
            const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=0cacfa8a8c0845328430f3573171b10e`;
            const response = await fetch(url);
            const recipeDetails = await response.json();
            setSelectedRecipe(recipeDetails);
        }
        fetchRecipeDetails();
    }
    return(
        <>
        <button onClick={handleRandom}>Inspire me!</button>
        <div>
            {randomRecipes.map(recipe =>(
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    onClick={()=> handleRecipeClick(recipe.id)}
                    />
                </div>
            ))}
            {selectedRecipe && (
                <div>
                    <p>Ready in:{selectedRecipe.readyInMinutes}</p>
                    <p>{selectedRecipe.summary}</p>
                </div>
            )}
        </div>
        </>
    );
};

export default RandomRecipes;