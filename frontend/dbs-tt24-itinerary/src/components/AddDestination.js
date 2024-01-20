import '../App.css';
import '../index.js';
import { useState, useEffect }  from "react";
import { Table, Button, Form } from "react-bootstrap";

import axios from "axios";

export default function AddDestination(){
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [notes, setNotes] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const data = parseForm(e.target);
        fetch("/some-endpoint", { method: "post", data });
    }
    
    return(
      <>
       <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Enter destination name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cost</Form.Label>
              <Form.Control
                id="cost"
                type="text"
                placeholder="Enter destination cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
              <Form.Control
                id="notes"
                type="text"
                placeholder="Extra notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="d-grid">
            <Button type="submit">ADD</Button>
          </Form.Group>
          </form>
      </>
    )
  }