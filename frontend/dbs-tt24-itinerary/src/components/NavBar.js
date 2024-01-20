import { Card, Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            href="/home"
            style={{ width: "13%", marginRight: "50px" }}
          >
            HomePage
          </Navbar.Brand>
        
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/home"
              >
                Itinerary
              </Nav.Link>
              <Nav.Link
                href="/destination"
              >
                Destination
              </Nav.Link>
              <Nav.Link
                href="/"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
       </Container>
    </Navbar>
    )
}

export default NavBar;
