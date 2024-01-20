import { Card, ListGroup, Container, Row, Col, Button, Modal, ModalTitle, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Add from "../Assets/add.png"
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

const Dashboard = () => {
    const [itineraryList, setItineraryList] = useState([]);
    const [showDelete, setShowDelete] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [details, setDetails] = useState()

    const handleDelete = () => 
    {

    }

    const handleEdit = () =>
    {

    }

    useEffect(() => {
        var url = "https://h4g.fly.dev/itinerary/";
        axios.get(url).then((res) => {
            const result = res.data;
            setItineraryList(result["data"]); 
        })
    }, [])

    useEffect(() => {
        if (showDetails === true) {
            console.log("test - details")
            // to be added
        }
    }, [showDetails])
    

    return (
        <Container>
            <Row>
                {
                    itineraryList.map(itinerary => (
                        <Col lg={4} md={6} sm={12}>
                            <Card style={{ width: '95%', margin:"5px" }}>
                                <Card.Header> {itinerary.title} </Card.Header>
                                {/* <Card.Img variant="top" src="https://flagsapi.com/Andorra/shiny/64.png" /> */}
                                <Card.Subtitle style={{ marginTop:'10px'}}> 
                                    <p style={{ fontSize:"120%"}}> {itinerary.country}</p>
                                    <p> Budget: ${itinerary.budget} </p>

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
                                        onClick={() => setShowDetails(true)}
                                    > View more</Button>
                                    <Button
                                        variant="danger" 
                                        style={{marginTop: "10px", marginLeft: "3px"}}
                                        onClick={() => {
                                            console.log("delete")
                                            setShowDelete(true)
                                        }}
                                    > <MdDeleteForever /> </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
                <Col lg={4} md={6} sm={12}>
                    <a style={{textDecoration:"none"}} href="add_later"> 
                        <div className="create-itinerary-button" 
                            style={{opacity:"60%"}}>
                            <img 
                                src={Add} 
                                alt="Create new itinerary" 
                                style={{ width:"4rem", margin:"auto", marginTop:"20%"}}/>
                            <p style={{ fontSize:"25px", marginTop:"15px", color:"black" }}> Add new itinerary </p>
                        </div>
                    </a>
                </Col>
            </Row>

            <Modal className="delete-confirmation" show={showDelete} >
                <Modal.Dialog className="delete-confirmation" show={showDelete} >
                    <Modal.Body closeButton>
                    <Modal.Title>Are you sure you want to delete this?</Modal.Title>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShowDelete(false)}>Yes</Button>
                        <Button variant="secondary" onClick={() => setShowDelete(false)}>No</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

            <Modal className="details" show={showDetails} style={{width:"100%"}}>
                <Modal.Dialog style={{width:"90%"}}>
                 <Modal.Header style={{ fontWeight: "700", fontSize: "25px"}}> Itinerary title </Modal.Header>
                    <Modal.Body closeButton>
                        <div>
                            <p> Country: country </p>
                            <p> Budget: budget </p>
                        </div>
                        <Table striped bordered hover style={{width:"100%"}}>
                            <thead>
                                <tr>
                                    <th>Destination</th>
                                    <th>Cost</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-primary" onClick={() => 
                            {
                                setShowDetails(false)
                                console.log("test-edit")
                                // add route
                            }}>Edit</Button>
                        <Button variant="outline-secondary" onClick={() => 
                            {
                                setShowDetails(false)
                            }}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

        </Container>
    )
}

export default Dashboard;