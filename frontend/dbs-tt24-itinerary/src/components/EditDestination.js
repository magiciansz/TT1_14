import "../App.css";
import "../index.js";
import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDestination() {
  const { id } = useParams();

  // Initialize state for form data
  const [formData, setFormData] = useState({
    name: "",
    cost: 0.0,
    notes: "",
    country: 1,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    var url = "https://h4g.fly.dev/destination/" + id;
    axios.get(url).then((res) => {
      const result = res.data;
      const data = result["data"][0];

      setFormData({
        name: data.name,
        cost: data.cost,
        notes: data.notes,
        country: 1,
      })
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const url = "https://h4g.fly.dev/destination/"+ id;
    axios
      .patch(url, {
        cost: formData.cost,
        notes: formData.notes
      })
      .then(() => {navigate(-1)})
      .catch((error) => console.error(error));
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
          <Button type='submit'>Save changes</Button>
        </Form.Group>
      </form>
    </>
  );
}
