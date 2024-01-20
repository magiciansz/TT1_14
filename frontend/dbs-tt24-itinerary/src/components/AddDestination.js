import "../App.css";
import "../index.js";
import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddDestination() {
  const navigate = useNavigate();
  // Initialize state for form data
  const [formData, setFormData] = useState({
    name: "",
    cost: 0.0,
    notes: "",
    country: 1,
  });

  function handleSubmit(e) {
    e.preventDefault();
    const url = "https://h4g.fly.dev/destination/";
    axios
      .post(url, {
        country_id: 1,
        cost: parseFloat(formData.cost),
        name: formData.name,
        notes: formData.notes,
      })
      .then(() => {
        navigate(-1)
      });
  }

  const handleUserInput = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            placeholder='Enter destination name'
            value={formData.name}
            onChange={handleUserInput}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Cost</Form.Label>
          <Form.Control
            name='cost'
            placeholder='Enter destination cost'
            value={formData.cost}
            onChange={handleUserInput}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            name='notes'
            placeholder='Extra notes'
            value={formData.notes}
            onChange={handleUserInput}
          />
        </Form.Group>
        <Form.Group className='d-grid'>
          <Button type='submit'>ADD</Button>
        </Form.Group>
      </form>
    </>
  );
}
