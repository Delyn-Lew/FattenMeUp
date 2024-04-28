import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Nav() {
    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand Link="/">Fatten Me Up</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link Link="/Shopping"></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        {/* <h1>Fatten Me Up</h1>
        <Link to="/">Home</Link> */}
        {/* <Link to="/recipes/:id">Recipe</Link> */}
        {/* <Link to="/Shopping">Shopping List</Link>
        <Link to="/Bookmark">Bookmarks</Link> */}
        </>
    )
}
export default Nav;



function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;