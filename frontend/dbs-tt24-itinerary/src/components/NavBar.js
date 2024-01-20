import { Card, Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand
            href="#home"
            style={{ width: "13%", marginRight: "50px" }}
          >
            Page Name
          </Navbar.Brand>
        
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#itinerary"
              >
                Itinerary
              </Nav.Link>
              <Nav.Link
                href="#destination"
              >
                Destination
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
       </Container>
    </Navbar>
    )
}

export default NavBar;
