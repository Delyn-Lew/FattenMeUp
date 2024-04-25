import SearchBar from "../components/SearchBar";
import RandomRecipes from "../components/RandomRecipes";
import { RecipeProvider } from "../RecipeContext";

function HomePage() {
    return(
        <>
        <SearchBar />
        <RecipeProvider>
        <RandomRecipes />
        </RecipeProvider>
        </>
    )
}

export default HomePage;