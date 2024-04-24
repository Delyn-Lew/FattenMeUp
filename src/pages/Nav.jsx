import { Link } from "react-router-dom";

function Nav() {
    return(
        <>
        <Link to="/home">Home</Link>
        <Link to="/home/Recipe">Recipe</Link>
        <Link to="/home/Shopping">Shopping List</Link>
        <Link to="/home/Bookmark">Bookmarks</Link>
        </>
    )
}