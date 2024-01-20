import { Card, ListGroup, Container, Row, Col, Button, Navbar } from "react-bootstrap";
import NavBar from './NavBar'

const Dashboard = () => {
    const title = "Title 1"
    const country = "Country 1"
    const budget = "Budget 1"

    const test = ['test1', 'test2', 'test3', 'test4']

    return (
        <Container>
            <NavBar />
            <Row>
                {/* {
                    test.map(test => (
                        <Col lg={4} md={6} sm={12}>
                            {test} </Col>
                    ))
                } */}
                <Col lg={4} md={6} sm={12}>
                    <Card style={{ width: '90%' }}>
                        <Card.Header> {title} </Card.Header>
                        <Card.Img variant="top" src="./itinerary.img" />
                        <Card.Subtitle> 
                            <p style={{ fontSize:"120%"}}> {country}</p>
                            <p> Budget: {budget} </p>

                        </Card.Subtitle>
                        <Card.Body>
                            <ListGroup className="destination-list">
                                <ListGroup.Item>Destination 1</ListGroup.Item>
                                <ListGroup.Item>Destination 2</ListGroup.Item>
                                <ListGroup.Item>Destination 3</ListGroup.Item>
                            </ListGroup>

                            <Button 
                                variant="dark" 
                                style={{marginTop: "10px"}}
                                onClick={() => console.log("working fine!")}
                            > View more</Button>
                        </Card.Body>
                    </Card>
                </Col>            
            </Row>
        </Container>
    )
}

export default Dashboard;