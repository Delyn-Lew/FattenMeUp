import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h1>Fatten Me Up</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Shopping">
                Shopping
              </Nav.Link>
              <Nav.Link as={Link} to="/Bookmark">
                Bookmark
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
export default NavBar;
