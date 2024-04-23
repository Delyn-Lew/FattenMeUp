import { useState } from "react";

function SearchBar(){
    const [searchBar, setSearchBar] = useState('');
    const handleSearch = () => {}

    return(
        <div>
        <input 
        type="text" 
        placeholder="Search here" 
        onChange={event => setSearchBar(event.target.value)} />
        <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar;