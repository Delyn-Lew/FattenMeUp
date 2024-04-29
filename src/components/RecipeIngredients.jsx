function RecipeIngredients({ recipe }) {
  return (
    <>
      <h2>Ingredients:</h2>
      {recipe?.extendedIngredients.map((ingredient, ingredientList) => (
        <div key={ingredientList}>
          <ul>
            <li>{ingredient.original}</li>
          </ul>
        </div>
      ))}
    </>
  );
}
export default RecipeIngredients;
