import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const CreateItinerary = () => {
  const countryList = ["Singapore", "Malaysia", "Indonesia", "Japan", "Korea"];

  // Initialize state for form data
  const [formData, setFormData] = useState({
    title: "",
    budget: 0.0,
    country: "",
  });
  const [chosenDestinations, setChosenDestinations] = useState([]);
  const [allDestinations, setAllDestinations] = useState();

  // Initialise state for potential errors in form
  const [titleError, setTitleError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  // Getting all destinations
  React.useEffect(() => {
    var url = "https://h4g.fly.dev/destination/";
    axios.get(url).then((res) => {
      const result = res.data;
      console.log(result);
      setAllDestinations(result["data"]);
    });
  }, []);

  //   // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    // Setting error state variables to true if error is found
    if (formData.title == "") {
      setTitleError(true);
    } else if (formData.budget <= 0) {
      setBudgetError(true);
    } else if (formData.country == "") {
      setCountryError(true);
    } else {
      console.log("success!");
    }
  };

  function getChosenDestination(chosenId) {
    for (const destination of allDestinations) {
      if (destination.id == chosenId) {
        return destination;
      }
    }
  }

  const handleUserInput = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    if (name == "destinations") {
      const newDestination = getChosenDestination(value);
      setChosenDestinations((currentDestinations) => [
        ...currentDestinations,
        newDestination,
      ]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  function handleDeleteDestination(e) {
    console.log(typeof e.target.value)
    setChosenDestinations((currentDest) =>
      currentDest.filter((dest) => {
        return dest.id !== parseInt(e.target.value);
      })
    );
  }

  return (
    <>
      <Form className='m-4' onSubmit={handleSubmit}>
        <h1>Create Itinerary</h1>
        <br />

        <div>
          <Form.Group className='mb-3'>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              name='title'
              value={formData.title}
              onChange={handleUserInput}
            />
            {titleError && <Form.Text muted>Please enter a title.</Form.Text>}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-3'>
            <Form.Label>Budget (S$):</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter budget'
              name='budget'
              value={formData.budget}
              onChange={handleUserInput}
            />
            {budgetError && (
              <Form.Text muted>Please enter a budget for your trip.</Form.Text>
            )}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-4'>
            <Form.Label>Country:</Form.Label>

            <Form.Select
              aria-label='Country-Select'
              name='country'
              onChange={handleUserInput}
            >
              <option>Please select a country</option>
              {countryList.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </Form.Select>
            {countryError && (
              <Form.Text muted>
                Please select a country for your trip.
              </Form.Text>
            )}
          </Form.Group>
        </div>

        <div>
          <Form.Group className='mb-3'>
            <div class='d-flex justify-content-between mb-2'>
              <Form.Label class='align-self-end'>Destinations:</Form.Label>
              <Button variant='btn btn-outline-primary' type='submit'>
                + New destination
              </Button>
            </div>

            <Form.Select
              aria-label='Destination-Select'
              name='destinations'
              onChange={handleUserInput}
              disabled={!formData.country}
            >
              {allDestinations &&
                allDestinations.map((dest, index) => (
                  <option value={dest.id} key={dest.id}>
                    {dest.name} (Cost: ${dest.cost.toFixed(2)})
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>

        {chosenDestinations.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cost (S$)</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {chosenDestinations.map((dest, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{dest.name}</td>
                  <td>{dest.cost.toFixed(2)}</td>
                  <td>{dest.notes}</td>
                  <td>
                    <Button variant='danger' value={dest.id} onClick={handleDeleteDestination}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateItinerary;
