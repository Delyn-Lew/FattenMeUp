import {Link, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RandomRecipes from "./components/RandomRecipes";

function App(){
  
  return(
      <>
      <h1>Fatten Me Up</h1>
      <HomePage />
      <RandomRecipes />
      </>
  )
}

export default App;