function RecipeDetails({ recipe }) {
  function handleClick() {
    sendIngredients();
  }
  return (
    <>
      <br />
      <button onClick={handleClick}>Add to Shopping List</button>
      <h2>{recipe?.title}</h2>
      <img src={recipe?.image} alt={recipe?.title} />
      <p>Ready in: {recipe?.readyInMinutes} minutes</p>
      <p>Servings: {recipe?.servings}</p>
    </>
  );
}

export default RecipeDetails;
