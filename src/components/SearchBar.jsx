import { useState } from "react";

function SearchBar(){

    const [searchBar, setSearchBar] = useState('');
    
    const handleSearch = async (evt) => {
        evt.preventDefault();
        const searchValue = searchBar.trim(); //to remove trailing whitespace
        
        if(searchValue) {
            const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=0cacfa8a8c0845328430f3573171b10e&addRecipeInformation=true&instructionsRequired=true&number=1&query=${searchValue}`
            
            try {
                const response = await fetch(searchUrl)
                const data = await response.json();

                if (data.results.length > 0) {
                    console.log(data.results[0]);
                } else {
                    console.log("Recipes not found!");
                }
            } catch (error) {
                setStatus("Error")
                console.log(Error)
            }
        }
    }

    return(
        <form>
        <input 
        type="search" 
        placeholder="Search here" 
        onChange={evt => setSearchBar(evt.target.value)} />
        <button type="submit" onClick={handleSearch}>Search</button>
        </form>
    )
}

export default SearchBar;