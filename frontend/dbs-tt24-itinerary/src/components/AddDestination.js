import '../App.css';
import '../index.js';
import { useState, useEffect }  from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";

export default function AddDestination(){

    // Initialize state for form data
    const [formData, setFormData] = useState({
    name: "",
    cost: 0.0,
    notes: "",
    country: 1
  });

    function handleSubmit(e) {
        e.preventDefault();
        // const data = parseForm(e.target);
        // fetch("/some-endpoint", { method: "post", data });
    }

    const handleUserInput = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setFormData({ ...formData, [name]: value });
      };
    
    return(
      <>
       <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                placeholder="Enter destination name"
                value={formData.name}
                onChange={handleUserInput}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cost</Form.Label>
              <Form.Control
                id="cost"
                placeholder="Enter destination cost"
                value={formData.cost}
                onChange={handleUserInput}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
              <Form.Control
                id="notes"
                placeholder="Extra notes"
                value={formData.notes}
                onChange={handleUserInput}
              />
          </Form.Group>
          <Form.Group className="d-grid">
            <Button type="submit">ADD</Button>
          </Form.Group>
          </form>
      </>
    )
  }