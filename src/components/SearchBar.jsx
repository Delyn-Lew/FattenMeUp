import { useState } from "react";
import { API_KEY } from "../key";

function SearchBar() {
  const [searchBar, setSearchBar] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (evt) => {
    evt.preventDefault();
    const searchValue = searchBar.trim(); //to remove trailing whitespace

    if (searchValue) {
      setLoading(true);
      const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=1&query=${searchValue}`;

      try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.results.length > 0) {
          const recipe = data.results[0];
          console.log(recipe);
          const { image } = recipe;
          setRecipeImage(image);
        } else {
          console.log("Recipes not found!");
        }
      } catch (error) {
        setStatus("Error");
        console.log(Error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="searchForm">
      <br />
      <input
        type="search"
        placeholder="Search here"
        onChange={(evt) => setSearchBar(evt.target.value)}
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
      {loading && <p>Hold on... cooking up the best recipes!</p>}
      <br />
      {status && <p>{status}</p>}
      <br />
      {recipeImage && <img src={recipeImage} alt="Recipe" />}
    </form>
  );
}

export default SearchBar;
