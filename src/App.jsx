async function logMovies() {
  const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=0cacfa8a8c0845328430f3573171b10e");
  const movies = await response.json();
  console.log(movies);
}

function App(){
  logMovies();
  return(
    <h1>test</h1>
  )
}
export default App;