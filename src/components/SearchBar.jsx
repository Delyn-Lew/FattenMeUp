import { useState } from "react";

function SearchBar(){

    const [searchBar, setSearchBar] = useState('');

    const handleSearch = (evt) => {
        evt.preventDefault();
    }

    return(
        <form>
        <input 
        type="text" 
        placeholder="Search here" 
        onChange={event => setSearchBar(event.target.value)} />
        <button type="submit" onClick={handleSearch}>Search</button>
        </form>
    )
}

export default SearchBar;