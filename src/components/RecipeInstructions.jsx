function RecipeInstructions({ instructionsSteps }) {
  return (
    <>
      <h2>Instructions:</h2>
      <ol>
        {instructionsSteps?.map((step, index) => (
          <div key={index}>
            <li> {step.step}</li>
          </div>
        ))}
      </ol>
    </>
  );
}

export default RecipeInstructions;
