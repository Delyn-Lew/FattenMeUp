import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <h1>Fatten Me Up</h1>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/Shopping" style={{ marginRight: "1rem" }}>
        Shopping List
      </Link>
      <Link to="/Bookmark" style={{ marginRight: "1rem" }}>
        Bookmarks
      </Link>
      <br />
    </>
  );
}
export default Nav;
