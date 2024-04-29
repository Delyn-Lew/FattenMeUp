function RecipeIngredients({ recipe }) {
  return (
    <>
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
export default RecipeIngredients;
