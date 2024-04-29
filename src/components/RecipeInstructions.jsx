function RecipeInstructions({ instructionsSteps }) {
  return (
    <>
      <h2>Instructions:</h2>
      <ol>
        {instructionsSteps?.map((step, stepNumber) => (
          <div key={stepNumber}>
            <li> {step.step}</li>
          </div>
        ))}
      </ol>
    </>
  );
}

export default RecipeInstructions;
