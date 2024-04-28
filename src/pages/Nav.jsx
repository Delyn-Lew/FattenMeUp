import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <h1>Fatten Me Up</h1>
      <Link to="/">Home</Link>
      <Link to="/Shopping">Shopping List</Link>
      <Link to="/Bookmark">Bookmarks</Link>
    </>
  );
}
export default Nav;
