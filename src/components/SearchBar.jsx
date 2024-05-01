import { useState, useEffect } from "react";
import { API_KEY } from "../key";
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchBar, setSearchBar] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [shouldFetch, setShouldFetch] = useState(true);

  const searchValue = searchBar.trim(); //to remove trailing whitespace
  const handleSearch = async (evt) => {
    evt.preventDefault();

    if (searchValue) {
      setLoading(true);
      const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=1&query=${searchValue}`;

      try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.results.length > 0) {
          const recipe = data.results[0];
          console.log(recipe);
          setRecipeImage(recipe);
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
  console.log(searchValue);

  async function handleClick() {
    const searchValue = searchBar.trim();
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=1&query=${searchValue}`;
    const response = await fetch(url);
    const searchedRecipe = await response.json();
    setRecipeImage(searchedRecipe.results[0].image);
  }
  console.log(recipeImage);
  //   useEffect(() => {
  //     let active = true;

  //     if (shouldFetch) {
  //       handleClick();
  //       setShouldFetch(false);
  //     }
  //     return () => {
  //       active = false;
  //     };
  //   }, [shouldFetch]);

  return (
    <form className="searchForm">
      <br />
      <input
        type="search"
        placeholder="Search here"
        onChange={(evt) => setSearchBar(evt.target.value)}
      />
      {/* anon function takes in no name ()=>{} */}
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
      {loading && <p>Hold on... cooking up the best recipes!</p>}
      <br />
      {status && <p>{status}</p>}
      <br />
      {recipeImage && (
        <Link to={`/recipes/${recipeImage.id}`}>
          <img src={recipeImage.image} alt="Recipe" />
        </Link>
      )}
    </form>
  );
}

export default SearchBar;
